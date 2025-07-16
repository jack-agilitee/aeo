# Free Shipping Indicator Component

## Overview

The `FreeShippingIndicatorComponent` is a reusable Angular component that displays progress toward a free shipping threshold. It shows the current amount spent, target amount needed, and a visual progress bar with interactive details functionality.

## Figma Reference

- **Design URL**: https://www.figma.com/design/6nEviUkcfLzd6MF5kIj2kL/AE-Free-Shipping-Indicator?node-id=0-11549&m=dev
- **Node ID**: 0:11549
- **Details State**: https://www.figma.com/design/6nEviUkcfLzd6MF5kIj2kL/AE-Free-Shipping-Indicator?node-id=0-11557&m=dev

## Features

- **Progress Visualization**: Visual progress bar showing current amount vs target
- **Dynamic Text**: Shows remaining amount needed for free shipping
- **Interactive Details**: Clickable "Details" link toggles reward level information
- **Achievement State**: Different styling when free shipping is achieved
- **Accessibility**: Full ARIA support and keyboard navigation
- **Responsive Design**: Mobile-friendly layout with breakpoints
- **TypeScript Support**: Full type safety with interfaces

## Usage

### Basic Implementation

```typescript
// In your component
import { FreeShippingIndicatorComponent } from './components/free-shipping-indicator/free-shipping-indicator.component';

// In your template
<app-free-shipping-indicator 
  [currentAmount]="25"
  [targetAmount]="75"
  [rewardLevel]="1">
</app-free-shipping-indicator>
```

### Advanced Usage

```typescript
// Component with dynamic data
export class MyComponent {
  cartTotal: number = 45;
  freeShippingThreshold: number = 75;
  userRewardLevel: number = 2;
  
  onCartUpdate(newTotal: number) {
    this.cartTotal = newTotal;
  }
}
```

```html
<app-free-shipping-indicator 
  [currentAmount]="cartTotal"
  [targetAmount]="freeShippingThreshold"
  [rewardLevel]="userRewardLevel">
</app-free-shipping-indicator>
```

## API Reference

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `currentAmount` | `number` | `0` | Current amount spent toward free shipping |
| `targetAmount` | `number` | `75` | Target amount needed for free shipping |
| `rewardLevel` | `number` | `1` | Current reward level (affects details display) |

### Public Properties

| Property | Type | Description |
|----------|------|-------------|
| `showDetails` | `boolean` | Whether details are currently expanded |
| `progressPercentage` | `number` | Calculated progress percentage (0-100) |
| `remainingAmount` | `number` | Amount remaining to reach target |
| `isAchieved` | `boolean` | Whether free shipping has been achieved |
| `displayRewardLevel` | `number` | Reward level to display (toggles with details) |

### Public Methods

| Method | Description |
|--------|-------------|
| `toggleDetails()` | Toggles the details visibility state |

### Interfaces

```typescript
export interface ShippingThreshold {
  currentAmount: number;
  targetAmount: number;
  rewardLevel: number;
}
```

## Styling

The component uses BEM methodology for CSS classes:

### CSS Classes

- `.free-shipping-indicator` - Main container
- `.free-shipping-indicator__content` - Content wrapper
- `.free-shipping-indicator__text` - Text content area
- `.free-shipping-indicator__message` - Main message text
- `.free-shipping-indicator__details-link` - Clickable details link
- `.free-shipping-indicator__perk` - Reward level text
- `.free-shipping-indicator__progress` - Progress bar container
- `.free-shipping-indicator__bar` - Progress bar background
- `.free-shipping-indicator__bar-fill` - Progress bar fill
- `.free-shipping-indicator__amount` - Amount labels

### Modifiers

- `.free-shipping-indicator__bar-fill--achieved` - Applied when target is reached
- `.free-shipping-indicator__amount--start` - Start amount styling
- `.free-shipping-indicator__amount--end` - End amount styling

### Customization

You can customize the component by overriding SCSS variables:

```scss
.free-shipping-indicator {
  --primary-color: #385adc;
  --success-color: #28a745;
  --text-color: #24272a;
  --secondary-text-color: #666666;
  --border-color: #cccccc;
  --background-color: #ffffff;
}
```

## Accessibility

The component includes comprehensive accessibility features:

- **ARIA Attributes**: Progress bar includes `role="progressbar"` and appropriate `aria-*` attributes
- **Keyboard Support**: Details link is keyboard accessible
- **Screen Reader Support**: Descriptive labels and state announcements
- **Focus Management**: Proper focus indicators and tabbing

### ARIA Attributes

- `aria-expanded` - Indicates details expansion state
- `aria-label` - Provides accessible labels
- `aria-valuenow/min/max` - Progress bar values
- `role="progressbar"` - Progress bar semantic role

## Responsive Design

The component includes responsive breakpoints:

- **Desktop**: Full width with standard padding
- **Tablet (≤768px)**: Reduced padding, adjusted text sizes
- **Mobile (≤480px)**: Compact layout, smaller progress bar

## Examples

### Basic Example

```html
<app-free-shipping-indicator 
  [currentAmount]="15"
  [targetAmount]="75"
  [rewardLevel]="1">
</app-free-shipping-indicator>
```

**Result**: "You're $60 away from free shipping!" with 20% progress bar

### Achievement Example

```html
<app-free-shipping-indicator 
  [currentAmount]="75"
  [targetAmount]="75"
  [rewardLevel]="2">
</app-free-shipping-indicator>
```

**Result**: "You've earned free shipping!" with 100% progress bar and green styling

### Dynamic Example

```typescript
export class CartComponent {
  cartData = {
    currentAmount: 45,
    targetAmount: 75,
    rewardLevel: 1
  };
  
  updateCart(newAmount: number) {
    this.cartData.currentAmount = newAmount;
  }
}
```

```html
<app-free-shipping-indicator 
  [currentAmount]="cartData.currentAmount"
  [targetAmount]="cartData.targetAmount"
  [rewardLevel]="cartData.rewardLevel">
</app-free-shipping-indicator>
```

## Testing

The component includes comprehensive test coverage:

### Test Categories

1. **Component Initialization** - Default values and setup
2. **Progress Calculation** - Mathematical calculations
3. **Achievement Status** - Target reached logic
4. **Details Toggle** - Interactive functionality
5. **Template Rendering** - DOM output verification
6. **User Interactions** - Click handling
7. **Accessibility** - ARIA and keyboard support
8. **Input Changes** - Dynamic updates
9. **Styling** - CSS class applications

### Running Tests

```bash
# Run unit tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run specific component tests
npm run test -- --grep "FreeShippingIndicatorComponent"
```

## Integration

### Module Import

```typescript
import { FreeShippingIndicatorModule } from './components/free-shipping-indicator/free-shipping-indicator.module';

@NgModule({
  imports: [
    FreeShippingIndicatorModule
  ]
})
export class MyModule { }
```

### Standalone Usage

```typescript
import { FreeShippingIndicatorComponent } from './components/free-shipping-indicator/free-shipping-indicator.component';

@Component({
  standalone: true,
  imports: [FreeShippingIndicatorComponent],
  template: `
    <app-free-shipping-indicator 
      [currentAmount]="amount"
      [targetAmount]="target">
    </app-free-shipping-indicator>
  `
})
export class MyComponent { }
```

## Performance Considerations

- **Change Detection**: Uses OnPush strategy for optimal performance
- **Calculations**: Efficient mathematical operations with caching
- **DOM Updates**: Minimal DOM manipulations
- **Memory Usage**: No memory leaks in event listeners

## Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile**: iOS 14+, Android 8+

## Contributing

When contributing to this component:

1. Follow BEM methodology for CSS classes
2. Maintain test coverage >90%
3. Include accessibility features
4. Test on multiple screen sizes
5. Validate with screen readers
6. Update documentation for API changes

## Changelog

### v1.0.0
- Initial implementation from Figma design
- Basic progress tracking functionality
- Interactive details toggle
- Comprehensive test suite
- Full accessibility support
- Responsive design
- BEM methodology styling

---

**Last Updated**: July 2025  
**Component Version**: 1.0.0  
**Angular Version**: 17+  
**Ionic Version**: 7+