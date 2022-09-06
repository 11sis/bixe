import { Routes } from "@angular/router";
import { CommingledScopeContainer, ScopeContainer } from "../containers";
import { CommingledStoreResolver, GlobalStoreResolver, IsolatedStoreResolver } from "./store-resolver";

export const bixeRoutes: Routes = [
  { path: 'ng-module/global', component: ScopeContainer, resolve: { store: GlobalStoreResolver } },
  { path: 'ng-module/isolated', component: ScopeContainer, resolve: { store: IsolatedStoreResolver } },
  { path: 'ng-module/commingled', component: CommingledScopeContainer, resolve: { store: CommingledStoreResolver } },
  { path: '',   redirectTo: 'ng-module/global', pathMatch: 'full' },
];