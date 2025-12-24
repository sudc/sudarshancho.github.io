import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingModalComponent } from '../booking-modal/booking-modal.component';

declare const gtag: Function;

@Component({
  selector: 'app-instant-booking-bar',
  standalone: true,
  imports: [CommonModule, BookingModalComponent],
  templateUrl: './instant-booking-bar.component.html',
  styleUrls: ['./instant-booking-bar.component.scss']
})
export class InstantBookingBarComponent {
  isHotelModalOpen = false;
  isBusModalOpen = false;
  isEssentialsModalOpen = false;

  /**
   * Open hotel booking modal
   * For "Intent Users" who already know destination
   */
  openHotelBooking(): void {
    if (typeof gtag !== 'undefined') {
      (window as any).gtag('event', 'hotel_booking_intent', {
        event_category: 'Intent User',
        event_label: 'Sticky Bar - Hotels',
        source: 'global_action_bar'
      });
    }
    this.isHotelModalOpen = true;
  }

  closeHotelModal(): void {
    this.isHotelModalOpen = false;
  }

  /**
   * Open bus booking in new tab
   * AbhiBus affiliate link
   */
  openBusBooking(): void {
    if (typeof gtag !== 'undefined') {
      (window as any).gtag('event', 'bus_booking_intent', {
        event_category: 'Intent User',
        event_label: 'Sticky Bar - Bus',
        source: 'global_action_bar'
      });
    }
    // Show confirmation first
    this.isBusModalOpen = true;
  }

  closeBusModal(): void {
    this.isBusModalOpen = false;
  }

  confirmBusBooking(): void {
    if (typeof gtag !== 'undefined') {
      (window as any).gtag('event', 'abhibus_redirect', {
        event_category: 'Affiliate',
        event_label: 'Bus Tickets - AbhiBus',
        source: 'sticky_bar'
      });
    }
    window.open('https://inr.deals/kQK6mx', '_blank', 'noopener');
    this.closeBusModal();
  }

  /**
   * Open essentials shopping
   * Amazon affiliate link
   */
  openEssentialsShopping(): void {
    if (typeof gtag !== 'undefined') {
      (window as any).gtag('event', 'essentials_intent', {
        event_category: 'Intent User',
        event_label: 'Sticky Bar - Essentials',
        source: 'global_action_bar'
      });
    }
    // Show categories selection
    this.isEssentialsModalOpen = true;
  }

  closeEssentialsModal(): void {
    this.isEssentialsModalOpen = false;
  }

  /**
   * Navigate to Amazon essentials
   */
  goToEssentials(category: string): void {
    if (typeof gtag !== 'undefined') {
      (window as any).gtag('event', 'essentials_category_click', {
        event_category: 'Shopping',
        event_label: category,
        source: 'sticky_bar'
      });
    }

    const categoryMap: Record<string, string> = {
      luggage: 'luggage',
      toiletries: 'travel toiletries',
      electronics: 'travel electronics',
      clothing: 'travel clothing'
    };

    const query = categoryMap[category] || category;
    const url = `https://www.amazon.in/s?k=${encodeURIComponent(query)}&tag=tripsaver21-21`;
    window.open(url, '_blank', 'noopener');
    this.closeEssentialsModal();
  }
}
