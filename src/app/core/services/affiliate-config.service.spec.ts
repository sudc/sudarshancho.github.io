import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AffiliateConfigService, AffiliateConfigData } from './affiliate-config.service';

describe('AffiliateConfigService', () => {
  let service: AffiliateConfigService;
  let httpMock: HttpTestingController;
  const apiUrl = 'https://tripsaver-github-io.onrender.com/api/affiliate-config';

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
    },
    lastUpdated: new Date().toISOString(),
    updatedBy: 'test'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AffiliateConfigService]
    });
    service = TestBed.inject(AffiliateConfigService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('loadConfig', () => {
    it('should load affiliate config from MongoDB', async () => {
      let loadedConfig: AffiliateConfigData | null = null;
      
      service.loadConfig().subscribe((config) => {
        loadedConfig = config;
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockConfig);
      
      expect(loadedConfig).toEqual(mockConfig);
      expect(loadedConfig?.partners).toBeDefined();
      expect(loadedConfig?.partners['agoda']).toBeDefined();
    });

    it('should update configSubject when config is loaded', async () => {
      service.loadConfig().subscribe();

      const req = httpMock.expectOne(apiUrl);
      req.flush(mockConfig);
      
      expect(service.getCurrentConfig()).toEqual(mockConfig);
    });

    it('should handle errors gracefully', async () => {
      let error: any = null;
      
      service.loadConfig().subscribe(
        () => {},
        (err) => {
          error = err;
        }
      );

      const req = httpMock.expectOne(apiUrl);
      req.flush('Server error', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('getCurrentConfig', () => {
    it('should return current config synchronously', () => {
      // Load config first
      service.loadConfig().subscribe();
      const req = httpMock.expectOne(apiUrl);
      req.flush(mockConfig);
      
      const config = service.getCurrentConfig();
      expect(config).toEqual(mockConfig);
    });

    it('should return null if config not loaded', () => {
      const config = service.getCurrentConfig();
      expect(config).toBeNull();
    });
  });

  describe('getActivePartner', () => {
    it('should return active partner from config', () => {
      service.loadConfig().subscribe();
      const req = httpMock.expectOne(apiUrl);
      req.flush(mockConfig);

      const activePartner = service.getActivePartner();
      expect(activePartner).toBe('agoda');
    });
  });

  describe('getAffiliateId', () => {
    it('should return affiliate ID for specific partner', () => {
      service.loadConfig().subscribe();
      const req = httpMock.expectOne(apiUrl);
      req.flush(mockConfig);

      const agodaId = service.getAffiliateId('agoda');
      expect(agodaId).toBe('1955073');

      const amazonId = service.getAffiliateId('amazon');
      expect(amazonId).toBe('tripsaver21-21');
    });
  });

  describe('Partner filtering', () => {
    it('should correctly identify active partners', () => {
      service.loadConfig().subscribe();
      const req = httpMock.expectOne(apiUrl);
      req.flush(mockConfig);

      const config = service.getCurrentConfig();
      const activePartners = Object.values(config!.partners).filter((p) => p.active);
      expect(activePartners.length).toBe(3);
    });
  });
});
