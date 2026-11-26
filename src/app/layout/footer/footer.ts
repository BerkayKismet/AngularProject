import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [Icon, TranslocoModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
})
export class Footer {
  readonly copyrightYear = new Date().getFullYear();
}
