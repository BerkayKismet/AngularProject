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
import { Login } from '../login/login';
import { Register } from '../register/register';

type AuthCommands = string | unknown[];

@Component({
  selector: 'app-auth-shell',
  standalone: true,
  imports: [NgIf, RouterLinkWithHref, Login, Register, TranslocoModule],
  templateUrl: './auth-shell.html',
  styleUrls: ['./auth-shell.css'],
  host: {
    '[class.auth-shell--modal]': 'isModal',
  },
})
export class AuthShell implements OnInit, AfterViewInit, OnDestroy {
  private readonly subscriptions = new Subscription();
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

    this.subscriptions.add(
      this.route.paramMap.subscribe((params) => {
        this.isRegister = params.get('mode') === 'register';
        this.refresh();
      }),
    );

    this.subscriptions.add(
      this.transloco.langChanges$.subscribe(() => this.refresh()),
    );
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.syncHeight();
  }

  ngOnDestroy(): void {
    if (this.isModal) {
      document.body.classList.remove('auth-modal-open');
    }
    this.subscriptions.unsubscribe();
  }

  /** Mod veya dil değişince başlık ve panel yüksekliği güncellenir. */
  private refresh(): void {
    this.updateTitle();
    this.queueHeightSync();
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
      this.applyHeight(contentHeight);
      return;
    }

    const maxHeight = parseFloat(getComputedStyle(slide).maxHeight);

    this.applyHeight(
      Number.isFinite(maxHeight) && maxHeight > 0
        ? Math.min(contentHeight, maxHeight)
        : contentHeight,
    );
  }

  /** Doğrudan DOM'a yazar; ilk açılışta change detection beklemeden uygulanır. */
  private applyHeight(height: number): void {
    const slide = this.authSlideRef?.nativeElement;

    if (slide) {
      slide.style.height = `${height}px`;
    }
  }
}
