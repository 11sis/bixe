import { Observable } from "rxjs";

export type Selectors<T> = {
  [name: string]: (state: T) => Observable<any>;
}