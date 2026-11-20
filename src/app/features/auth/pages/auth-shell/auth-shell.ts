import { NgIf } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { Subscription } from 'rxjs';
import { Icon } from '../../../../shared/ui/icon/icon';
import { Login } from '../login/login';
import { Register } from '../register/register';

type AuthCommands = string | unknown[];

@Component({
  selector: 'app-auth-shell',
  standalone: true,
  imports: [NgIf, RouterLinkWithHref, Icon, Login, Register],
  templateUrl: './auth-shell.html',
  styleUrls: ['./auth-shell.css'],
  host: {
    '[class.auth-shell--modal]': 'isModal',
  },
})
export class AuthShell implements OnInit, AfterViewInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private modeSub?: Subscription;
  private viewReady = false;

  readonly isModal = this.route.outlet === 'modal';
  readonly loginCommands: AuthCommands = this.isModal
    ? ['/', { outlets: { modal: ['login'] } }]
    : ['/login'];
  readonly registerCommands: AuthCommands = this.isModal
    ? ['/', { outlets: { modal: ['register'] } }]
    : ['/register'];

  @ViewChild('authSlide') private authSlideRef?: ElementRef<HTMLElement>;
  @ViewChild('loginPanel') private loginPanelRef?: ElementRef<HTMLElement>;
  @ViewChild('registerPanel')
  private registerPanelRef?: ElementRef<HTMLElement>;

  isRegister = false;
  slideHeight: number | null = null;
  heightReady = false;

  ngOnInit(): void {
    if (this.isModal) {
      document.body.classList.add('auth-modal-open');
    }

    this.modeSub = this.route.paramMap.subscribe((params) => {
      this.isRegister = params.get('mode') === 'register';
      this.title.setTitle(
        this.isRegister ? 'Ücretsiz Kayıt Ol' : 'Giriş Yap',
      );
      this.queueHeightSync();
    });
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.syncHeight();
    requestAnimationFrame(() => {
      this.heightReady = true;
    });
  }

  ngOnDestroy(): void {
    document.body.classList.remove('auth-modal-open');
    this.modeSub?.unsubscribe();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isModal) {
      this.close();
    }
  }

  onBackdropClick(event: MouseEvent): void {
    if (!this.isModal || event.target !== event.currentTarget) {
      return;
    }

    this.close();
  }

  close(): void {
    void this.router.navigate([{ outlets: { modal: null } }], {
      relativeTo: this.route.root,
    });
  }

  private queueHeightSync(): void {
    if (!this.viewReady) {
      return;
    }

    requestAnimationFrame(() => this.syncHeight());
  }

  private syncHeight(): void {
    const panel = this.isRegister
      ? this.registerPanelRef?.nativeElement
      : this.loginPanelRef?.nativeElement;
    const slide = this.authSlideRef?.nativeElement;

    if (!panel || !slide) {
      return;
    }

    const contentHeight = panel.scrollHeight;

    if (!this.isRegister) {
      this.slideHeight = contentHeight;
      return;
    }

    const maxHeight = parseFloat(getComputedStyle(slide).maxHeight);

    this.slideHeight =
      Number.isFinite(maxHeight) && maxHeight > 0
        ? Math.min(contentHeight, maxHeight)
        : contentHeight;
  }
}
