import {
  forkJoin,
  isObservable,
  Observable,
  of,
  Subject,
  Subscription,
  from
} from 'rxjs';
import { catchError, filter, mergeMap, tap } from 'rxjs/operators';

import { Action } from './action';
import { OnActionStatus } from './constants';
import { Store } from './store';
import { StoreHandler } from './store-handler';
import { ActionHandlers, ActionStatus } from './types';
import { BixeLogger } from './bixe-logger';
import { BixeContext } from './bixe-context';

export class BixeBus {
  
  // bus state context
  private _stateContext: BixeContext;

  // hash of actions that will be listened/subscribed to in bux
  private _actionHandlerHash: { [topic: string]: ActionHandlers<any> } = {  };

  // subject that pushes dispatched action to subscribers
  private _dispatchedActions$ = new Subject();

  // subject that creates lifecycle for the statuses of dispatched actions
  private _actionStatuses$ = new Subject<ActionStatus>();

  // the subscription used to pull all values
  private _subscription = new Subscription();

  // per-scope subscription switch;
  private _dispatchSubscribedTo = false;

  // registers handlers from store ctor config into internal callchain
  private _propagateActionsAndHandlers(store: Store<any>) {

    Object.keys(store.handlers).forEach((key: string) => {
      this._actionHandlerHash[key] = (this._actionHandlerHash[key] || []) as any;
      if (Array.isArray(store.handlers[key])) {
        (store.handlers[key] as any).forEach((actionHandler: (...args: any[]) => any) => {
          (this._actionHandlerHash[key] as any).push(new StoreHandler(store, actionHandler));
        });
      } else {
        (this._actionHandlerHash[key] as any).push(new StoreHandler(store, store.handlers[key]));
      }
    });
  }

  // overwrites each key in store.selectors with an obserable of the predicate passed in the store ctor config
  private _propagateSelectors(store: Store<any>) {
    Object.keys(store.selectorPredicates).forEach((key) => {
      store.setSelector(key, store.select$(store.selectorPredicates[key]));
    });
  }

  private _getActionHandlers(topic: string): any {
    
    return this._actionHandlerHash[topic] || [new StoreHandler({} as any, () => { this.logger.log(`'${topic}' unregistered. No handler exists in scope for action`) })];
  }
  
  private _initSubscriptionToDispatchedActions() {
    this._subscription.add(
      this._dispatchedActions$.pipe(
        tap((action) => this.logger.logDispatchedActionStart(action, this._stateContext.getState())),
        mergeMap((action) => {
          const actionHandlers = this._getActionHandlers(Action.getType(action)) as StoreHandler[];

          return forkJoin(actionHandlers.map(
            (storeHandler: StoreHandler) => this._handleDispatchedAction(action, storeHandler)
          ));
        }),
        tap(() => this.logger.logDispatchedActionEnd(this._stateContext.getState())) // move to subscribe() ?
      )
      .subscribe(() => { null; })
    );
  }

  private _handleDispatchedAction(action: any, storeHandler: StoreHandler) {
    let callbackResult: any;
    const stateContext = this._stateContext.getStateContext(storeHandler.store.name);

    try {
      callbackResult = storeHandler.callback(stateContext, action);
    } catch(error) {
      callbackResult = from(Promise.reject(error));
    }

    const callbackResultObservable = isObservable(callbackResult)
      ? callbackResult
      : of(callbackResult);

    return (callbackResultObservable as Observable<any>).pipe(
      mergeMap(result => of(this._notifyActionStatuses(action, OnActionStatus.OnSuccess, result))),
      catchError(error => 
        of(this._notifyActionStatuses(action, OnActionStatus.OnError, error)).pipe(mergeMap((_) => of(error)))
      ),
      mergeMap(result => of(this._notifyActionStatuses(action, OnActionStatus.OnComplete, result)))
    );
  }

  private _notifyActionStatuses(action: any, status: string, callbackResult: any) {
    this._actionStatuses$.next({ action, status, callbackResult });
  }

  get stateContext(): BixeContext {
    return this._stateContext;
  }

  constructor(public logger = new BixeLogger()) {
    this._initSubscriptionToDispatchedActions();
    this._stateContext = new BixeContext(this);
  }

  createStoreContext<T>(store: Store<T>): Observable<T> {
    this._stateContext.createStoreContext(store);
    this._propagateActionsAndHandlers(store);
    this._propagateSelectors(store);
    return this._stateContext.createSelectorForStore(store.name, (s) => s);
  }

  dispatch(action: any): Observable<void> {
    this._notifyActionStatuses(action, OnActionStatus.OnDispatch, undefined);

    return of(this._dispatchedActions$.next(action));
  }

  onActionStatus(actionType: any, status: string): Observable<any> {
    const statusMap: any = {
      dispatch: OnActionStatus.OnDispatch,
      success: OnActionStatus.OnSuccess,
      error: OnActionStatus.OnError,
      complete: OnActionStatus.OnComplete
    };

    return this._actionStatuses$.pipe(filter((actionStatus: ActionStatus) => {
      return actionType.name === actionStatus.action.constructor.name
        && statusMap[status] === actionStatus.status;
    }));
  }

  static New() {
    return new BixeBus();
  }

}
