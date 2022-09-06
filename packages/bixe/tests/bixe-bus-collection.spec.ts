import { Store } from "../src/lib/store";
import { BixeBusCollection } from '../src/lib/bixe-bus-collection';

import { TestState, TestAction } from './lib';
import * as storeConfig from './lib/test.store-config';


let store: Store<TestState> | undefined;

const defaultScope = 'root';
const testAction = new TestAction({ foo: 'bar' });;

describe(`Bixe Bus Collection`, () => {
  describe('Default Scope', () => {
    beforeEach(() => {
      store = new Store<TestState>(storeConfig.wellDefined.handlerKeyValue);
    });

    afterEach(() => {
      store = undefined;
    });

    it('registers bus in `root` scope', () => {
      expect(store?.scope).toBe(defaultScope);
      expect(BixeBusCollection.buses[defaultScope]).not.toBe(undefined);
    });

    it('dispatches action in existing scope (`root`) and doesnt throw error', async () => {
      let error;
      try {
        await BixeBusCollection.Dispatch(testAction, defaultScope);
      } catch(er) {
        error = er;
      }
      expect(error).toBe(undefined);
    });

    it('dispatches action in non-existing scope (`asdf`) and catches error', async () => {
      let error;
      try {
        await BixeBusCollection.Dispatch(testAction, 'asdf');
      } catch(er) {
        error = er;
      }
      expect(error.message).toBe('Scope not found: asdf')
    });

  });

});