export * from './store';
export * from './state-context';
export * from './store-config';

import { Action } from './action';
import { BixeBusCollection } from './bixe-bus-collection';

export const dispatch = (action: Action, scope = 'root') => {
  const bus = BixeBusCollection.buses[scope];
  if (!bus) {
    throw new Error(`Scope not found: ${scope}`);
  }
  return bus.dispatch(action);
}

export const scope = (scope: string) => {
  return {
    dispatch: (action) => {
      return dispatch(scope, action);
    }
  }
}

export const disableLogging = () => {
  BixeBusCollection.LoggingEnabled = false;
}
