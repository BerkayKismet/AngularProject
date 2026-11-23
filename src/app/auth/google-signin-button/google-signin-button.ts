import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-google-signin-button',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './google-signin-button.html',
  styleUrls: ['./google-signin-button.css'],
})
export class GoogleSigninButton {
  @Output() pressed = new EventEmitter<void>();
}
