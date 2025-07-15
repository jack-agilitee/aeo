# Free Shipping Indicator Component

## Overview

The Free Shipping Indicator component is a reusable Angular/Ionic component that displays a visual progress indicator showing how close a customer is to qualifying for free shipping. It includes a progress bar, status message, and optional details link.

## Features

- **Progress visualization**: Visual progress bar showing current amount vs. free shipping threshold
- **Dynamic status messages**: Shows remaining amount needed or confirmation when threshold is reached
- **Responsive design**: Adapts to mobile and desktop layouts
- **Customizable configuration**: Flexible configuration options for different use cases
- **Multiple states**: Supports both achieved and unachieved states with visual feedback
- **Accessibility**: Built with semantic HTML and ARIA support

## Usage

### Basic Implementation

```typescript
// In your component template
<app-free-shipping-indicator 
  [config]="shippingConfig"
  [isMobile]="isMobile">
</app-free-shipping-indicator>
```

### Component Configuration

```typescript
import { FreeShippingConfig } from './components/free-shipping-indicator/free-shipping-indicator.component';

export class YourComponent {
  shippingConfig: FreeShippingConfig = {
    currentAmount: 45,
    freeShippingThreshold: 75,
    currency: '$',
    showDetails: true,
    detailsText: 'Details'
  };
  
  isMobile: boolean = false;
}
```

## API Reference

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `config` | `FreeShippingConfig` | See default config | Configuration object for the component |
| `isMobile` | `boolean` | `false` | Whether to use mobile styling |

### FreeShippingConfig Interface

```typescript
interface FreeShippingConfig {
  currentAmount: number;           // Current cart amount
  freeShippingThreshold: number;   // Amount needed for free shipping
  currency: string;                // Currency symbol to display
  showDetails: boolean;            // Whether to show details link
  detailsText?: string;            // Text for details link (optional)
}
```

### Computed Properties

| Property | Type | Description |
|----------|------|-------------|
| `remainingAmount` | `number` | Amount still needed for free shipping |
| `progressPercentage` | `number` | Progress percentage (0-100) |
| `state` | `'unachieved' \| 'achieved'` | Current state of shipping qualification |
| `progressBarWidth` | `string` | CSS width for progress bar |
| `statusMessage` | `string` | Dynamic status message |

### Methods

| Method | Description |
|--------|-------------|
| `onDetailsClick()` | Handles details link click event |

## Styling

The component uses SCSS with BEM-like naming conventions and includes:

- **Base styles**: Default desktop layout
- **Mobile styles**: Responsive mobile adaptations
- **State styles**: Visual feedback for achieved/unachieved states
- **Responsive breakpoints**: Adaptive layouts for different screen sizes

### CSS Classes

- `.free-shipping-indicator` - Main container
- `.free-shipping-indicator.mobile` - Mobile layout
- `.free-shipping-indicator.achieved` - Achieved state
- `.content` - Content wrapper
- `.copy` - Text content area
- `.status-message` - Status text
- `.details-link` - Details link
- `.progress-bar-container` - Progress bar wrapper
- `.progress-bar` - Progress bar container
- `.progress-bar-track` - Progress bar track
- `.progress-bar-fill` - Progress bar fill
- `.min-amount`, `.max-amount` - Amount labels

## Examples

### Basic Usage

```typescript
// Component with default settings
shippingConfig: FreeShippingConfig = {
  currentAmount: 25,
  freeShippingThreshold: 75,
  currency: '$',
  showDetails: true
};
```

### Mobile Layout

```typescript
// Mobile-optimized layout
shippingConfig: FreeShippingConfig = {
  currentAmount: 50,
  freeShippingThreshold: 100,
  currency: '$',
  showDetails: true,
  detailsText: 'Learn more'
};

isMobile = true;
```

### Different Currency

```typescript
// European configuration
shippingConfig: FreeShippingConfig = {
  currentAmount: 35,
  freeShippingThreshold: 60,
  currency: '€',
  showDetails: true,
  detailsText: 'Détails'
};
```

### Achieved State

```typescript
// When free shipping is achieved
shippingConfig: FreeShippingConfig = {
  currentAmount: 100,
  freeShippingThreshold: 75,
  currency: '$',
  showDetails: false  // Usually hidden when achieved
};
```

## Testing

The component includes comprehensive test coverage with:

- **Unit tests**: Testing all component properties and methods
- **Integration tests**: Testing template rendering and user interactions
- **Edge case tests**: Testing boundary conditions and error states
- **Accessibility tests**: Ensuring proper ARIA support

Run tests with:
```bash
ng test
```

## Accessibility

The component follows accessibility best practices:

- **Semantic HTML**: Proper use of HTML elements
- **ARIA attributes**: Screen reader support
- **Keyboard navigation**: Accessible keyboard interactions
- **Color contrast**: Sufficient color contrast ratios
- **Screen reader announcements**: Dynamic content updates

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Considerations

- **Lightweight**: Minimal bundle size impact
- **Smooth animations**: CSS transitions for progress bar
- **Efficient updates**: OnPush change detection strategy compatible
- **Memory efficient**: No memory leaks or excessive DOM manipulation

## Integration with Ionic

The component is designed to work seamlessly with Ionic applications:

- **Ionic styling**: Compatible with Ionic design system
- **Responsive design**: Works with Ionic's responsive utilities
- **Theme support**: Adapts to Ionic theme variables
- **Platform detection**: Can be used with Ionic's Platform service

## Future Enhancements

Potential future improvements:

- **Animation options**: Configurable animation styles
- **Custom themes**: Theme configuration options
- **Internationalization**: Built-in i18n support
- **Analytics integration**: Built-in tracking events
- **Custom progress indicators**: Alternative progress bar styles

## Troubleshooting

### Common Issues

1. **Progress bar not showing**: Check that `currentAmount` and `freeShippingThreshold` are valid numbers
2. **Styling issues**: Ensure component styles are properly imported
3. **Mobile layout problems**: Verify `isMobile` input is correctly set
4. **Details link not working**: Check that `showDetails` is true and state is 'unachieved'

### Debug Mode

Enable debug logging by adding to component:

```typescript
ngOnInit() {
  console.log('Free Shipping Config:', this.config);
  console.log('Current State:', this.state);
  console.log('Progress:', this.progressPercentage);
}
```

## Contributing

When contributing to this component:

1. Follow Angular/Ionic best practices
2. Maintain test coverage above 90%
3. Update documentation for any API changes
4. Test on both mobile and desktop
5. Ensure accessibility compliance

## License

This component is part of the AEO project and follows the project's licensing terms.