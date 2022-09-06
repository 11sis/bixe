import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import * as components from "./components";
import * as shared from '@bixe/shared-store';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { SplitterModule } from 'primeng/splitter';

@NgModule({
  imports: [
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    CardModule,
    SplitterModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(shared.bixeRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  declarations: [
    AppComponent,
    components.TodosComponent,
    components.TodosTitleComponent,
    components.DelayActionComponent,
    components.TodoFormComponent,
    shared.StatesSliderComponent,
    shared.ScopeHeaderComponent,
    shared.ScopeContainer,
    shared.HeaderContainer,
    shared.CommingledScopeContainer
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
