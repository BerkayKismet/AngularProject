import { Component, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLinkWithHref } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { GoogleSigninButton } from '../google-signin-button/google-signin-button';
import { PasswordField } from '../password-field/password-field';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLinkWithHref,
    PasswordField,
    GoogleSigninButton,
    Icon,
    TranslateModule,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  @Input() registerLink: string | unknown[] = '/register';
  @Input() skipLocationChange = false;

  readonly form = this.fb.nonNullable.group({
    identifier: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private readonly fb: FormBuilder) {}

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  }

  onGoogleSignIn(): void {}
}
