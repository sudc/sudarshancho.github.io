import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { AnalyticsService } from '../../core/services/analytics/analytics.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private analytics: AnalyticsService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Contact Us - TripSaver Customer Support');
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'Get in touch with TripSaver for any questions about hotel and flight bookings. Email us at support@tripsaver.com or call +91 80 1234 5678.' 
    });
  }

  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  submitForm() {
    console.log('Contact form submitted:', this.formData);
    
    // Track form submission
    this.analytics.trackFormSubmission('contact_form', true);
    
    alert('Thank you for contacting us! We will get back to you soon.');
    // Here you can add actual form submission logic (e.g., API call)
    this.resetForm();
  }

  resetForm() {
    this.formData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}
