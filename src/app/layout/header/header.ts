import { NgFor } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { LanguageService } from '../../core/i18n/language.service';
import { Locale, LOCALES } from '../../core/i18n/locale';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Icon, NgFor, RouterLinkWithHref, TranslocoModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  @ViewChild('menuToggle') private menuToggle?: ElementRef<HTMLInputElement>;

  readonly locales = LOCALES;

  constructor(private readonly language: LanguageService) {}

  get currentLocale(): Locale {
    return this.language.current;
  }

  isCurrentLocale(locale: Locale): boolean {
    return this.language.current === locale;
  }

  selectLocale(locale: Locale): void {
    void this.language.setLocale(locale);
    this.closeMenu();
  }

  closeMenu(): void {
    const toggle = this.menuToggle?.nativeElement;

    if (toggle) {
      toggle.checked = false;
    }
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
}
