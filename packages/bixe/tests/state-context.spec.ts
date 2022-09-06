import { StateContext } from '../src/lib/state-context';

class TestState {
  prop = '';
}

let stateContext: StateContext<TestState>;

const getStateMock = jest.fn();
const dispatchMock = jest.fn();
const setStateMock = jest.fn();
const patchStateMock = jest.fn();
const getRootStateMock = jest.fn();

describe(`State Context`, () => {

    beforeEach(() => {
      stateContext = new StateContext<TestState>(
        getStateMock,
        dispatchMock,
        setStateMock,
        patchStateMock,
        getRootStateMock
      );
    });

    it('sets context', async () => {

      expect(getStateMock).not.toHaveBeenCalled();
      expect(dispatchMock).not.toHaveBeenCalled();
      expect(setStateMock).not.toHaveBeenCalled();
      expect(patchStateMock).not.toHaveBeenCalled();
      expect(getRootStateMock).not.toHaveBeenCalled();

      expect(stateContext.getState).not.toBe(undefined);
      expect(stateContext.dispatch).not.toBe(undefined);
      expect(stateContext.setState).not.toBe(undefined);
      expect(stateContext.patchState).not.toBe(undefined);
      expect(stateContext.getRootState).not.toBe(undefined);
    });

});