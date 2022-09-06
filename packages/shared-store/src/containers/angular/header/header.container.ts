import { Component, Input } from '@angular/core';

@Component({
  selector: 'bixe-header',
  templateUrl: './header.container.html',
  styleUrls: ['./header.container.scss']
})
export class HeaderContainer {
  @Input() links: any[] = [];
}
