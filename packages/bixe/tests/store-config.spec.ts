// import {  } from '@bixe/shared-store'
// import { formatNumber } from '@angular/common';
// import { BixeBus } from '../src/lib/bixe-bus';
// import { BixeBusCollection } from '../src/lib/bixe-bus-collection';
// import { BixeLogger } from '../src/lib/bixe-logger';
import { StateContext } from '../src/lib/state-context';
import { Store } from '../src/lib/store';

import { expect } from 'chai';
import { BixeBusCollection } from '../src/lib/bixe-bus-collection';
import { iStoreConfig } from '../src/lib/store-config';
import { BixeLogger } from '../src/lib/bixe-logger';
import { isObservable } from 'rxjs';

// import * as sinon from 'sinon';
const testIntent = 'test';
class TestAction {
  static Type =`[${testIntent}] type`;
  constructor(public payload: any) { }
}

class TestState {
  constructor(public prop = {}) { }
}

const handler = (context: StateContext<TestState>, action: TestAction) => {
  return context.patchState({
    prop: action.payload
  });
};

const selector$ = (state) => state.prop;

let testStore: Store<TestState>
  // storeConfig: iStoreConfig<TestState>
  ;

const wellDefinedStoreConfig1 = {
  initialState: new TestState(),
  name: 'testStore',
  scope: 'foobar',
  handlers: {
    [TestAction.Type]: handler.bind(this)
  },
  selectors: {
    thing$: selector$
  },
  logger: new BixeLogger(false),
} as iStoreConfig<TestState>;

// const wellDefinedStoreConfig2 = {
//   initialState: new TestState(),
//   name: 'testStore',
//   scope: 'foobar',
//   handlers: {
//     [TestAction.Type]: handler.bind(this)
//   },
//   selectors: {
//     thing$: selector$
//   },
//   logger: new BixeLogger(true),
// } as iStoreConfig<TestState>;



describe(`Store Config`, () => {

  describe('Poorly Formed', () => {
    [{}, undefined].forEach((config) => {
      beforeEach(() => {
        // storeConfig = config as any;
        testStore = new Store<TestState>(config);
      });
  
      afterEach(() => {
        testStore = undefined as any;
      });
  
      it(`should set store initialState = {}`, () => {
        expect(testStore.initialState).to.eql({});
      });
    
      it(`should set store handlers = {}`, () => {
        expect(testStore.handlers).to.eql({});
      });
    
      it(`should set store scope = {}`, () => {
        expect(testStore.scope).to.eql('root');
      });
    
      it(`should set store selectors = {}`, () => {
        expect(testStore.selectors).to.eql({});
      });
    
      it(`should set store logger = ${ JSON.stringify(BixeBusCollection.Logger) }`, () => {
        expect(testStore.logger).to.eql(BixeBusCollection.Logger);
      });
    
      it(`should set a random store name`, () => {
        expect(testStore.name).to.not.be.undefined;
      })
    })
    
  });
  
  describe('Well Formed', () => {
    [wellDefinedStoreConfig1 /*, wellDefinedStoreConfig2*/].forEach((config) => {
      beforeEach(() => {
        testStore = new Store<TestState>(config);
      });
  
      afterEach(() => {
        testStore = undefined as any;
      });
  
      it(`should set store initialState = {wellDefinedStoreConfig.initialState}`, () => {
        expect(testStore.initialState).to.eql(config.initialState);
      });
    
      it(`should set store handlers = {wellDefinedStoreConfig.handlers}`, () => {
        expect(testStore.handlers).to.eql(config.handlers);
      });
    
      it(`should set store scope = {wellDefinedStoreConfig.scope}`, () => {
        expect(testStore.scope).to.equal(config.scope);
      });
    
      it(`should set store selectors = {wellDefinedStoreConfig.selectors}`, () => {
        expect(testStore.selectors).to.have.key('thing$')
        expect(isObservable((testStore.selectors as any).thing$)).to.equal(true);
      });
    
      it(`should set store logger = {wellDefinedStoreConfig.logger}`, () => {
        expect(testStore.logger).to.equal(config.logger);
      });
    
      it(`should set store name = {wellDefinedStoreConfig.name}`, () => {
        expect(testStore.name).to.equal(config.name);
      })
    })
   
  })
  

});
