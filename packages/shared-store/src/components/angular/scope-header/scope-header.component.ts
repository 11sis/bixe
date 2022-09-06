import { Component, Input } from '@angular/core';

@Component({
  selector: 'bixe-scope-header',
  templateUrl: './scope-header.component.html'
})
export class ScopeHeaderComponent {
  @Input() scope = 'unknown';
}
