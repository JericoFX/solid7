# Solid7 Project Overview

## Project Purpose
Solid7 is a comprehensive SolidJS wrapper library for the 7.css Windows 7 UI framework. It provides modern React-like components with Windows 7 aesthetics, built with full TypeScript support and reactive SolidJS patterns.

## Tech Stack
- **Frontend Framework**: SolidJS 1.9.7
- **UI Framework**: 7.css 0.21.1 (Windows 7 styled components)
- **Language**: TypeScript 5.9.2
- **Build Tool**: Vite 7.0.6 with Bun runtime
- **Package Manager**: Bun
- **Testing**: Playwright 1.54.2 + SolidJS Testing Library 0.8.10
- **Linting**: ESLint 9.32.0 with TypeScript plugin
- **Utilities**: clsx 2.1.1 for class management

## Project Structure
```
solid7/
├── src/
│   ├── components/     # All SolidJS wrapper components
│   ├── playground/     # Development playground app
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Utility functions (cn.ts for class joining)
├── docs/              # Documentation
├── scripts/           # Build and update scripts
└── test-project/      # Test implementations
```

## Key Features
- Zero configuration CSS import
- Complete 7.css coverage with SolidJS wrappers
- Full TypeScript support
- Reactive props with SolidJS patterns
- Tree shaking support
- Accessibility with ARIA attributes
- Interactive playground for component testing

## Current Status
The project is a library package designed for distribution via npm as "solid-7css".