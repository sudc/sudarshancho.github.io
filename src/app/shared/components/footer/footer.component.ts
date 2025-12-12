import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  socialLinks = [
    { name: 'Facebook', icon: 'facebook', url: '#' },
    { name: 'Twitter', icon: 'twitter', url: '#' },
    { name: 'Instagram', icon: 'instagram', url: '#' },
    { name: 'LinkedIn', icon: 'linkedin', url: '#' }
  ];

  footerLinks = {
    company: [
      { name: 'About Us', url: '/about' },
      { name: 'How It Works', url: '/how-it-works' },
      { name: 'Careers', url: '/careers' },
      { name: 'Blog', url: '/blog' }
    ],
    support: [
      { name: 'Help Center', url: '/help' },
      { name: 'Contact Us', url: '/contact' },
      { name: 'FAQ', url: '/faq' },
      { name: 'Terms of Service', url: '/terms' }
    ],
    legal: [
      { name: 'Privacy Policy', url: '/privacy' },
      { name: 'Cookie Policy', url: '/cookies' },
      { name: 'Disclaimer', url: '/disclaimer' },
      { name: 'Affiliate Disclosure', url: '/affiliate-disclosure' }
    ]
  };

  onLinkClick(url: string, event: Event): void {
    if (url === '#') {
      event.preventDefault();
      console.log('Link not yet configured');
    }
  }
}
