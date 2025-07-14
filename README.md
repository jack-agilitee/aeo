# AEO - Ionic Angular Application

An Ionic application built with Angular and Capacitor for cross-platform mobile development.

## Technology Stack

- **Frontend Framework**: Angular v20
- **Mobile Framework**: Ionic v8
- **Cross-Platform**: Capacitor v7
- **Language**: TypeScript
- **Styling**: Ionic CSS Components + Custom SCSS
- **Testing**: Jasmine + Karma

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Ionic CLI
- Angular CLI

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd aeo

# Install dependencies
npm install

# Install Ionic CLI globally (if not already installed)
npm install -g @ionic/cli

# Start development server
ionic serve
```

### Development Commands

```bash
# Start development server
ionic serve

# Build for production
ionic build

# Run tests
npm test

# Run linting
npm run lint

# Add mobile platforms
ionic capacitor add android
ionic capacitor add ios

# Sync with native projects
ionic capacitor sync

# Run on device/emulator
ionic capacitor run android
ionic capacitor run ios
```

## Project Structure

```
src/
├── app/
│   ├── home/            # Home page component
│   ├── app.component.*  # Root component
│   └── app.routes.ts    # Application routing
├── assets/              # Static assets
├── environments/        # Environment configurations
├── theme/               # SCSS theme files
└── global.scss          # Global styles
```

## Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run lint` - Run ESLint

## Documentation

For detailed documentation, see the [docs](./docs) folder:

- [Architecture](./docs/architecture.md)
- [Components](./docs/components.md)
- [API Integration](./docs/api-integration.md)

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

This project is licensed under the MIT License.