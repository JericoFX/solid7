---
layout: default
title: Live Demo - Solid 7.CSS
description: Interactive demonstration of Solid 7.CSS components with Windows 7 styling
---

# Live Demo

See how Solid 7.CSS components look with authentic Windows 7 styling.

## Basic Components

<div class="component-grid">
  <div class="component-demo">
    <h4>Buttons</h4>
    <button>Default Button</button>
    <button disabled>Disabled Button</button>
    <button class="default">Default Style</button>
  </div>

  <div class="component-demo">
    <h4>Text Inputs</h4>
    <input type="text" placeholder="Enter text here">
    <input type="text" value="Disabled input" disabled>
  </div>

  <div class="component-demo">
    <h4>Checkboxes & Radio</h4>
    <div>
      <input type="checkbox" id="check1" checked>
      <label for="check1">Option 1</label>
    </div>
    <div>
      <input type="checkbox" id="check2">
      <label for="check2">Option 2</label>
    </div>
    <div>
      <input type="radio" name="radio1" id="radio1" checked>
      <label for="radio1">Choice A</label>
    </div>
    <div>
      <input type="radio" name="radio1" id="radio2">
      <label for="radio1">Choice B</label>
    </div>
  </div>

  <div class="component-demo">
    <h4>Select Dropdown</h4>
    <select>
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </select>
  </div>
</div>

## Window Components

<div class="preview-area">
  <div class="window" role="window">
    <div class="title-bar">
      <div class="title-bar-text">Sample Window</div>
      <div class="title-bar-controls">
        <button aria-label="Minimize"></button>
        <button aria-label="Maximize"></button>
        <button aria-label="Close"></button>
      </div>
    </div>
    <div class="window-body">
      <p>This is a Windows 7 style window with title bar and controls.</p>
      <div style="display: flex; gap: 8px; margin-top: 10px;">
        <button>OK</button>
        <button>Cancel</button>
      </div>
    </div>
  </div>
</div>

## Dialog Box

<div class="preview-area">
  <div class="window" role="window">
    <div class="title-bar">
      <div class="title-bar-text">Confirm Action</div>
      <div class="title-bar-controls">
        <button aria-label="Close"></button>
      </div>
    </div>
    <div class="window-body">
      <div style="display: flex; align-items: center; gap: 15px;">
        <div style="font-size: 32px;">⚠️</div>
        <div>
          <p>Are you sure you want to delete this file?</p>
          <p style="font-size: 11px; color: #666;">This action cannot be undone.</p>
        </div>
      </div>
      <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 15px;">
        <button>Yes</button>
        <button class="default">No</button>
      </div>
    </div>
  </div>
</div>

## Navigation Bar

<div class="preview-area">
  <div class="window" role="window">
    <div class="title-bar">
      <div class="title-bar-text">Application Window</div>
      <div class="title-bar-controls">
        <button aria-label="Minimize"></button>
        <button aria-label="Maximize"></button>
        <button aria-label="Close"></button>
      </div>
    </div>
    <div class="window-body" style="padding: 0;">
      <menu role="menubar">
        <li role="menuitem" tabindex="0">
          <a href="#file" role="button" aria-haspopup="true">File</a>
          <ul role="menu">
            <li role="menuitem"><a href="#">New</a></li>
            <li role="menuitem"><a href="#">Open...</a></li>
            <li role="menuitem"><a href="#">Save</a></li>
            <hr />
            <li role="menuitem"><a href="#">Exit</a></li>
          </ul>
        </li>
        <li role="menuitem" tabindex="0">
          <a href="#edit" role="button" aria-haspopup="true">Edit</a>
          <ul role="menu">
            <li role="menuitem"><a href="#">Undo</a></li>
            <li role="menuitem"><a href="#">Redo</a></li>
            <hr />
            <li role="menuitem"><a href="#">Cut</a></li>
            <li role="menuitem"><a href="#">Copy</a></li>
            <li role="menuitem"><a href="#">Paste</a></li>
          </ul>
        </li>
        <li role="menuitem" tabindex="0">
          <a href="#help" role="button" aria-haspopup="true">Help</a>
          <ul role="menu">
            <li role="menuitem"><a href="#">About</a></li>
          </ul>
        </li>
      </menu>
      <div style="padding: 20px;">
        <p>Content area with navigation menu above.</p>
      </div>
    </div>
  </div>
</div>

## Progress Bar

<div class="preview-area">
  <div class="component-demo">
    <h4>Progress Indicators</h4>
    <div style="margin: 10px 0;">
      <label>Download Progress:</label>
      <div class="progress-bar">
        <div class="progress" style="width: 65%;"></div>
      </div>
    </div>
    <div style="margin: 10px 0;">
      <label>Installation:</label>
      <div class="progress-bar">
        <div class="progress" style="width: 30%;"></div>
      </div>
    </div>
  </div>
</div>

## Status Bar

<div class="preview-area">
  <div class="window" role="window">
    <div class="title-bar">
      <div class="title-bar-text">Text Editor</div>
      <div class="title-bar-controls">
        <button aria-label="Minimize"></button>
        <button aria-label="Maximize"></button>
        <button aria-label="Close"></button>
      </div>
    </div>
    <div class="window-body" style="padding: 0; height: 200px; display: flex; flex-direction: column;">
      <div style="flex: 1; padding: 10px; background: white;">
        <textarea style="width: 100%; height: 100%; border: none; resize: none; font-family: monospace;">Sample text content...</textarea>
      </div>
      <div class="status-bar">
        <div class="status-bar-field">Ready</div>
        <div class="status-bar-field">Line 1, Col 15</div>
        <div class="status-bar-field">100%</div>
      </div>
    </div>
  </div>
</div>

## Form Elements

<div class="preview-area">
  <div class="window" role="window">
    <div class="title-bar">
      <div class="title-bar-text">User Settings</div>
      <div class="title-bar-controls">
        <button aria-label="Close"></button>
      </div>
    </div>
    <div class="window-body">
      <fieldset>
        <legend>Personal Information</legend>
        <div class="field-row">
          <label for="name">Name:</label>
          <input type="text" id="name" placeholder="Enter your name">
        </div>
        <div class="field-row">
          <label for="email">Email:</label>
          <input type="email" id="email" placeholder="user@example.com">
        </div>
      </fieldset>
      
      <fieldset>
        <legend>Preferences</legend>
        <div class="field-row">
          <input type="checkbox" id="notifications">
          <label for="notifications">Enable notifications</label>
        </div>
        <div class="field-row">
          <input type="checkbox" id="autostart">
          <label for="autostart">Start with Windows</label>
        </div>
        <div class="field-row">
          <label for="theme">Theme:</label>
          <select id="theme">
            <option>Windows Classic</option>
            <option selected>Windows Aero</option>
            <option>High Contrast</option>
          </select>
        </div>
      </fieldset>
      
      <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 15px;">
        <button>Cancel</button>
        <button class="default">OK</button>
      </div>
    </div>
  </div>
</div>

## Tab Container

<div class="preview-area">
  <div class="window" role="window">
    <div class="title-bar">
      <div class="title-bar-text">Properties</div>
      <div class="title-bar-controls">
        <button aria-label="Close"></button>
      </div>
    </div>
    <div class="window-body" style="padding: 0;">
      <div class="tab-container">
        <ul class="tabs" role="tablist">
          <li class="tab" role="tab" aria-selected="true">General</li>
          <li class="tab" role="tab">Security</li>
          <li class="tab" role="tab">Advanced</li>
        </ul>
        <div class="tab-content" role="tabpanel" style="padding: 15px;">
          <h3 style="margin-top: 0;">General Settings</h3>
          <p>Configure basic application settings here.</p>
          <div class="field-row">
            <input type="checkbox" id="general1" checked>
            <label for="general1">Enable feature A</label>
          </div>
          <div class="field-row">
            <input type="checkbox" id="general2">
            <label for="general2">Enable feature B</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

---

## Integration with SolidJS

These visual examples show how your Solid 7.CSS components will look when properly styled. The components maintain authentic Windows 7 appearance while providing modern SolidJS functionality.

### Quick Start

```bash
npm install solid-7css
```

```tsx
import { Window, Button, Checkbox } from 'solid-7css';

function App() {
  return (
    <Window title="My App" active>
      <div style="padding: 20px;">
        <h2>Welcome to Windows 7 UI</h2>
        <Button onClick={() => alert('Clicked!')}>
          Click Me
        </Button>
        <Checkbox label="Enable notifications" />
      </div>
    </Window>
  );
}
```

View the [Components page]({{ '/COMPONENTS' | relative_url }}) for detailed API documentation and the [Examples page]({{ '/EXAMPLES' | relative_url }}) for complete code samples.