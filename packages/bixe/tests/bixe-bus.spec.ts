import { BixeBus } from '../src/lib/bixe-bus';
import { BixeBusCollection } from '../src/lib/bixe-bus-collection';
import { OnActionStatus } from '../src/lib/constants';
import { BixeLogger } from '../src/lib/bixe-logger';
 
import { Store } from "../src/lib/store";

import { TestState, TestAction, TestErrorAction, UnknownAction } from './lib';
import * as storeConfig from './lib/test.store-config';


let store: Store<TestState> | undefined;
let errorActionStore: Store<TestState> | undefined;

// const defaultScope = 'root';
const testAction = new TestAction({ foo: 'bar' });
const testErrorAction = new TestErrorAction({foo: 'bar'});
const unknownAction: UnknownAction = new UnknownAction({foo: 'bar'});
let bus: BixeBus | any;

describe('Bixe Bus Test', () => {
  beforeEach(() => {
    store = new Store<TestState>(storeConfig.wellDefined.handlerArray);
    errorActionStore = new Store<TestState>(storeConfig.wellDefined.error.handlerKeyValue);
    bus = BixeBusCollection.buses[store.scope];
  });

  afterEach(() => {
    store = undefined;
    errorActionStore = undefined;
    bus = undefined;
  });

  it('should register 2 handlers to {TestAction.Type} topic in bus', () => {
    expect((bus as any)._actionHandlerHash[TestAction.Type].length).toBe(2);
  });

  it('should handle dispatched action with handlers that do not error', async () => {
    const notifyActionStatusSpy = jest.spyOn(bus, '_notifyActionStatuses');
    expect(notifyActionStatusSpy).not.toHaveBeenCalled();
    await store?.dispatch(testAction);
    // dispatched
    expect(notifyActionStatusSpy).toHaveBeenCalledWith(testAction, OnActionStatus.OnDispatch, undefined);
    // handled successfully
    expect(notifyActionStatusSpy).toHaveBeenCalledWith(testAction, OnActionStatus.OnSuccess, undefined);
    // done
    expect(notifyActionStatusSpy).toHaveBeenCalledWith(testAction, OnActionStatus.OnComplete, undefined);
    notifyActionStatusSpy.mockClear();
  });

  it('should handle dispatched action with handlers that error', async () => {
    const notifyActionStatusSpy = jest.spyOn(bus, '_notifyActionStatuses');
    const theError = new ReferenceError('thisIsAboutTheWorst is not defined');
    expect(notifyActionStatusSpy).not.toHaveBeenCalled();
    await errorActionStore?.dispatch(testErrorAction);
    // dispatched
    expect(notifyActionStatusSpy).toHaveBeenCalledWith(testAction, OnActionStatus.OnDispatch, undefined);
    // handled error
    expect(notifyActionStatusSpy).toHaveBeenCalledWith(testAction, OnActionStatus.OnError, theError);
    // done
    expect(notifyActionStatusSpy).toHaveBeenCalledWith(testAction, OnActionStatus.OnComplete, theError);
    notifyActionStatusSpy.mockClear();
  });

  it('should log unregistered action for unregistered action that has been dispatched in scope', async () => {
    const loggerSpy = jest.spyOn(bus.logger, 'log');
    await errorActionStore?.dispatch(unknownAction);
    expect(loggerSpy).toHaveBeenCalledWith(`'${UnknownAction.Type}' unregistered. No handler exists in scope for action`);
    loggerSpy.mockClear();
  });

  it('should use a default logger instance when no logger is passed to ctor', () => {
    const newBus = BixeBus.New();
    expect(JSON.stringify(newBus.logger)).toBe(JSON.stringify(new BixeLogger()));
  });

  it('should track states between action statuses {dispatch} -> {success}', () => {
    const sub = bus.onActionStatus(testAction, ActionStatus.dispatch)

    const newBus = BixeBus.New();
    expect(JSON.stringify(newBus.logger)).toBe(JSON.stringify(new BixeLogger()));
  });


  
});
