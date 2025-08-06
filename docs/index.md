---
layout: default
title: Solid 7.CSS - Windows 7 Components for SolidJS
description: A comprehensive SolidJS wrapper library for the 7.css Windows 7 UI framework
---

# 🪟 Solid 7.CSS

A comprehensive SolidJS wrapper library for the [7.css](https://github.com/khang-nd/7.css) Windows 7 UI framework. Built with full TypeScript support and reactive SolidJS patterns.

## ✨ Features

- **Complete 7.css Coverage** - All components wrapped with SolidJS
- **TypeScript Support** - Full type definitions included  
- **Reactive Props** - Seamless SolidJS integration
- **Accessibility** - ARIA attributes and semantic HTML
- **Tree Shaking** - Import only what you need
- **Interactive Playground** - Test components locally

## 🚀 Quick Start

### Installation

```bash
npm install solid-js 7.css
# Clone or download this repository
```

### Basic Usage

```tsx
import { Component } from 'solid-js';
import { Window, Button, NavBar } from './components';
import '7.css';

const App: Component = () => {
  return (
    <Window title="My Application" width="800px">
      <NavBar
        items={[
          {
            id: 'file',
            label: 'File',
            children: [
              { id: 'new', label: 'New', onClick: () => alert('New file') },
              { id: 'open', label: 'Open...', onClick: () => alert('Open file') },
            ],
          },
        ]}
      />
      <div style="padding: 20px;">
        <Button variant="default">Click me!</Button>
      </div>
    </Window>
  );
};
```

## 📚 Available Components

### Layout Components
- **[Window](components#window)** - Main application window with title bar
- **[StatusBar](components#statusbar)** - Bottom status bar with fields
- **[NavBar](components#navbar)** - Menu bar with dropdown navigation
- **[Tabs](components#tabs)** - Tabbed interface

### Form Components
- **[Button](components#button)** - Various button styles
- **[Checkbox](components#checkbox)** - Checkbox inputs with labels
- **[Radio](components#radio)** - Radio button groups
- **[Select](components#select)** - Dropdown select menus
- **[TextBox](components#textbox)** - Text input with label positioning
- **[TextArea](components#textarea)** - Multi-line text input
- **[SearchBox](components#searchbox)** - Search input with styling
- **[Slider](components#slider)** - Range sliders

### Display Components
- **[ProgressBar](components#progressbar)** - Progress indicators
- **[ListView](components#listview)** - Sortable data tables
- **[TreeView](components#treeview)** - Hierarchical tree structure
- **[Menu](components#menu)** - Context menus and dropdowns
- **[Balloon](components#balloon)** - Tooltip notifications

### Dialog Components
- **[Dialog](components#dialog)** - Simple modal dialogs
- **[DialogBox](components#dialogbox)** - Rich dialogs with icons
- **[Modal](components#modal)** - Modal overlays

## 🎨 Examples

### Simple Window

```tsx
<Window title="Calculator" width="300px" active>
  <div style="padding: 16px;">
    <input type="text" value="0" readonly style="width: 100%; margin-bottom: 10px;" />
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px;">
      <Button>7</Button>
      <Button>8</Button>
      <Button>9</Button>
      <Button>/</Button>
      <Button>4</Button>
      <Button>5</Button>
      <Button>6</Button>
      <Button>*</Button>
    </div>
  </div>
</Window>
```

### File Manager Interface

```tsx
<Window title="File Manager" width="800px" height="600px" active>
  <NavBar items={[
    {
      id: 'file',
      label: 'File',
      children: [
        { id: 'new-folder', label: 'New Folder', onClick: () => createFolder() },
        { id: 'sep1', label: '', divider: true },
        { id: 'properties', label: 'Properties', onClick: () => showProps() }
      ]
    },
    {
      id: 'view',
      label: 'View',
      children: [
        { id: 'large-icons', label: 'Large Icons' },
        { id: 'details', label: 'Details' }
      ]
    }
  ]} />
  
  <ListView 
    columns={[
      { key: 'name', title: 'Name', sortable: true },
      { key: 'type', title: 'Type', sortable: true },
      { key: 'size', title: 'Size', width: '100px' },
      { key: 'modified', title: 'Date Modified', sortable: true }
    ]}
    items={fileList()}
    hasShadow
    onDoubleClick={(item) => openFile(item)}
  />
  
  <StatusBar fields={[
    { id: 'status', content: `${fileList().length} items` },
    { id: 'selected', content: selectedCount() > 0 ? `${selectedCount()} selected` : '' }
  ]} />
</Window>
```

### Settings Dialog

```tsx
<Dialog
  title="Settings"
  isOpen={showSettings()}
  onClose={() => setShowSettings(false)}
  width="500px"
>
  <Tabs tabs={[
    {
      id: 'general',
      label: 'General',
      content: (
        <div style="padding: 16px;">
          <Checkbox label="Show hidden files" checked={showHidden()} />
          <Checkbox label="Remember window positions" checked={remember()} />
          
          <div style="margin: 16px 0;">
            <label>Default view:</label>
            <Select options={[
              { value: 'icons', label: 'Icons' },
              { value: 'list', label: 'List' },
              { value: 'details', label: 'Details' }
            ]} />
          </div>
        </div>
      )
    },
    {
      id: 'appearance',
      label: 'Appearance',
      content: (
        <div style="padding: 16px;">
          <div style="margin-bottom: 16px;">
            <label>Theme:</label>
            <Select options={[
              { value: 'classic', label: 'Windows 7 Classic' },
              { value: 'aero', label: 'Windows 7 Aero' }
            ]} />
          </div>
          
          <Slider 
            value={transparency()}
            onChange={(e) => setTransparency(e.target.value)}
          />
          <label>Window transparency: {transparency()}%</label>
        </div>
      )
    }
  ]} />
  
  <div style="padding: 16px; text-align: right; border-top: 1px solid #ccc;">
    <Button onClick={() => setShowSettings(false)}>Cancel</Button>
    <Button variant="default" onClick={() => saveSettings()}>OK</Button>
  </div>
</Dialog>
```

## 🛠 Development

### Local Development

```bash
# Clone the repository
git clone https://github.com/JericoFX/solid7.git
cd solid7

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building

```bash
# Build the project
npm run build

# Type checking
npm run typecheck

# Linting
npm run lint
```

## 📖 Documentation

- **[Component Reference](components)** - Detailed API documentation
- **[Live Demo](demo)** - Interactive component showcase
- **[Examples](examples)** - Code examples and patterns
- **[GitHub Repository](https://github.com/JericoFX/solid7)** - Source code

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable  
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](https://github.com/JericoFX/solid7/blob/main/LICENSE) file for details.

## 🙏 Acknowledgments

- [7.css](https://khang-nd.github.io/7.css) - The amazing Windows 7 CSS framework
- [SolidJS](https://solidjs.com) - The reactive framework
- The Windows 7 design team for the iconic interface

---

<div style="text-align: center; margin-top: 40px; padding: 20px; background: #f0f0f0; border: 1px solid #ccc;">
  <strong>🚀 Ready to build nostalgic interfaces?</strong><br>
  <a href="https://github.com/JericoFX/solid7" style="margin: 0 10px;">Download</a> |
  <a href="demo" style="margin: 0 10px;">Live Demo</a> |
  <a href="components" style="margin: 0 10px;">View Components</a> |
  <a href="examples" style="margin: 0 10px;">See Examples</a>
</div>