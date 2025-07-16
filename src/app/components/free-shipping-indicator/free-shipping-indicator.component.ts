import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ShippingThreshold {
  currentAmount: number;
  targetAmount: number;
  rewardLevel: number;
}

@Component({
  selector: 'app-free-shipping-indicator',
  templateUrl: './free-shipping-indicator.component.html',
  styleUrls: ['./free-shipping-indicator.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class FreeShippingIndicatorComponent implements OnInit, OnChanges {
  @Input() currentAmount: number = 0;
  @Input() targetAmount: number = 75;
  @Input() rewardLevel: number = 1;

  public showDetails: boolean = false;
  public progressPercentage: number = 0;
  public remainingAmount: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.calculateProgress();
  }

  ngOnChanges(): void {
    this.calculateProgress();
  }

  public toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }

  public get isAchieved(): boolean {
    return this.currentAmount >= this.targetAmount;
  }

  public get displayRewardLevel(): number {
    return this.showDetails ? this.rewardLevel + 1 : this.rewardLevel;
  }

  private calculateProgress(): void {
    this.remainingAmount = Math.max(0, this.targetAmount - this.currentAmount);
    this.progressPercentage = Math.min(100, (this.currentAmount / this.targetAmount) * 100);
  }
}