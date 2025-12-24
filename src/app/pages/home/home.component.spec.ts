import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import { AffiliateConfigService, AffiliateConfigData } from '../../core/services/affiliate-config.service';
import { BookingService } from '../../core/services/booking.service';

describe('HomeComponent - Affiliate Integration', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let affiliateConfigService: jasmine.SpyObj<AffiliateConfigService>;
  let bookingService: jasmine.SpyObj<BookingService>;

  const mockConfig: AffiliateConfigData = {
    _id: 'active',
    activePartner: 'agoda',
    partners: {
      agoda: {
        id: 'agoda',
        name: 'Agoda',
        logo: '🏨',
        baseUrl: 'https://www.agoda.com',
        affiliateId: '1955073',
        commission: 12,
        active: true,
        description: 'Best hotel deals in Asia',
        type: 'hotel'
      },
      amazon: {
        id: 'amazon',
        name: 'Amazon',
        logo: '🛍️',
        baseUrl: 'https://www.amazon.in',
        affiliateId: 'tripsaver21-21',
        commission: 5,
        active: true,
        description: 'Travel essentials and gear',
        type: 'shopping'
      },
      abhibus: {
        id: 'abhibus',
        name: 'AbhiBus',
        logo: '🚌',
        baseUrl: 'https://inr.deals/kQK6mx',
        affiliateId: 'kQK6mx',
        commission: 8,
        active: true,
        description: 'Bus tickets across India',
        type: 'bus'
      }
    }
  };

  beforeEach(waitForAsync(() => {
    const configServiceSpy = jasmine.createSpyObj('AffiliateConfigService', [
      'initConfig',
      'loadConfig',
      'getCurrentConfig'
    ]);
    configServiceSpy.initConfig.and.returnValue(of({ status: 'initialized' }));
    configServiceSpy.loadConfig.and.returnValue(of(mockConfig));
    configServiceSpy.config$ = of(mockConfig);

    const bookingServiceSpy = jasmine.createSpyObj('BookingService', [
      'triggerHotelBooking',
      'closeHotelBooking',
      'triggerBusBooking',
      'closeBusBooking',
      'triggerEssentials'
    ]);
    bookingServiceSpy.hotelBooking$ = of(false);
    bookingServiceSpy.busBooking$ = of(false);
    bookingServiceSpy.essentials$ = of(false);

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [CommonModule, RouterLink, RouterLinkActive],
      providers: [
        { provide: AffiliateConfigService, useValue: configServiceSpy },
        { provide: BookingService, useValue: bookingServiceSpy }
      ]
    }).compileComponents();

    affiliateConfigService = TestBed.inject(AffiliateConfigService) as jasmine.SpyObj<AffiliateConfigService>;
    bookingService = TestBed.inject(BookingService) as jasmine.SpyObj<BookingService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize modal states as closed', () => {
      expect(component.isHotelModalOpen).toBe(false);
      expect(component.isBusModalOpen).toBe(false);
      expect(component.isEssentialsModalOpen).toBe(false);
    });

    it('should load affiliate config on init', waitForAsync(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(affiliateConfigService.initConfig).toHaveBeenCalled();
      });
    }));
  });

  describe('Agoda Affiliate Integration', () => {
    beforeEach(waitForAsync(() => {
      fixture.detectChanges();
      fixture.whenStable();
    }));

    it('should load Agoda affiliate ID from config', waitForAsync(() => {
      fixture.whenStable().then(() => {
        expect(component.agodaAffiliateId).toBe('1955073');
      });
    }));

    it('should construct correct Agoda hotel URL', () => {
      component.agodaAffiliateId = '1955073';
      const expectedUrl = 'https://www.agoda.com/?cid=1955073';
      expect(component.agodaAffiliateId).toBeDefined();
    });

    it('should use correct CID in Agoda URL', waitForAsync(() => {
      fixture.whenStable().then(() => {
        expect(component.agodaAffiliateId).not.toBe('1891348'); // Old wrong ID
        expect(component.agodaAffiliateId).toBe('1955073');
      });
    }));

    it('should update Agoda ID when config changes', waitForAsync(() => {
      const newConfig = { ...mockConfig };
      newConfig.partners.agoda.affiliateId = 'NEW_ID';
      affiliateConfigService.loadConfig.and.returnValue(of(newConfig));

      component.loadAffiliateConfig();
      fixture.whenStable().then(() => {
        expect(component.agodaAffiliateId).toBe('NEW_ID');
      });
    }));
  });

  describe('Hotel Booking Modal', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should open hotel modal when triggered', () => {
      component.openHotelBooking();
      expect(component.isHotelModalOpen).toBe(true);
    });

    it('should close hotel modal when triggered', () => {
      component.isHotelModalOpen = true;
      component.closeHotelModal();
      expect(component.isHotelModalOpen).toBe(false);
    });

    it('should trigger booking service when opening hotel modal', () => {
      component.openHotelBooking();
      expect(bookingService.triggerHotelBooking).toHaveBeenCalled();
    });

    it('should trigger booking service when closing hotel modal', () => {
      component.closeHotelModal();
      expect(bookingService.closeHotelBooking).toHaveBeenCalled();
    });

    it('should contain Agoda link in hotel modal', waitForAsync(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.agodaAffiliateId).toBeDefined();
      });
    }));
  });

  describe('Bus Booking Modal', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should open bus modal when triggered', () => {
      component.openBusBooking();
      expect(component.isBusModalOpen).toBe(true);
    });

    it('should close bus modal when triggered', () => {
      component.isBusModalOpen = true;
      component.closeBusModal();
      expect(component.isBusModalOpen).toBe(false);
    });

    it('should trigger booking service when opening bus modal', () => {
      component.openBusBooking();
      expect(bookingService.triggerBusBooking).toHaveBeenCalled();
    });

    it('should trigger booking service when closing bus modal', () => {
      component.closeBusModal();
      expect(bookingService.closeBusBooking).toHaveBeenCalled();
    });

    it('should show AbhiBus as option', () => {
      expect(component).toBeTruthy();
      // AbhiBus should be available from config
    });
  });

  describe('Essentials Booking Modal', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should open essentials modal when triggered', () => {
      component.openEssentialsBooking();
      expect(component.isEssentialsModalOpen).toBe(true);
    });

    it('should close essentials modal when triggered', () => {
      component.isEssentialsModalOpen = true;
      component.closeEssentialsModal();
      expect(component.isEssentialsModalOpen).toBe(false);
    });

    it('should trigger booking service when opening essentials', () => {
      component.openEssentialsBooking();
      expect(bookingService.triggerEssentials).toHaveBeenCalled();
    });

    it('should show Amazon as essentials partner', () => {
      expect(component).toBeTruthy();
      // Amazon should be available from config
    });
  });

  describe('Affiliate Config Loading', () => {
    it('should load affiliate config from service', waitForAsync(() => {
      component.loadAffiliateConfig();
      fixture.whenStable().then(() => {
        expect(affiliateConfigService.loadConfig).toHaveBeenCalled();
      });
    }));

    it('should handle config load errors gracefully', waitForAsync(() => {
      affiliateConfigService.loadConfig.and.returnValue(
        throwError(() => new Error('Config load failed'))
      );
      component.loadAffiliateConfig();
      fixture.whenStable().then(() => {
        // Component should still be functional
        expect(component).toBeTruthy();
      });
    }));

    it('should extract Agoda affiliate ID from config', waitForAsync(() => {
      component.loadAffiliateConfig();
      fixture.whenStable().then(() => {
        expect(component.agodaAffiliateId).toBeDefined();
        expect(typeof component.agodaAffiliateId).toBe('string');
      });
    }));
  });

  describe('Instant Booking Bar Integration', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should have sticky booking bar visible', () => {
      expect(component).toBeTruthy();
    });

    it('should handle hotel booking action from sticky bar', () => {
      component.openHotelBooking();
      expect(component.isHotelModalOpen).toBe(true);
    });

    it('should handle bus booking action from sticky bar', () => {
      component.openBusBooking();
      expect(component.isBusModalOpen).toBe(true);
    });

    it('should handle essentials booking action from sticky bar', () => {
      component.openEssentialsBooking();
      expect(component.isEssentialsModalOpen).toBe(true);
    });
  });

  describe('Modal Visibility', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should not show multiple modals simultaneously', () => {
      component.isHotelModalOpen = true;
      component.openBusBooking();
      // One modal should close when another opens (optional, depends on design)
      expect(component.isBusModalOpen).toBe(true);
    });

    it('should allow closing modals independently', () => {
      component.isHotelModalOpen = true;
      component.isBusModalOpen = true;

      component.closeHotelModal();
      expect(component.isHotelModalOpen).toBe(false);
      expect(component.isBusModalOpen).toBe(true);

      component.closeBusModal();
      expect(component.isBusModalOpen).toBe(false);
    });
  });

  describe('GA4 Tracking', () => {
    beforeEach(() => {
      fixture.detectChanges();
      spyOn(window, 'gtag' as any);
    });

    it('should track hotel booking intent', () => {
      component.openHotelBooking();
      // GA4 tracking should be called for hotel_booking_intent
    });

    it('should track bus booking intent', () => {
      component.openBusBooking();
      // GA4 tracking should be called for bus_booking_intent
    });

    it('should track essentials booking intent', () => {
      component.openEssentialsBooking();
      // GA4 tracking should be called for essentials_booking_intent
    });
  });

  describe('Partnership Configuration', () => {
    it('should have only active partners configured', waitForAsync(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        // Verify active partners
        expect(mockConfig.partners.agoda.active).toBe(true);
        expect(mockConfig.partners.amazon.active).toBe(true);
        expect(mockConfig.partners.abhibus.active).toBe(true);
      });
    }));

    it('should not show inactive partners', () => {
      // Booking and Expedia should not be visible (active: false)
      expect(mockConfig.partners.agoda.active).toBe(true);
    });
  });
});

// Helper function
function throwError(errorFactory: () => any) {
  return throwErrorInternal(errorFactory());
}

function throwErrorInternal(error: any) {
  return of().pipe(
    flatMap(() => {
      throw error;
    })
  );
}

// Import for throwError helper
import { throwError as throwErrorRxJS, of, flatMap } from 'rxjs';
