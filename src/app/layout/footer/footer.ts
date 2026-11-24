import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { Icon, IconName } from '../../shared/icon/icon';

export interface FooterLink {
  labelKey: string;
  href: string;
}

export interface FooterColumn {
  titleKey: string;
  links: FooterLink[];
}

export interface FooterSocialLink {
  name: Extract<
    IconName,
    'instagram' | 'facebook' | 'youtube' | 'twitter' | 'linkedin'
  >;
  labelKey: string;
  href: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgClass, NgFor, Icon, TranslocoModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
})
export class Footer {
  readonly copyrightYear = new Date().getFullYear();

  readonly socialLinks: FooterSocialLink[] = [
    {
      name: 'instagram',
      labelKey: 'footer.social.instagram',
      href: 'https://www.instagram.com/gaborascomtr',
    },
    {
      name: 'facebook',
      labelKey: 'footer.social.facebook',
      href: 'https://www.facebook.com/gaboraskurumsal/',
    },
    {
      name: 'youtube',
      labelKey: 'footer.social.youtube',
      href: 'https://www.youtube.com/channel/UCJd3utFghwi9LG4-o2qEH1A',
    },
    {
      name: 'twitter',
      labelKey: 'footer.social.twitter',
      href: 'https://x.com/gaborascomtr',
    },
    {
      name: 'linkedin',
      labelKey: 'footer.social.linkedin',
      href: 'https://www.linkedin.com/company/gaboras/',
    },
  ];

  readonly columns: FooterColumn[] = [
    {
      titleKey: 'footer.about.title',
      links: [{ labelKey: 'footer.about.about', href: '#' }],
    },
    {
      titleKey: 'footer.gaboras.title',
      links: [
        { labelKey: 'footer.gaboras.market', href: '#' },
        { labelKey: 'footer.gaboras.propertyMgmt', href: '#' },
        { labelKey: 'footer.gaboras.createRequest', href: '#' },
        { labelKey: 'footer.gaboras.requestList', href: '#' },
        { labelKey: 'footer.gaboras.rentMgmt', href: '#' },
      ],
    },
    {
      titleKey: 'footer.legal.title',
      links: [
        { labelKey: 'footer.legal.membership', href: '#' },
        { labelKey: 'footer.legal.kvkk', href: '#' },
        { labelKey: 'footer.legal.terms', href: '#' },
        { labelKey: 'footer.legal.security', href: '#' },
        { labelKey: 'footer.legal.cookie', href: '#' },
      ],
    },
    {
      titleKey: 'footer.more.title',
      links: [
        { labelKey: 'footer.more.faq', href: '#' },
        { labelKey: 'footer.more.mobileApp', href: '#' },
        { labelKey: 'footer.more.contact', href: '#' },
        { labelKey: 'footer.more.blog', href: '#' },
        { labelKey: 'footer.more.press', href: '#' },
        { labelKey: 'footer.more.references', href: '#' },
        { labelKey: 'footer.more.tv', href: '#' },
      ],
    },
  ];
}
