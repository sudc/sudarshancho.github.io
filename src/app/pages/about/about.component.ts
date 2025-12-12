import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface Stat {
  icon: string;
  value: string;
  label: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit() {
    this.titleService.setTitle('About TripSaver - Your Trusted Travel Comparison Platform');
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'TripSaver helps you compare and book hotels, flights, and travel deals at the best prices. Trusted by 50K+ travelers. Save money on every booking.' 
    });
  }

  stats: Stat[] = [
    { icon: 'people', value: '50K+', label: 'Happy Travelers' },
    { icon: 'savings', value: '₹2Cr+', label: 'Money Saved' },
    { icon: 'hotel', value: '10K+', label: 'Hotel Partners' },
    { icon: 'flight', value: '500+', label: 'Flight Routes' }
  ];

  features = [
    {
      icon: 'compare_arrows',
      title: 'Compare Prices',
      description: 'Compare prices across multiple platforms in one place and find the best deals instantly.'
    },
    {
      icon: 'verified',
      title: 'Verified Partners',
      description: 'We only work with trusted and verified booking platforms to ensure your safety.'
    },
    {
      icon: 'attach_money',
      title: 'Save More',
      description: 'Get exclusive deals and cashback offers that you won\'t find anywhere else.'
    },
    {
      icon: 'support_agent',
      title: '24/7 Support',
      description: 'Our dedicated support team is always here to help you with any questions.'
    }
  ];

  values = [
    {
      icon: '🎯',
      title: 'Transparency',
      description: 'We believe in complete transparency about how we work and earn.'
    },
    {
      icon: '💰',
      title: 'Value',
      description: 'Helping you get the best value for your money is our top priority.'
    },
    {
      icon: '🤝',
      title: 'Trust',
      description: 'Building long-term relationships based on trust and reliability.'
    },
    {
      icon: '⚡',
      title: 'Innovation',
      description: 'Constantly improving to provide you with the best experience.'
    }
  ];
}
