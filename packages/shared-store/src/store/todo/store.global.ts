import { Store } from "@bixe/bixe";
import * as TodosActions from "./actions";
import * as TodosHandlers from './handlers';
import { TodoState } from "./state";

export const TodoStoreGlobal = new Store<TodoState>({
  name: TodosActions.Intent,
  initialState: new TodoState(),
  selectors: {
    complete$: (state: TodoState) => state.complete,
    incomplete$: (state: TodoState) => state.incomplete,
  },
  handlers: {
    [TodosActions.CreateTodo.Type]: TodosHandlers.createTodo.bind(this),
    [TodosActions.UpdateTodo.Type]: TodosHandlers.updateTodo.bind(this),
    [TodosActions.SetCurrentTodo.Type]: TodosHandlers.setCurrentTodo.bind(this),
    [TodosActions.RemoveTodo.Type]: TodosHandlers.removeTodo.bind(this)
  }
});