import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bixe-todo-form',
  templateUrl: './todo-form.component.html'
})
export class TodoFormComponent {
  @Input() scope: string = '';
  @Input() state: any = {};
  @Input() delayStatus: string = '';
  @Output() handleChange = new EventEmitter<any>();
  @Output() handleSubmit = new EventEmitter<any>();
  @Output() updateDelay = new EventEmitter<boolean>();

  textChange(event) {
    this.handleChange.emit(event);
  }
  submit(event) {
    this.handleSubmit.emit(event);
  }
  delayChange(event) {
    this.updateDelay.emit(event);
  }
}
