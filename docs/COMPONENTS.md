# Component Documentation

## Table of Contents

- [Layout Components](#layout-components)
  - [Window](#window)
  - [StatusBar](#statusbar)
  - [NavBar](#navbar)
  - [Tabs](#tabs)
- [Form Components](#form-components)
  - [Button](#button)
  - [Checkbox](#checkbox)
  - [Radio](#radio)
  - [Select](#select)
  - [TextBox](#textbox)
  - [TextArea](#textarea)
  - [SearchBox](#searchbox)
  - [Slider](#slider)
- [Display Components](#display-components)
  - [ProgressBar](#progressbar)
  - [ListView](#listview)
  - [TreeView](#treeview)
  - [Menu](#menu)
  - [Balloon](#balloon)
- [Dialog Components](#dialog-components)
  - [Dialog](#dialog)
  - [DialogBox](#dialogbox)
  - [Modal](#modal)
- [Application Components](#application-components)
  - [Notepad](#notepad)

---

## Layout Components

### Window

Main application window with title bar, controls, and content area.

#### Props

```tsx
interface WindowProps {
  title: string;
  width?: string;
  height?: string;
  active?: boolean;
  glass?: boolean;
  hasSpace?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  children?: JSX.Element;
  class?: string;
}
```

#### Examples

```tsx
// Basic window
<Window title="My Application">
  <p>Window content goes here</p>
</Window>

// Active window with glass effect
<Window title="Settings" active glass width="600px">
  <div>Settings form</div>
</Window>

// Window with event handlers
<Window 
  title="Text Editor"
  onClose={() => console.log('Closing')}
  onMinimize={() => console.log('Minimizing')}
  onMaximize={() => console.log('Maximizing')}
>
  <textarea placeholder="Start typing..."></textarea>
</Window>
```

---

### StatusBar

Bottom status bar displaying multiple informational fields.

#### Props

```tsx
interface StatusBarField {
  id: string;
  content: string | JSX.Element;
  width?: string;
}

interface StatusBarProps {
  fields: StatusBarField[];
  class?: string;
}
```

#### Examples

```tsx
// Simple status bar
<StatusBar fields={[
  { id: 'status', content: 'Ready' },
  { id: 'items', content: '5 items selected' },
  { id: 'zoom', content: '100%' }
]} />

// Status bar with custom widths
<StatusBar fields={[
  { id: 'main', content: 'Document saved', width: '60%' },
  { id: 'line', content: 'Line 42', width: '20%' },
  { id: 'col', content: 'Col 15', width: '20%' }
]} />
```

---

### NavBar

Menu bar with dropdown navigation and nested submenus.

#### Props

```tsx
interface NavBarItem {
  id: string;
  label: string;
  disabled?: boolean;
  divider?: boolean;
  children?: NavBarItem[];
  onClick?: () => void;
}

interface NavBarProps {
  items: NavBarItem[];
  class?: string;
}
```

#### Examples

```tsx
// File menu with nested submenus
<NavBar items={[
  {
    id: 'file',
    label: 'File',
    children: [
      { id: 'new', label: 'New', onClick: () => createNew() },
      { id: 'open', label: 'Open...', onClick: () => openFile() },
      {
        id: 'recent',
        label: 'Recent Files',
        children: [
          { id: 'recent1', label: 'Document1.txt', onClick: () => openRecent('doc1') },
          { id: 'recent2', label: 'Project.html', onClick: () => openRecent('project') }
        ]
      },
      { id: 'sep1', label: '', divider: true },
      { id: 'exit', label: 'Exit', onClick: () => exit() }
    ]
  },
  {
    id: 'edit',
    label: 'Edit',
    children: [
      { id: 'undo', label: 'Undo', onClick: () => undo() },
      { id: 'redo', label: 'Redo', disabled: true },
      { id: 'sep1', label: '', divider: true },
      { id: 'cut', label: 'Cut', onClick: () => cut() }
    ]
  }
]} />
```

---

### Tabs

Tabbed interface for organizing content into multiple panels.

#### Props

```tsx
interface Tab {
  id: string;
  label: string;
  content: JSX.Element;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  activeTab?: string;
  justified?: boolean;
  onTabChange?: (tabId: string) => void;
  class?: string;
}
```

#### Examples

```tsx
// Basic tabs
<Tabs tabs={[
  { id: 'general', label: 'General', content: <GeneralSettings /> },
  { id: 'advanced', label: 'Advanced', content: <AdvancedSettings /> },
  { id: 'about', label: 'About', content: <AboutInfo /> }
]} />

// Justified tabs with change handler
<Tabs 
  tabs={tabData}
  justified
  activeTab={activeTab()}
  onTabChange={setActiveTab}
/>
```

---

## Form Components

### Button

Various button styles with different states and variants.

#### Props

```tsx
interface ButtonProps {
  variant?: 'normal' | 'default';
  disabled?: boolean;
  onClick?: () => void;
  children?: JSX.Element | string;
  class?: string;
  [key: string]: any; // HTML button attributes
}
```

#### Examples

```tsx
// Button variants
<Button>Normal Button</Button>
<Button variant="default">Default Button</Button>
<Button disabled>Disabled Button</Button>

// With click handler
<Button onClick={() => alert('Clicked!')}>
  Click Me!
</Button>

// Icon button
<Button aria-label="Search">🔍</Button>
```

---

### Checkbox

Checkbox input with label and state management.

#### Props

```tsx
interface CheckboxProps {
  label: string;
  checked?: boolean;
  disabled?: boolean;
  onInput?: (event: Event & { currentTarget: HTMLInputElement }) => void;
  class?: string;
}
```

#### Examples

```tsx
const [checked, setChecked] = createSignal(false);

<Checkbox 
  label="Accept terms and conditions"
  checked={checked()}
  onInput={(e) => setChecked(e.currentTarget.checked)}
/>

<Checkbox label="Disabled option" disabled />
```

---

### Radio

Radio button for single selection from a group.

#### Props

```tsx
interface RadioProps {
  name: string;
  value: string;
  label: string;
  checked?: boolean;
  disabled?: boolean;
  onInput?: (event: Event & { currentTarget: HTMLInputElement }) => void;
  class?: string;
}
```

#### Examples

```tsx
const [selected, setSelected] = createSignal('option1');

<div>
  <Radio 
    name="options" 
    value="option1" 
    label="Option 1"
    checked={selected() === 'option1'}
    onInput={(e) => setSelected(e.currentTarget.value)}
  />
  <Radio 
    name="options" 
    value="option2" 
    label="Option 2"
    checked={selected() === 'option2'}
    onInput={(e) => setSelected(e.currentTarget.value)}
  />
</div>
```

---

### Select

Dropdown select menu with options.

#### Props

```tsx
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  disabled?: boolean;
  onChange?: (event: Event & { currentTarget: HTMLSelectElement }) => void;
  class?: string;
}
```

#### Examples

```tsx
const [value, setValue] = createSignal('option2');

<Select 
  options={[
    { value: 'option1', label: 'First Option' },
    { value: 'option2', label: 'Second Option' },
    { value: 'option3', label: 'Third Option', disabled: true }
  ]}
  value={value()}
  onChange={(e) => setValue(e.currentTarget.value)}
/>
```

---

### TextBox

Text input with configurable label positioning.

#### Props

```tsx
interface TextBoxProps {
  label?: string;
  labelPosition?: 'top' | 'left';
  type?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onInput?: (event: Event & { currentTarget: HTMLInputElement }) => void;
  class?: string;
}
```

#### Examples

```tsx
const [username, setUsername] = createSignal('');

// Label on top
<TextBox 
  label="Username"
  labelPosition="top"
  value={username()}
  onInput={(e) => setUsername(e.currentTarget.value)}
  placeholder="Enter your username"
/>

// Label on left
<TextBox 
  label="Email:"
  labelPosition="left"
  type="email"
  placeholder="user@example.com"
/>
```

---

### TextArea

Multi-line text input with label.

#### Props

```tsx
interface TextAreaProps {
  label?: string;
  labelPosition?: 'top' | 'left';
  value?: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  onInput?: (event: Event & { currentTarget: HTMLTextAreaElement }) => void;
  class?: string;
}
```

#### Examples

```tsx
const [comment, setComment] = createSignal('');

<TextArea 
  label="Comments:"
  labelPosition="top"
  value={comment()}
  onInput={(e) => setComment(e.currentTarget.value)}
  placeholder="Enter your comments here..."
  rows={4}
/>
```

---

### SearchBox

Search input with Windows 7 styling.

#### Props

```tsx
interface SearchBoxProps {
  placeholder?: string;
  value?: string;
  onInput?: (event: Event & { currentTarget: HTMLInputElement }) => void;
  class?: string;
}
```

#### Examples

```tsx
const [searchTerm, setSearchTerm] = createSignal('');

<SearchBox 
  placeholder="Search files..."
  value={searchTerm()}
  onInput={(e) => setSearchTerm(e.currentTarget.value)}
/>
```

---

### Slider

Range slider with optional box indicator and orientation.

#### Props

```tsx
interface SliderProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  vertical?: boolean;
  hasBoxIndicator?: boolean;
  disabled?: boolean;
  onChange?: (event: Event & { currentTarget: HTMLInputElement }) => void;
  class?: string;
}
```

#### Examples

```tsx
const [volume, setVolume] = createSignal(50);

// Horizontal slider
<Slider 
  value={volume()}
  min={0}
  max={100}
  onChange={(e) => setVolume(parseInt(e.currentTarget.value))}
/>

// Vertical slider with box indicator
<Slider 
  vertical
  hasBoxIndicator
  value={75}
  min={0}
  max={100}
/>
```

---

## Display Components

### ProgressBar

Progress indicator with various states and animations.

#### Props

```tsx
interface ProgressBarProps {
  value?: number;
  max?: number;
  animate?: boolean;
  error?: boolean;
  paused?: boolean;
  marquee?: boolean;
  class?: string;
}
```

#### Examples

```tsx
// Basic progress bar
<ProgressBar value={75} />

// Animated progress
<ProgressBar value={50} animate />

// Error state
<ProgressBar value={30} error />

// Indeterminate (marquee)
<ProgressBar marquee />
```

---

### ListView

Sortable data table with selection and event handling.

#### Props

```tsx
interface ListViewColumn {
  key: string;
  title: string;
  width?: string;
  sortable?: boolean;
  sorted?: 'asc' | 'desc';
}

interface ListViewItem {
  id: string;
  selected?: boolean;
  disabled?: boolean;
  [key: string]: any;
}

interface ListViewProps {
  columns: ListViewColumn[];
  items: ListViewItem[];
  hasShadow?: boolean;
  onSelectionChange?: (itemId: string) => void;
  onClick?: (item: ListViewItem) => void;
  onDoubleClick?: (item: ListViewItem) => void;
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  class?: string;
}
```

#### Examples

```tsx
const [selectedItem, setSelectedItem] = createSignal('');
const [sortColumn, setSortColumn] = createSignal('');
const [sortDirection, setSortDirection] = createSignal<'asc' | 'desc'>('asc');

<ListView 
  columns={[
    { key: 'name', title: 'Name', sortable: true, 
      sorted: sortColumn() === 'name' ? sortDirection() : undefined },
    { key: 'type', title: 'Type', sortable: true },
    { key: 'size', title: 'Size', width: '100px' }
  ]}
  items={[
    { id: '1', name: 'Documents', type: 'Folder', size: '12 items' },
    { id: '2', name: 'readme.txt', type: 'Text Document', size: '2 KB' }
  ]}
  hasShadow
  onSelectionChange={setSelectedItem}
  onSort={(column, direction) => {
    setSortColumn(column);
    setSortDirection(direction);
  }}
/>
```

---

### TreeView

Hierarchical tree structure with expandable nodes.

#### Props

```tsx
interface TreeNode {
  id: string;
  label: string;
  icon?: string;
  expanded?: boolean;
  children?: TreeNode[];
}

interface TreeViewProps {
  nodes: TreeNode[];
  onNodeSelect?: (nodeId: string) => void;
  onNodeToggle?: (nodeId: string, expanded: boolean) => void;
  class?: string;
}
```

#### Examples

```tsx
<TreeView 
  nodes={[
    {
      id: 'root',
      label: 'My Computer',
      icon: '💻',
      children: [
        {
          id: 'c-drive',
          label: 'Local Disk (C:)',
          icon: '💾',
          children: [
            { id: 'windows', label: 'Windows', icon: '📁' },
            { id: 'users', label: 'Users', icon: '👥' }
          ]
        }
      ]
    }
  ]}
  onNodeSelect={(id) => console.log('Selected:', id)}
  onNodeToggle={(id, expanded) => console.log('Toggled:', id, expanded)}
/>
```

---

### Menu

Context menu or dropdown menu with items and dividers.

#### Props

```tsx
interface MenuItem {
  id: string;
  label: string;
  disabled?: boolean;
  divider?: boolean;
  onClick?: () => void;
}

interface MenuProps {
  items: MenuItem[];
  class?: string;
}
```

#### Examples

```tsx
<Menu items={[
  { id: 'new', label: 'New File', onClick: () => createFile() },
  { id: 'open', label: 'Open...', onClick: () => openFile() },
  { id: 'sep1', label: '', divider: true },
  { id: 'copy', label: 'Copy', onClick: () => copy() },
  { id: 'paste', label: 'Paste', disabled: true },
  { id: 'sep2', label: '', divider: true },
  { id: 'properties', label: 'Properties', onClick: () => showProperties() }
]} />
```

---

### Balloon

Tooltip or balloon notification with positioning.

#### Props

```tsx
interface BalloonProps {
  content: string | JSX.Element;
  position?: 'top' | 'bottom' | 'left' | 'right';
  isVisible?: boolean;
  class?: string;
}
```

#### Examples

```tsx
const [showTooltip, setShowTooltip] = createSignal(false);

<div style="position: relative;">
  <Button 
    onMouseEnter={() => setShowTooltip(true)}
    onMouseLeave={() => setShowTooltip(false)}
  >
    Hover me
  </Button>
  <Balloon 
    content="This is a helpful tooltip!"
    position="top"
    isVisible={showTooltip()}
  />
</div>
```

---

## Dialog Components

### Dialog

Simple modal dialog with customizable content.

#### Props

```tsx
interface DialogProps {
  title: string;
  isOpen: boolean;
  width?: string;
  height?: string;
  onClose: () => void;
  children?: JSX.Element;
  class?: string;
}
```

#### Examples

```tsx
const [showDialog, setShowDialog] = createSignal(false);

<Dialog 
  title="Settings"
  isOpen={showDialog()}
  onClose={() => setShowDialog(false)}
  width="400px"
>
  <div>
    <p>Dialog content goes here</p>
    <Button onClick={() => setShowDialog(false)}>Close</Button>
  </div>
</Dialog>
```

---

### DialogBox

Rich dialog with icons, message, and multiple buttons.

#### Props

```tsx
interface DialogButton {
  id: string;
  label: string;
  variant?: 'normal' | 'default';
  onClick: () => void;
}

interface DialogBoxProps {
  title: string;
  message: string | JSX.Element;
  icon?: 'info' | 'warning' | 'error' | 'question';
  isOpen: boolean;
  buttons: DialogButton[];
  onClose: () => void;
  class?: string;
}
```

#### Examples

```tsx
const [showConfirm, setShowConfirm] = createSignal(false);

<DialogBox 
  title="Confirm Delete"
  message="Are you sure you want to delete this file? This action cannot be undone."
  icon="warning"
  isOpen={showConfirm()}
  onClose={() => setShowConfirm(false)}
  buttons={[
    { 
      id: 'yes', 
      label: 'Yes', 
      variant: 'default',
      onClick: () => {
        deleteFile();
        setShowConfirm(false);
      }
    },
    { 
      id: 'no', 
      label: 'No', 
      onClick: () => setShowConfirm(false)
    }
  ]}
/>
```

---

### Modal

Modal overlay with custom content and backdrop.

#### Props

```tsx
interface ModalProps {
  title: string;
  isOpen: boolean;
  width?: string;
  height?: string;
  onClose: () => void;
  children?: JSX.Element;
  class?: string;
}
```

#### Examples

```tsx
const [showModal, setShowModal] = createSignal(false);

<Modal 
  title="Image Viewer"
  isOpen={showModal()}
  onClose={() => setShowModal(false)}
  width="600px"
  height="400px"
>
  <div>
    <img src="image.jpg" alt="Preview" style="max-width: 100%;" />
    <div style="margin-top: 16px; text-align: right;">
      <Button variant="default" onClick={() => setShowModal(false)}>
        Close
      </Button>
    </div>
  </div>
</Modal>
```

---

## Application Components

### Notepad

A fully functional Windows 7-style Notepad text editor with menus, status bar, and comprehensive text editing features.

#### Props

```tsx
interface NotepadProps {
  width?: string;
  height?: string;
  title?: string;
  content?: string;
  onContentChange?: (content: string) => void;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  fileName?: string;
  wordWrap?: boolean;
  showStatusBar?: boolean;
  class?: string;
}
```

#### Features

- **Complete Menu System**: File, Edit, Format, View, and Help menus with keyboard shortcuts
- **Real-time Text Editing**: Full textarea with undo tracking and clipboard operations
- **Status Bar**: Shows cursor position, zoom level, encoding, line count, and character count
- **Word Wrap Toggle**: Switch between wrapped and unwrapped text display
- **File Operations**: New, Open, Save, Save As with modified state tracking
- **Edit Operations**: Cut, Copy, Paste, Find, Replace, Select All with proper state management
- **Authentic Styling**: Uses Consolas/Courier New monospace font with Windows 7 styling
- **Window Integration**: Full window controls with minimize, maximize, and close functionality

#### Menu Structure

**File Menu**:
- New (Ctrl+N)
- Open... (Ctrl+O)
- Save (Ctrl+S)
- Save As... (Ctrl+Shift+S)
- Exit

**Edit Menu**:
- Undo (Ctrl+Z) - disabled when no undo available
- Cut (Ctrl+X) - disabled when no text selected
- Copy (Ctrl+C) - disabled when no text selected
- Paste (Ctrl+V) - disabled when clipboard empty
- Find... (Ctrl+F)
- Find Next (F3)
- Replace... (Ctrl+H)
- Go To... (Ctrl+G)
- Select All (Ctrl+A)
- Time/Date (F5)

**Format Menu**:
- Word Wrap - toggles text wrapping
- Font... - font selection dialog

**View Menu**:
- Status Bar - toggles status bar visibility

**Help Menu**:
- Help Topics
- About Notepad

#### Status Bar Information

- **Cursor Position**: Current line and column number
- **Zoom Level**: Display zoom percentage (100%)
- **Encoding**: Text encoding (UTF-8)
- **Line Count**: Total number of lines
- **Character Count**: Total number of characters

#### Basic Usage

```tsx
import { Notepad } from './components';

// Basic text editor
<Notepad />

// Text editor with initial content
<Notepad 
  content="Hello World!"
  fileName="welcome.txt"
/>

// Customized text editor
<Notepad
  width="800px"
  height="600px"
  content="Initial content here..."
  fileName="document.txt"
  wordWrap={true}
  showStatusBar={true}
  onContentChange={(content) => console.log('Content:', content)}
  onClose={() => handleClose()}
  onMinimize={() => handleMinimize()}
  onMaximize={() => handleMaximize()}
/>
```

#### Advanced Features

```tsx
// Handle content changes
const [notepadContent, setNotepadContent] = createSignal('');

<Notepad
  content={notepadContent()}
  onContentChange={setNotepadContent}
  fileName="auto-save.txt"
/>

// Custom window controls
<Notepad
  onClose={() => {
    if (confirm('Save changes?')) {
      saveFile();
    }
    closeWindow();
  }}
  onMinimize={() => minimizeToTray()}
  onMaximize={() => toggleFullscreen()}
/>

// Without status bar or word wrap
<Notepad
  showStatusBar={false}
  wordWrap={false}
  width="600px"
  height="400px"
/>
```

#### Event Handlers

```tsx
// Menu event handlers are handled internally, but you can customize:
<Notepad
  onContentChange={(content) => {
    // Auto-save functionality
    if (content.length > 0) {
      autoSave(content);
    }
  }}
  onClose={() => {
    // Confirm unsaved changes
    if (hasUnsavedChanges()) {
      const result = confirm('Save changes before closing?');
      if (result) {
        saveFile();
      }
    }
    closeApplication();
  }}
/>
```

#### Styling

The Notepad component includes built-in CSS for authentic Windows 7 styling:

- Consolas/Courier New monospace font
- Proper scrollbar styling
- Menu bar with Windows 7 gradient
- Status bar with inset border
- Textarea with proper focus handling

```tsx
// Custom styling
<Notepad 
  class="custom-notepad"
  width="100vw"
  height="100vh"
/>
```

#### Technical Notes

- **Modified State**: Automatically tracks when content differs from initial content
- **Clipboard Integration**: Uses modern Clipboard API with fallback support
- **Cursor Tracking**: Real-time line and column position updates
- **Menu State**: Dynamic enable/disable of menu items based on selection and undo state
- **File Name Display**: Shows in window title with modified indicator (*)
- **Keyboard Navigation**: Supports standard text editing keyboard shortcuts

---

## Styling and Customization

### CSS Classes

All components accept a `class` prop for custom styling:

```tsx
<Button class="my-custom-button">Styled Button</Button>
```

### Utility Function

Use the included `cn` utility for conditional classes:

```tsx
import { cn } from './utils/cn';

<Button class={cn('base-class', { 'active': isActive(), 'disabled': isDisabled() })}>
  Conditional Button
</Button>
```

### 7.css Integration

Components are built to work seamlessly with 7.css. Make sure to import the stylesheet:

```tsx
import '7.css';
```

All components follow 7.css conventions and will inherit the Windows 7 styling automatically.