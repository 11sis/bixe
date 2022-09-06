import { Component, Input } from '@angular/core';

import { TodoStoreGlobal, TodoStoreIsolated } from '@bixe/shared-store';

@Component({
  selector: 'bixe-commingled-scope-container',
  templateUrl: './commingled-scope.container.html',
  styleUrls: ['./commingled-scope.container.scss']
})
export class CommingledScopeContainer {
  @Input() globalStore = TodoStoreGlobal;
  @Input() isolatedStore = TodoStoreIsolated;
}