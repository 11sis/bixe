import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UpdateTodo, RemoveTodo } from '@bixe/shared-store';;

@Component({
  selector: 'bixe-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent {
  @Input() state: any = {};
  @Output() dispatch = new EventEmitter<any>();

  updateTodo(todo) {
    const status = todo.status === 'complete' ? 'incomplete' : 'complete';
    this.dispatch.emit(new UpdateTodo(todo.id, status));
  }

  removeTodo(todo) {
    this.dispatch.emit(new RemoveTodo(todo.id));
  }
}
