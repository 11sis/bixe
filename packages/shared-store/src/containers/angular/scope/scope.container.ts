import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@bixe/bixe';
import { debounceTime, Subject, Subscription } from 'rxjs';

import { TodoState, SetCurrentTodo, UpdateTodo, CreateTodo } from '../../../store';

@Component({
  selector: 'bixe-scope-container',
  templateUrl: './scope.container.html',
  styleUrls: ['./scope.container.scss']
})
export class ScopeContainer implements OnInit, OnDestroy {
  private subscription = new Subscription();
  @Input() store: Store<TodoState> | any;

  todoText = new Subject<string>();
  scope: string | any;
  state: TodoState | any;
  rootState: any;
  checked = false;
  delayMessage = '';
  delayTimeout = 0;

  private updateDelayCountDown() {
    let count = 0;
    const limit = 2;
    this.delayMessage = `3s to state update`;
    this.delayTimeout = setInterval(() => {
      if (count >= limit) {
        clearInterval(this.delayTimeout);
        this.delayMessage = '';
      } else {
        this.delayMessage = `${limit-count}s to state update`;
        count++;
      }
    }, 1000);
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.store = this.store || this.route.snapshot.data['store'];
    this.scope = this.store.scope;
    this.state = this.store.currentState();
    this.rootState = this.store.currentRootState();
    this.subscription.add(
      this.todoText.pipe(debounceTime(250)).subscribe((text: string) => {
        this.store.dispatch(new SetCurrentTodo(text))
      })
    );
    this.subscription.add(
      this.store.state$.subscribe((state: TodoState) => {
        this.state = state;
      })
    );
    this.subscription.add(
      this.store.rootState$.subscribe(rootState => {
        this.rootState = rootState;
      })
    );
    this.subscription.add(
      this.route.data.subscribe((rout: any) => {
        this.store = rout.store
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateTodo(todo) {
    const status = todo.status === 'complete' ? 'incomplete' : 'complete';
    this.store.dispatch(new UpdateTodo(todo.id, status));
  }

  updateDelay(checked) {
    this.checked = checked;
  }

  handleChange(event) {
    this.todoText.next(event);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.checked) {
      this.updateDelayCountDown();
    }
    this.store.dispatch(new CreateTodo(this.state.currentTodo, this.checked));
  }
}