import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Icon, RouterLinkWithHref],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  @ViewChild('menuToggle') private menuToggle?: ElementRef<HTMLInputElement>;

  closeMenu(): void {
    const toggle = this.menuToggle?.nativeElement;

    if (toggle) {
      toggle.checked = false;
    }
  }
}
