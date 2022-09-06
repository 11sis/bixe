import { Action } from './action';
import { cloneDeep } from 'lodash';

const grayLogStyle = 'color: #979797; font-weight: 700';
const greenLogStyle = 'color: #02a102; font-weight: 700';
const dupe = (obj: any) => cloneDeep(obj);

export class BixeLogger {

  private _console: any;
    
  private _logPayload(action: any) {
    const payload = Action.withoutType(action);
    if (Object.keys(payload).length) {
      this._console.log('%cpayload', grayLogStyle, payload);
    }
  }
  
  private _logPrevState(prevState: any) {
    this._console.log('%cprev state', grayLogStyle, dupe(prevState));
  }
  
  private _logNextState(nextState: any) {
    this._console.log('%cnext state', greenLogStyle, dupe(nextState));
  }

  private _startLogGroup(action: any, topic = 'action ') {
    this._console.group(`${topic}${Action.getType(action)}`);
  }

  private _endLogGroup() {
    this._console.groupEnd();
  }

  noOpConsole = {
    log: (..._: any[]) => { null; },
    group: (_: string) => { null; },
    groupEnd: () => { null; },
    // error: (..._: any[]) => { null; },
    // info: (..._: any[]) => { null; }
  }

  constructor(public loggingEnabled = true) { 
    this.enableLogging(loggingEnabled);
    this.log = this._console.log;
  }

  log: (...args) => void;

  enableLogging(bool = true) {
    this._console = bool ? console : this.noOpConsole;
  }

  disableLogging() {
    this.enableLogging(false);
  }

  // // not in use yet; have nothing to alert user about doing incorrectly so far
  // logError(err: any) {
  //   this._console.error(err);
  // }

  logDispatchedActionStart(action: any, previousState: any, topic = 'action ') {
    this._startLogGroup(action, topic);
    this._logPayload(action);
    this._logPrevState(previousState);
  }

  logDispatchedActionEnd(nextState: any) {
    this._logNextState(nextState);
    this._endLogGroup();
  }

}
