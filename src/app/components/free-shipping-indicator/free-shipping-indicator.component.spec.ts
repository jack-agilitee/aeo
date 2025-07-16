import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FreeShippingIndicatorComponent } from './free-shipping-indicator.component';

describe('FreeShippingIndicatorComponent', () => {
  let component: FreeShippingIndicatorComponent;
  let fixture: ComponentFixture<FreeShippingIndicatorComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreeShippingIndicatorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FreeShippingIndicatorComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have default values', () => {
      expect(component.currentAmount).toBe(0);
      expect(component.targetAmount).toBe(75);
      expect(component.rewardLevel).toBe(1);
      expect(component.showDetails).toBe(false);
    });

    it('should calculate progress on init', () => {
      component.currentAmount = 25;
      component.targetAmount = 75;
      component.ngOnInit();
      
      expect(component.progressPercentage).toBeCloseTo(33.33, 2);
      expect(component.remainingAmount).toBe(50);
    });
  });

  describe('Progress Calculation', () => {
    it('should calculate correct progress percentage', () => {
      component.currentAmount = 25;
      component.targetAmount = 100;
      component.ngOnInit();
      
      expect(component.progressPercentage).toBe(25);
    });

    it('should calculate remaining amount correctly', () => {
      component.currentAmount = 40;
      component.targetAmount = 75;
      component.ngOnInit();
      
      expect(component.remainingAmount).toBe(35);
    });

    it('should not allow progress to exceed 100%', () => {
      component.currentAmount = 100;
      component.targetAmount = 75;
      component.ngOnInit();
      
      expect(component.progressPercentage).toBe(100);
    });

    it('should not allow negative remaining amount', () => {
      component.currentAmount = 100;
      component.targetAmount = 75;
      component.ngOnInit();
      
      expect(component.remainingAmount).toBe(0);
    });
  });

  describe('Achievement Status', () => {
    it('should return false when current amount is less than target', () => {
      component.currentAmount = 50;
      component.targetAmount = 75;
      
      expect(component.isAchieved).toBe(false);
    });

    it('should return true when current amount equals target', () => {
      component.currentAmount = 75;
      component.targetAmount = 75;
      
      expect(component.isAchieved).toBe(true);
    });

    it('should return true when current amount exceeds target', () => {
      component.currentAmount = 100;
      component.targetAmount = 75;
      
      expect(component.isAchieved).toBe(true);
    });
  });

  describe('Details Toggle', () => {
    it('should toggle details visibility', () => {
      expect(component.showDetails).toBe(false);
      
      component.toggleDetails();
      expect(component.showDetails).toBe(true);
      
      component.toggleDetails();
      expect(component.showDetails).toBe(false);
    });

    it('should display correct reward level when details are hidden', () => {
      component.rewardLevel = 2;
      component.showDetails = false;
      
      expect(component.displayRewardLevel).toBe(2);
    });

    it('should display incremented reward level when details are shown', () => {
      component.rewardLevel = 2;
      component.showDetails = true;
      
      expect(component.displayRewardLevel).toBe(3);
    });
  });

  describe('Template Rendering', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should render main container with correct class', () => {
      const container = compiled.querySelector('.free-shipping-indicator');
      expect(container).toBeTruthy();
    });

    it('should display correct message when not achieved', () => {
      component.currentAmount = 15;
      component.targetAmount = 75;
      component.ngOnInit();
      fixture.detectChanges();
      
      const message = compiled.querySelector('.free-shipping-indicator__message');
      expect(message?.textContent).toContain('You\'re $60 away from free shipping!');
    });

    it('should display achievement message when achieved', () => {
      component.currentAmount = 75;
      component.targetAmount = 75;
      component.ngOnInit();
      fixture.detectChanges();
      
      const message = compiled.querySelector('.free-shipping-indicator__message');
      expect(message?.textContent).toContain('You\'ve earned free shipping!');
    });

    it('should display current and target amounts', () => {
      component.currentAmount = 25;
      component.targetAmount = 75;
      fixture.detectChanges();
      
      const startAmount = compiled.querySelector('.free-shipping-indicator__amount--start');
      const endAmount = compiled.querySelector('.free-shipping-indicator__amount--end');
      
      expect(startAmount?.textContent).toContain('$25');
      expect(endAmount?.textContent).toContain('$75');
    });

    it('should display correct reward level', () => {
      component.rewardLevel = 2;
      fixture.detectChanges();
      
      const perk = compiled.querySelector('.free-shipping-indicator__perk');
      expect(perk?.textContent).toContain('Real Rewards Level 2 perk');
    });

    it('should render progress bar with correct width', () => {
      component.currentAmount = 25;
      component.targetAmount = 100;
      component.ngOnInit();
      fixture.detectChanges();
      
      const progressBar = compiled.querySelector('.free-shipping-indicator__bar-fill') as HTMLElement;
      expect(progressBar.style.width).toBe('25%');
    });
  });

  describe('User Interactions', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should toggle details when details link is clicked', () => {
      const detailsLink = compiled.querySelector('.free-shipping-indicator__details-link') as HTMLButtonElement;
      
      expect(component.showDetails).toBe(false);
      
      detailsLink.click();
      expect(component.showDetails).toBe(true);
      
      detailsLink.click();
      expect(component.showDetails).toBe(false);
    });

    it('should update reward level display when details are toggled', () => {
      component.rewardLevel = 1;
      const detailsLink = compiled.querySelector('.free-shipping-indicator__details-link') as HTMLButtonElement;
      
      detailsLink.click();
      fixture.detectChanges();
      
      const perk = compiled.querySelector('.free-shipping-indicator__perk');
      expect(perk?.textContent).toContain('Real Rewards Level 2 perk');
    });

    it('should have proper accessibility attributes on details button', () => {
      const detailsButton = compiled.querySelector('.free-shipping-indicator__details-link') as HTMLButtonElement;
      
      expect(detailsButton.getAttribute('aria-label')).toBe('Toggle shipping details');
      expect(detailsButton.getAttribute('aria-expanded')).toBe('false');
      
      detailsButton.click();
      fixture.detectChanges();
      
      expect(detailsButton.getAttribute('aria-expanded')).toBe('true');
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      component.currentAmount = 25;
      component.targetAmount = 75;
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should have proper ARIA attributes on progress bar', () => {
      const progressBar = compiled.querySelector('.free-shipping-indicator__bar-fill') as HTMLElement;
      
      expect(progressBar.getAttribute('role')).toBe('progressbar');
      expect(progressBar.getAttribute('aria-valuenow')).toBe('25');
      expect(progressBar.getAttribute('aria-valuemin')).toBe('0');
      expect(progressBar.getAttribute('aria-valuemax')).toBe('75');
      expect(progressBar.getAttribute('aria-label')).toBe('Progress toward free shipping: $25 of $75');
    });

    it('should have proper button type for details link', () => {
      const detailsButton = compiled.querySelector('.free-shipping-indicator__details-link') as HTMLButtonElement;
      expect(detailsButton.type).toBe('button');
    });
  });

  describe('Input Changes', () => {
    it('should recalculate progress when inputs change', () => {
      component.currentAmount = 25;
      component.targetAmount = 100;
      component.ngOnChanges();
      
      expect(component.progressPercentage).toBe(25);
      expect(component.remainingAmount).toBe(75);
      
      component.currentAmount = 50;
      component.ngOnChanges();
      
      expect(component.progressPercentage).toBe(50);
      expect(component.remainingAmount).toBe(50);
    });
  });

  describe('Achieved State Styling', () => {
    it('should apply achieved class to progress bar when target is reached', () => {
      component.currentAmount = 75;
      component.targetAmount = 75;
      component.ngOnInit();
      fixture.detectChanges();
      
      const progressBar = compiled.querySelector('.free-shipping-indicator__bar-fill');
      expect(progressBar).toHaveClass('free-shipping-indicator__bar-fill--achieved');
    });

    it('should not apply achieved class when target is not reached', () => {
      component.currentAmount = 50;
      component.targetAmount = 75;
      component.ngOnInit();
      fixture.detectChanges();
      
      const progressBar = compiled.querySelector('.free-shipping-indicator__bar-fill');
      expect(progressBar).not.toHaveClass('free-shipping-indicator__bar-fill--achieved');
    });
  });
});