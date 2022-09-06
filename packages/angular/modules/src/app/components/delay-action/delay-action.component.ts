import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bixe-delay-action',
  templateUrl: './delay-action.component.html'
})
export class DelayActionComponent {
  checked = false;
  @Input() currentTodo: string = '';
  @Output() currentTodoChange = new EventEmitter<boolean>();
  emitTodo(value) {
    this.currentTodoChange.emit(value.checked?.length >= 1);
  }
}
