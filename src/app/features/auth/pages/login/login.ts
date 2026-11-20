import { Component, Input, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLinkWithHref } from '@angular/router';
import { GoogleSigninButton } from '../../components/google-signin-button/google-signin-button';
import { PasswordField } from '../../components/password-field/password-field';
import { Icon } from '../../../../shared/ui/icon/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLinkWithHref,
    PasswordField,
    GoogleSigninButton,
    Icon,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  private readonly fb = inject(FormBuilder);

  @Input() registerLink: string | unknown[] = '/register';

  readonly form = this.fb.nonNullable.group({
    identifier: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('login', this.form.getRawValue());
  }

  onGoogleSignIn(): void {
    console.log('google-sign-in');
  }
}
