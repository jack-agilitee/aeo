import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { FreeShippingIndicatorComponent, FreeShippingConfig } from '../components/free-shipping-indicator/free-shipping-indicator.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, FreeShippingIndicatorComponent],
})
export class HomePage {
  public shippingConfig: FreeShippingConfig = {
    currentAmount: 45,
    freeShippingThreshold: 75,
    currency: '$',
    showDetails: true,
    detailsText: 'Details'
  };

  constructor() {}
}
