import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

export interface FreeShippingConfig {
  currentAmount: number;
  freeShippingThreshold: number;
  currency: string;
  showDetails: boolean;
  detailsText?: string;
}

export type ShippingIndicatorState = 'unachieved' | 'achieved';

@Component({
  selector: 'app-free-shipping-indicator',
  templateUrl: './free-shipping-indicator.component.html',
  styleUrls: ['./free-shipping-indicator.component.scss'],
  imports: [NgIf],
})
export class FreeShippingIndicatorComponent {
  @Input() config: FreeShippingConfig = {
    currentAmount: 0,
    freeShippingThreshold: 75,
    currency: '$',
    showDetails: true,
    detailsText: 'Details'
  };
  
  @Input() isMobile: boolean = false;

  public get remainingAmount(): number {
    return Math.max(0, this.config.freeShippingThreshold - this.config.currentAmount);
  }

  public get progressPercentage(): number {
    if (this.config.freeShippingThreshold === 0) {
      return 100;
    }
    return Math.min(100, Math.max(0, (this.config.currentAmount / this.config.freeShippingThreshold) * 100));
  }

  public get state(): ShippingIndicatorState {
    return this.config.currentAmount >= this.config.freeShippingThreshold ? 'achieved' : 'unachieved';
  }

  public get progressBarWidth(): string {
    return `${this.progressPercentage}%`;
  }

  public get statusMessage(): string {
    if (this.state === 'achieved') {
      return 'You qualify for free shipping!';
    }
    return `You're ${this.config.currency}${this.remainingAmount} away from free shipping!`;
  }

  constructor() { }

  public onDetailsClick(): void {
    // Emit event or handle details click
    console.log('Details clicked');
  }
}
