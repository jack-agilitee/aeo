import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FreeShippingIndicatorComponent, FreeShippingConfig } from './free-shipping-indicator.component';

describe('FreeShippingIndicatorComponent', () => {
  let component: FreeShippingIndicatorComponent;
  let fixture: ComponentFixture<FreeShippingIndicatorComponent>;
  let compiled: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FreeShippingIndicatorComponent, IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FreeShippingIndicatorComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Properties', () => {
    it('should have default config values', () => {
      expect(component.config.currentAmount).toBe(0);
      expect(component.config.freeShippingThreshold).toBe(75);
      expect(component.config.currency).toBe('$');
      expect(component.config.showDetails).toBe(true);
      expect(component.config.detailsText).toBe('Details');
    });

    it('should accept custom config input', () => {
      const customConfig: FreeShippingConfig = {
        currentAmount: 50,
        freeShippingThreshold: 100,
        currency: '€',
        showDetails: false
      };
      component.config = customConfig;
      fixture.detectChanges();

      expect(component.config.currentAmount).toBe(50);
      expect(component.config.freeShippingThreshold).toBe(100);
      expect(component.config.currency).toBe('€');
      expect(component.config.showDetails).toBe(false);
    });

    it('should accept isMobile input', () => {
      component.isMobile = true;
      fixture.detectChanges();

      expect(component.isMobile).toBe(true);
    });
  });

  describe('Computed Properties', () => {
    it('should calculate remaining amount correctly', () => {
      component.config = {
        currentAmount: 25,
        freeShippingThreshold: 75,
        currency: '$',
        showDetails: true
      };
      expect(component.remainingAmount).toBe(50);
    });

    it('should return 0 remaining amount when threshold is reached', () => {
      component.config = {
        currentAmount: 100,
        freeShippingThreshold: 75,
        currency: '$',
        showDetails: true
      };
      expect(component.remainingAmount).toBe(0);
    });

    it('should calculate progress percentage correctly', () => {
      component.config = {
        currentAmount: 25,
        freeShippingThreshold: 100,
        currency: '$',
        showDetails: true
      };
      expect(component.progressPercentage).toBe(25);
    });

    it('should cap progress percentage at 100%', () => {
      component.config = {
        currentAmount: 150,
        freeShippingThreshold: 100,
        currency: '$',
        showDetails: true
      };
      expect(component.progressPercentage).toBe(100);
    });

    it('should return correct state when unachieved', () => {
      component.config = {
        currentAmount: 50,
        freeShippingThreshold: 75,
        currency: '$',
        showDetails: true
      };
      expect(component.state).toBe('unachieved');
    });

    it('should return correct state when achieved', () => {
      component.config = {
        currentAmount: 75,
        freeShippingThreshold: 75,
        currency: '$',
        showDetails: true
      };
      expect(component.state).toBe('achieved');
    });

    it('should return correct progress bar width', () => {
      component.config = {
        currentAmount: 30,
        freeShippingThreshold: 100,
        currency: '$',
        showDetails: true
      };
      expect(component.progressBarWidth).toBe('30%');
    });

    it('should return correct status message when unachieved', () => {
      component.config = {
        currentAmount: 25,
        freeShippingThreshold: 75,
        currency: '$',
        showDetails: true
      };
      expect(component.statusMessage).toBe('You\'re $50 away from free shipping!');
    });

    it('should return correct status message when achieved', () => {
      component.config = {
        currentAmount: 75,
        freeShippingThreshold: 75,
        currency: '$',
        showDetails: true
      };
      expect(component.statusMessage).toBe('You qualify for free shipping!');
    });
  });

  describe('Template Rendering', () => {
    it('should render the component with correct structure', () => {
      const indicator = compiled.querySelector('.free-shipping-indicator');
      expect(indicator).toBeTruthy();
      
      const content = compiled.querySelector('.content');
      expect(content).toBeTruthy();
      
      const progressBarContainer = compiled.querySelector('.progress-bar-container');
      expect(progressBarContainer).toBeTruthy();
    });

    it('should apply mobile class when isMobile is true', () => {
      component.isMobile = true;
      fixture.detectChanges();
      
      const indicator = compiled.querySelector('.free-shipping-indicator');
      expect(indicator?.classList.contains('mobile')).toBe(true);
    });

    it('should apply achieved class when state is achieved', () => {
      component.config = {
        currentAmount: 75,
        freeShippingThreshold: 75,
        currency: '$',
        showDetails: true
      };
      fixture.detectChanges();
      
      const indicator = compiled.querySelector('.free-shipping-indicator');
      expect(indicator?.classList.contains('achieved')).toBe(true);
    });

    it('should display correct status message', () => {
      component.config = {
        currentAmount: 25,
        freeShippingThreshold: 75,
        currency: '$',
        showDetails: true
      };
      fixture.detectChanges();
      
      const statusMessage = compiled.querySelector('.status-message');
      expect(statusMessage?.textContent?.trim()).toContain('You\'re $50 away from free shipping!');
    });

    it('should show details link when showDetails is true and state is unachieved', () => {
      component.config = {
        currentAmount: 25,
        freeShippingThreshold: 75,
        currency: '$',
        showDetails: true,
        detailsText: 'Details'
      };
      fixture.detectChanges();
      
      const detailsLink = compiled.querySelector('.details-link');
      expect(detailsLink).toBeTruthy();
      expect(detailsLink?.textContent?.trim()).toBe('Details');
    });

    it('should hide details link when showDetails is false', () => {
      component.config = {
        currentAmount: 25,
        freeShippingThreshold: 75,
        currency: '$',
        showDetails: false
      };
      fixture.detectChanges();
      
      const detailsLink = compiled.querySelector('.details-link');
      expect(detailsLink).toBeFalsy();
    });

    it('should hide details link when state is achieved', () => {
      component.config = {
        currentAmount: 75,
        freeShippingThreshold: 75,
        currency: '$',
        showDetails: true
      };
      fixture.detectChanges();
      
      const detailsLink = compiled.querySelector('.details-link');
      expect(detailsLink).toBeFalsy();
    });

    it('should display correct min and max amounts', () => {
      component.config = {
        currentAmount: 25,
        freeShippingThreshold: 75,
        currency: '$',
        showDetails: true
      };
      fixture.detectChanges();
      
      const minAmount = compiled.querySelector('.min-amount');
      const maxAmount = compiled.querySelector('.max-amount');
      
      expect(minAmount?.textContent?.trim()).toBe('$0');
      expect(maxAmount?.textContent?.trim()).toBe('$75');
    });

    it('should set correct progress bar width', () => {
      component.config = {
        currentAmount: 30,
        freeShippingThreshold: 100,
        currency: '$',
        showDetails: true
      };
      fixture.detectChanges();
      
      const progressBarFill = compiled.querySelector('.progress-bar-fill') as HTMLElement;
      expect(progressBarFill.style.width).toBe('30%');
    });

    it('should apply achieved class to progress bar when state is achieved', () => {
      component.config = {
        currentAmount: 75,
        freeShippingThreshold: 75,
        currency: '$',
        showDetails: true
      };
      fixture.detectChanges();
      
      const progressBarFill = compiled.querySelector('.progress-bar-fill');
      expect(progressBarFill?.classList.contains('achieved')).toBe(true);
    });
  });

  describe('Event Handling', () => {
    it('should handle details click', () => {
      spyOn(component, 'onDetailsClick');
      spyOn(console, 'log');
      
      component.config = {
        currentAmount: 25,
        freeShippingThreshold: 75,
        currency: '$',
        showDetails: true
      };
      fixture.detectChanges();
      
      const detailsLink = compiled.querySelector('.details-link') as HTMLElement;
      detailsLink.click();
      
      expect(component.onDetailsClick).toHaveBeenCalled();
    });

    it('should log when details are clicked', () => {
      spyOn(console, 'log');
      
      component.onDetailsClick();
      
      expect(console.log).toHaveBeenCalledWith('Details clicked');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero threshold', () => {
      component.config = {
        currentAmount: 0,
        freeShippingThreshold: 0,
        currency: '$',
        showDetails: true
      };
      fixture.detectChanges();
      
      expect(component.remainingAmount).toBe(0);
      expect(component.progressPercentage).toBe(100);
      expect(component.state).toBe('achieved');
    });

    it('should handle negative current amount', () => {
      component.config = {
        currentAmount: -10,
        freeShippingThreshold: 75,
        currency: '$',
        showDetails: true
      };
      fixture.detectChanges();
      
      expect(component.remainingAmount).toBe(85);
      expect(component.progressPercentage).toBe(0);
      expect(component.state).toBe('unachieved');
    });

    it('should handle different currencies', () => {
      component.config = {
        currentAmount: 25,
        freeShippingThreshold: 75,
        currency: '€',
        showDetails: true
      };
      fixture.detectChanges();
      
      expect(component.statusMessage).toBe('You\'re €50 away from free shipping!');
      
      const minAmount = compiled.querySelector('.min-amount');
      const maxAmount = compiled.querySelector('.max-amount');
      
      expect(minAmount?.textContent?.trim()).toBe('€0');
      expect(maxAmount?.textContent?.trim()).toBe('€75');
    });
  });
});
