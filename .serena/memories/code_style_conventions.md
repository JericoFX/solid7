# Code Style and Conventions

## File Organization
- **Components**: Each component in separate .tsx file in `src/components/`
- **Styles**: Component-specific CSS files alongside .tsx files when needed
- **Types**: Centralized in `src/types/index.ts`
- **Utils**: Helper functions in `src/utils/`
- **Exports**: Main exports through `src/index.ts` and `src/components/index.ts`

## Naming Conventions
- **Files**: PascalCase for components (e.g., `Button.tsx`, `WindowHeader.tsx`)
- **Components**: PascalCase (e.g., `Button`, `ProgressBar`)
- **Props**: camelCase interfaces with Props suffix (e.g., `ButtonProps`)
- **CSS files**: kebab-case or match component name

## TypeScript Patterns
- Full TypeScript with strict settings
- Interface definitions for all component props
- Proper JSX.Element return types
- Use of SolidJS reactive primitives (createSignal, createEffect)

## Component Architecture
- **Modular Design**: Components should be composable and reusable
- **Props Pattern**: Use destructured props with default values
- **Class Management**: Use `cn` utility (from utils/cn.ts) to join classes
- **Reactive Props**: Leverage SolidJS signals and reactive patterns

## CSS Integration
- Automatic 7.css import through library usage
- Component-specific CSS files when needed
- Use clsx/cn for conditional class management
- Follow 7.css class naming conventions

## Import/Export Patterns
```typescript
// Component imports
import { Component, JSX } from 'solid-js';
import { cn } from '../utils/cn';

// Prop interfaces
interface ComponentProps {
  // props definition
}

// Component export
export const ComponentName: Component<ComponentProps> = (props) => {
  // implementation
};
```

## Code Quality Standards
- ESLint configuration enforced
- TypeScript strict mode enabled
- Proper error handling and validation
- Accessibility considerations (ARIA attributes)
- Tree-shaking friendly exports