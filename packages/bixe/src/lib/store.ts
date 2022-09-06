import { Observable } from "rxjs";
import { iStoreConfig, StoreConfig } from "./store-config";
import { BixeBus } from "./bixe-bus";
import { ActionHandlersMap } from "./types";
import { Selectors } from "./types/selectors";
import { BixeBusCollection } from "./bixe-bus-collection";


export class Store<T> {

  private _bus: BixeBus;
  private _selectors: Selectors<T> = { };
  private _state$: Observable<T>;
  
  private _createSelector(predicate: (state: any) => any): Observable<T> {
    return this._bus.stateContext.createSelectorForStore(this.name, predicate);
  }

  private _setSelector<T, K extends keyof T>(obj: T, key: K, value: any): void {
    obj[key] = value;
  }

  get initialState() {
    return this._config.initialState;
  }

  get handlers(): ActionHandlersMap<T>  {
    return this._config.handlers;
  }

  get logger() {
    return this._config.logger;
  }
    
  get name() {
    return this._config.name;
  }

  get selectorPredicates() {
    return this._config._selectors;
  }

  get selectors() {
    return this._selectors;
  }

  get rootState$() {
    return this._bus.stateContext.state$;
  }

  get scope() {
    return this._config.scope;
  }

  get state$(): Observable<T> {
    return this._state$;
  }

  constructor(private _config: iStoreConfig<T> | any = {}) {
    // scrub config 
    this._config = new StoreConfig(this._config);

    // get and/or instantiate bus
    this._bus = BixeBusCollection.buses[this._config.scope];
    if (!this._bus) {
      this._bus = new BixeBus(this.logger);
      BixeBusCollection.Add(this._config.scope, this._bus);
    }

    // register store in bus
    this._state$ = this._bus.createStoreContext(this);
  }

  currentState() {
    return this._bus.stateContext.getStateContext(this.name).getState();
  }

  currentRootState() {
    return this._bus.stateContext.getState();
  }

  dispatch(action: any): Observable<void> {
    return this._bus.dispatch(action);
  }

  ofActionDispatched(actionType: any) {
    return this._bus.onActionStatus(actionType, 'dispatch');
  }

  ofActionSuccessful(actionType: any) {
    return this._bus.onActionStatus(actionType, 'success');
  }

  ofActionErrored(actionType: any) {
    return this._bus.onActionStatus(actionType, 'error');
  }

  ofActionCompleted(actionType: any) {
    return this._bus.onActionStatus(actionType, 'complete');
  }

  select$(predicate: (state: T) => any): Observable<Partial<T>> {
    return this._createSelector(predicate);
  }

  setSelector<K extends keyof Selectors<any>>(key: K, value: any) {
    this._setSelector(this._selectors, key as any, value);
  }


}
