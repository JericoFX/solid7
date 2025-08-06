# 🪟 Solid 7.CSS

A comprehensive SolidJS wrapper library for the [7.css](https://github.com/khang-nd/7.css) Windows 7 UI framework. Built with full TypeScript support and reactive SolidJS patterns.

🚀 **[Live Demo & Documentation](https://JericoFX.github.io/solid7/)**

## Features

- ✅ **Zero Configuration** - Automatic CSS import, just install and use
- ✅ **Complete 7.css Coverage** - All components wrapped with SolidJS
- ✅ **TypeScript Support** - Full type definitions included
- ✅ **Reactive Props** - Seamless SolidJS integration
- ✅ **Accessibility** - ARIA attributes and semantic HTML
- ✅ **Tree Shaking** - Import only what you need
- ✅ **Interactive Playground** - Test components locally

## Installation

```bash
npm install solid-7css
# or
yarn add solid-7css
# or
pnpm add solid-7css
```

## Quick Start

```tsx
import { Window, Button, ProgressBar } from 'solid-7css';
// ✨ 7.css is automatically imported! Zero configuration needed

function App() {
  return (
    <Window title='My App' width='400px' active>
      <Button variant='default'>Click me!</Button>
      <ProgressBar value={75} />
    </Window>
  );
}
```

> **✨ Zero Configuration**: The 7.css styles are automatically imported when you import any component from `solid-7css`. No manual CSS imports or configuration required!

## Components

### Window

```tsx
<Window
  title='Window Title'
  width='500px'
  active
  glass
  onClose={() => console.log('Closed!')}
>
  Content goes here
</Window>
```

### Buttons

```tsx
<Button>Normal Button</Button>
<Button variant="default">Default Button</Button>
<Button disabled>Disabled</Button>
```

### Form Controls

```tsx
<Checkbox label="Check me" checked={checked()} onChange={setChecked} />
<Radio name="group" value="1" label="Option 1" />
<Select options={[
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' }
]} />
<SearchBox placeholder="Search..." />
<Slider value={50} hasBoxIndicator />
```

### Progress & Status

```tsx
<ProgressBar value={progress()} animate />
<StatusBar fields={[
  { id: 'status', content: 'Ready' },
  { id: 'count', content: '5 items' }
]} />
```

### Navigation

```tsx
<Tabs tabs={[
  { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
  { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> }
]} />

<Menu items={[
  { id: 'file', label: 'File', onClick: () => {} },
  { id: 'edit', label: 'Edit', divider: true }
]} />
```

## Development

```bash
# Install dependencies
npm install

# Start playground
npm run dev

# Build library
npm run build:lib

# Type check
npm run typecheck

# Lint
npm run lint
```

## Playground

Run the interactive playground to test all components:

```bash
npm run dev
```

The playground showcases every component with interactive examples and demonstrates proper usage patterns.

## Built With

- [SolidJS](https://solidjs.com) - Reactive UI library
- [7.css](https://github.com/khang-nd/7.css) - Windows 7 CSS framework
- [TypeScript](https://typescriptlang.org) - Type safety
- [Vite](https://vitejs.dev) - Build tool

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

Contributions welcome! Please read our contributing guidelines and submit pull requests to our repository.

---
