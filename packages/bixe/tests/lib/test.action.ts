
const testIntent = 'test';

export class TestAction {
  static Type = `[${testIntent}] type`;
  constructor(public payload: any) { }
}

export class TestErrorAction {
  static Type = `[${testIntent} error] type`;
  constructor(public payload: any) { }
}

export class UnknownAction {
  static Type = `[${testIntent} unknown] type`;
  constructor(public payload: any) { }
}
