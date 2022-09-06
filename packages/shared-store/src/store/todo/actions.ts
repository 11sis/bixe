export const Intent = "todos";

export class CreateTodo {
  static Type = `[${Intent}] create todo`;
  constructor(public name: string, public delay: boolean) {}
}

export class UpdateTodo {
  static Type = `[${Intent}] update todo`;
  constructor(public id: number, public status: string) {}
}

export class SetCurrentTodo {
  static Type = `[${Intent}] set current todo`;
  constructor(public todo: string) {}
}

export class RemoveTodo {
  static Type = `[${Intent}] remove todo`;
  constructor(public id: number) {}
}
