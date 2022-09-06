import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@bixe/bixe';

import { Observable, of } from 'rxjs';
import { TodoState, TodoStoreGlobal, TodoStoreIsolated } from '../store';

@Injectable({
  providedIn: 'root'
})
export class IsolatedStoreResolver implements Resolve<Observable<Store<TodoState>>> {
  resolve(): Observable<Store<TodoState>> {
    return of(TodoStoreIsolated as Store<TodoState>)
  }
}

@Injectable({
  providedIn: 'root'
})
export class GlobalStoreResolver implements Resolve<Observable<Store<TodoState>>> {
  resolve(): Observable<Store<TodoState>> {
    return of(TodoStoreGlobal as Store<TodoState>)
  }
}

@Injectable({
  providedIn: 'root'
})
export class CommingledStoreResolver implements Resolve<Observable<Store<TodoState>>> {
  resolve(): Observable<Store<TodoState>> {
    return of({ global: TodoStoreGlobal as Store<TodoState>, isolated: TodoStoreIsolated as Store<TodoState> } as any);
  }
}