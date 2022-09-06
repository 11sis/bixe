import { expect } from 'chai';
// import { TestScheduler } from 'rxjs/testing';
// import { throttleTime } from 'rxjs/operators';
 


// import { Store } from "../src/lib/store";
// import { StateContext } from '../src/lib/state-context';

// const testIntent = 'test';

// class TestAction {
//   static Type =`[${testIntent}] type`;
//   constructor(public payload: any) { }
// }

// class TestState {
//   prop = '';
// }

// const storeConfig = {
//   handlers: {
//     [TestAction.Type]: ((ctx: StateContext<TestState>, action: TestAction) => { 
//       return ctx.patchState({ prop: action.payload })
//     }).bind(this)
//   }
// }

// let store: Store<TestState> | undefined
// ,
//   payload: { foo: 'bar' },
//   action: TestAction | undefined,
//   subscription: any
  ;



describe(`Store`, () => {
  describe('Default Scope', () => {
    // beforeEach(() => {
    //   // store = new Store<TestState>(storeConfig);
    // });

    // afterEach(() => {
    //   // store = undefined;

    // })

    // it('states match after initialization, before action', () => {
    //   expect(store?.currentState()).to.eql({});
    // })

    // it('subscribes state$ to dispatched actions i', async () => {
      
    //   await store?.dispatch(action);
    //   // expect(subscribeSpy.callCount).to.equal(1);
    //   expect(stateSpy.callCount).to.equal(1);
    // });

    // it('current state returns bus state context by store name', async () => {
    //   await store?.dispatch(action);
    //   store?.state$.subscribe(subscribeSpy);
    //   expect(store?.currentState()).to.eql({ prop: payload });
    //   // expect( ).to.equal(1);
    // });

    // it('current state returns bus state context by store name', async () => {
    //   await store?.dispatch(action);
    //   console.log('StAteCoNTexT', bus._stateContext._state[store?.name]);
    //   console.log(store)
    //   expect(store?.currentState()).to.eql(payload);
    //   // expect( ).to.equal(1);
    // });

    // it('subscribes selector to dispatched actions in scope - is not called', async () => {
    //   // const selectSelectorSpy = sinon.spy();
    //   // store.select$(selectSelectorSpy);
    //   // await store.dispatch(action);
    //   // expect(subscribeSpy.callCount).to.equal(1);
    //   // expect(rootStateSpy.callCount).to.equal(1);
    //   // expect(selectSelectorSpy.callCount).to.equal(0);
    // });

    // it('subscribes selector to dispatched actions in scope - is called', async () => {
    //   // const selectSelectorSpy = sinon.fake((state) => state.prop);
    //   // store.select$(selectSelectorSpy);
    //   // await store.dispatch(action);
    //   // expect(subscribeSpy.callCount).to.equal(1);
    //   // expect(rootStateSpy.callCount).to.equal(1);
    //   // expect(selectSelectorSpy.callCount).to.equal(0);
    // });



    // it('handles action', async () => {
    //   // const selectSelectorSpy = sinon.spy();
    //   // store.select$(selectSelectorSpy);
    //   // const stateSpy = sinon.spy(store, 'state$', ['get']).get;
      

    //   // expect(stateSpy.callCount).to.equal(1);
    //   // expect(subscribeSpy.callCount).to.equal(1);
    //   // expect(selectSelectorSpy.callCount).to.equal(0);
    // });


  })
  

  it('passes', ()=>{
    expect(1).to.eql(1)
  })



});