import { NgIf } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';
import { Icon } from '../../shared/icon/icon';
import { Login } from '../login/login';
import { Register } from '../register/register';

type AuthCommands = string | unknown[];

@Component({
  selector: 'app-auth-shell',
  standalone: true,
  imports: [NgIf, RouterLinkWithHref, Icon, Login, Register, TranslocoModule],
  templateUrl: './auth-shell.html',
  styleUrls: ['./auth-shell.css'],
  host: {
    '[class.auth-shell--modal]': 'isModal',
  },
})
export class AuthShell implements OnInit, AfterViewInit, OnDestroy {
  private modeSub?: Subscription;
  private localeSub?: Subscription;
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

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly title: Title,
    private readonly transloco: TranslocoService,
  ) {}

  ngOnInit(): void {
    if (this.isModal) {
      document.body.classList.add('auth-modal-open');
    }

    this.modeSub = this.route.paramMap.subscribe((params) => {
      this.isRegister = params.get('mode') === 'register';
      this.updateTitle();
      this.queueHeightSync();
    });

    this.localeSub = this.transloco.langChanges$.subscribe(() => {
      this.updateTitle();
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
    if (this.isModal) {
      document.body.classList.remove('auth-modal-open');
    }
    this.modeSub?.unsubscribe();
    this.localeSub?.unsubscribe();
  }

  private updateTitle(): void {
    this.title.setTitle(
      this.transloco.translate(
        this.isRegister ? 'auth.title.register' : 'auth.title.login',
      ),
    );
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
      skipLocationChange: true,
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
