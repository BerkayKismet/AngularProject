import { NgFor } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../core/i18n/language.service';
import { Locale, LOCALES } from '../../core/i18n/locale';
import { Icon } from '../../shared/icon/icon';

const MENU_OPEN_CLASS = 'header-menu-open';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Icon, NgFor, RouterLinkWithHref, TranslateModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header implements OnDestroy {
  @ViewChild('menuToggle') private menuToggle?: ElementRef<HTMLInputElement>;

  readonly locales = LOCALES;

  constructor(private readonly language: LanguageService) {}

  get languageLabel(): string {
    return this.localeLabel(this.language.current);
  }

  localeLabel(locale: Locale): string {
    return locale.toUpperCase();
  }

  isCurrentLocale(locale: Locale): boolean {
    return this.language.current === locale;
  }

  selectLocale(locale: Locale): void {
    void this.language.setLocale(locale);
    this.closeMenu();
  }

  onMenuToggle(): void {
    this.syncMenuOpenClass();
  }

  closeMenu(): void {
    const toggle = this.menuToggle?.nativeElement;

    if (toggle) {
      toggle.checked = false;
    }

    this.syncMenuOpenClass();
  }

  ngOnDestroy(): void {
    document.body.classList.remove(MENU_OPEN_CLASS);
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (window.matchMedia('(min-width: 992px)').matches) {
      this.closeMenu();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  private syncMenuOpenClass(): void {
    const open = !!this.menuToggle?.nativeElement.checked;

    document.body.classList.toggle(MENU_OPEN_CLASS, open);
  }
}
