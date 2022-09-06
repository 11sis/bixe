

import { StateContext } from "../../src";
import { TestAction, TestErrorAction } from "./test.action";
import { TestState } from "./test.state";

const patchStateObservable = (ctx: StateContext<TestState>, action: TestAction) => { 
  return ctx.patchState({ prop: action.payload })
}

const patchStateVoid = (ctx: StateContext<TestState>, action: TestAction) => { 
  ctx.patchState({ prop: action.payload });
  return;
}

const patchStateError = (_ctx: StateContext<TestState>, _action: TestAction) => { 
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore:next-line
  thisIsAboutTheWorst.errorICanPossibleImagine.becauseNothingHereIs(true).and(itsUndefined, yaKnow);
}

export const wellDefined = {
  error: {
    handlerKeyValue: {
      handlers: {
        [TestErrorAction.Type]: patchStateError.bind(this)
      }
    },
    handlerArray: {
      handlers: {
        [TestErrorAction.Type]: [
          patchStateError.bind(this)
        ]
      }
    }
  },
  
  handlerKeyValue: {
    handlers: {
      [TestAction.Type]: patchStateObservable.bind(this)
    }
  },

  handlerArray: {
    handlers: {
      [TestAction.Type]: [
        patchStateObservable.bind(this),
        patchStateVoid.bind(this)
      ]
    }
  }
}

export const poorlyDefined = {
  empty: {}
}