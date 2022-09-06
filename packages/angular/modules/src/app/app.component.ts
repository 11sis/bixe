import { Component, Input } from '@angular/core';

@Component({
  selector: 'bixe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @Input() links: any[] = [
    { name: 'global scope', path: ['/ng-module/global'], icon: 'angular' },
    { name: 'isolated scope', path: ['/ng-module/isolated'], icon: 'angular' },
    { name: 'commingled scope', path: ['/ng-module/commingled'], icon: 'angular' },

    { name: 'global scope', path: ['/ng-standalone/global'], icon: 'angular' },
    { name: 'isolated scope', path: ['/ng-standalone/isolated'], icon: 'angular' },
    { name: 'commingled scope', path: ['/ng-standalone/commingled'], icon: 'angular' },

    { name: 'global scope', path: ['/react/global'], icon: 'react' },
    { name: 'isolated scope', path: ['/react/isolated'], icon: 'react' },
    { name: 'commingled scope', path: ['/react/commingled'], icon: 'react' },

    { name: 'global scope', path: ['/vue/global'], icon: 'vue' },
    { name: 'isolated scope', path: ['/vue/isolated'], icon: 'vue' },
    { name: 'commingled scope', path: ['/vue/commingled'], icon: 'vue' },
  ];
}
