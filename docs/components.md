# Components Documentation

## Overview

This document provides detailed information about the components used in the AEO Ionic Angular application, including their structure, usage, and best practices.

## Component Architecture

### Component Types

1. **Pages**: Full-screen components that represent application screens
2. **Shared Components**: Reusable components used across multiple pages
3. **UI Components**: Ionic framework components and custom UI elements

### Component Structure

All components follow the Angular component structure:

```typescript
@Component({
  selector: 'app-component-name',
  templateUrl: './component-name.component.html',
  styleUrls: ['./component-name.component.scss']
})
export class ComponentNameComponent implements OnInit {
  // Component logic
}
```

## Current Components

### HomePage

**Location**: `src/app/home/home.page.ts`

**Purpose**: Main landing page of the application

**Structure**:
```typescript
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  constructor() {}
}
```

**Template Features**:
- Translucent header with collapse behavior
- Full-screen content area
- Responsive design
- Ionic UI components integration

**Usage**:
```html
<ion-header [translucent]="true">
  <ion-toolbar>
    <ion-title>Blank</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content [fullscreen]="true">
  <ion-header collapse="condense">
    <ion-toolbar>
      <ion-title size="large">Blank</ion-title>
    </ion-toolbar>
  </ion-header>
  
  <div id="container">
    <strong>Ready to create an app?</strong>
    <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
  </div>
</ion-content>
```

### AppComponent

**Location**: `src/app/app.component.ts`

**Purpose**: Root component of the application

**Responsibilities**:
- Application initialization
- Router outlet configuration
- Global app settings

## Component Development Guidelines

### File Naming Conventions

- **Pages**: `component-name.page.ts`
- **Components**: `component-name.component.ts`
- **Services**: `service-name.service.ts`
- **Models**: `model-name.model.ts`

### Component Template Structure

```typescript
@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {
  // Properties
  public data: any[] = [];
  
  // Constructor with dependency injection
  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}
  
  // Lifecycle hooks
  ngOnInit() {
    this.loadData();
  }
  
  // Public methods
  public handleAction() {
    // Handle user interactions
  }
  
  // Private methods
  private loadData() {
    // Load component data
  }
}
```

### Page Component Template

```typescript
@Component({
  selector: 'app-example-page',
  templateUrl: './example.page.html',
  styleUrls: ['./example.page.scss']
})
export class ExamplePage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}
  
  ngOnInit() {}
  
  // Ionic page lifecycle hooks
  ionViewWillEnter() {
    // Called when entering page
  }
  
  ionViewDidEnter() {
    // Called when page is fully entered
  }
  
  ionViewWillLeave() {
    // Called when leaving page
  }
  
  ionViewDidLeave() {
    // Called when page is fully left
  }
}
```

## Ionic Components Usage

### Common Ionic Components

1. **IonHeader**: Page header with toolbar
2. **IonToolbar**: Navigation toolbar
3. **IonTitle**: Page title
4. **IonContent**: Main content area
5. **IonButton**: Interactive buttons
6. **IonCard**: Card layout container
7. **IonList**: List container
8. **IonItem**: List item
9. **IonInput**: Form input field
10. **IonModal**: Modal dialog

### Component Import Pattern

```typescript
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonButton,
  IonCard
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard]
})
```

## Component Best Practices

### Performance Optimization

1. **OnPush Change Detection**: Use OnPush strategy for better performance
2. **Lazy Loading**: Implement lazy loading for pages
3. **Memory Management**: Properly unsubscribe from observables
4. **Virtual Scrolling**: Use for large lists

### Code Quality

1. **TypeScript Strict Mode**: Enable strict typing
2. **Interface Definition**: Define interfaces for data structures
3. **Error Handling**: Implement proper error handling
4. **Testing**: Write unit tests for components

### Accessibility

1. **ARIA Labels**: Add appropriate ARIA labels
2. **Keyboard Navigation**: Ensure keyboard accessibility
3. **Screen Reader**: Support screen reader compatibility
4. **Color Contrast**: Maintain proper color contrast

## Testing Components

### Unit Testing Template

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleComponent } from './example.component';

describe('ExampleComponent', () => {
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExampleComponent]
    });
    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

## Styling Guidelines

### SCSS Structure

```scss
// Component-specific styles
:host {
  display: block;
}

.component-container {
  padding: 16px;
  
  .title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 8px;
  }
  
  .content {
    line-height: 1.5;
  }
}

// Responsive design
@media (max-width: 768px) {
  .component-container {
    padding: 8px;
  }
}
```

### Ionic CSS Variables

```scss
// Custom CSS variables
:host {
  --background: #ffffff;
  --text-color: #333333;
  --primary-color: #3880ff;
}

// Using Ionic variables
ion-button {
  --color: var(--primary-color);
  --background: transparent;
}
```

## Future Component Development

### Planned Components

1. **Authentication Components**
   - Login form
   - Registration form
   - Password reset

2. **Navigation Components**
   - Side menu
   - Tab navigation
   - Breadcrumbs

3. **Data Display Components**
   - Data tables
   - Charts and graphs
   - Progress indicators

4. **Form Components**
   - Form builders
   - Validation components
   - File upload

### Component Library

Consider implementing a component library structure:

```
src/app/components/
├── common/          # Common UI components
├── forms/           # Form-related components
├── navigation/      # Navigation components
├── data-display/    # Data display components
└── feedback/        # User feedback components
```

## Migration Notes

### Angular 20 Features

- Standalone components architecture
- Improved type safety
- Enhanced performance optimizations
- Better tree-shaking support

### Ionic 8 Features

- Updated component designs
- Enhanced accessibility
- Better performance
- Improved developer experience