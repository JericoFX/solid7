---
layout: default
title: Examples - Solid 7.CSS
description: Code examples and usage patterns for Solid 7.CSS components
---

# Examples

This page contains practical examples showing how to use Solid 7.CSS components to build common interface patterns.

## Table of Contents

- [Calculator App](#calculator-app)
- [Text Editor](#text-editor)
- [File Manager](#file-manager)
- [Settings Dialog](#settings-dialog)
- [Photo Viewer](#photo-viewer)
- [System Tray Application](#system-tray-application)
- [Control Panel](#control-panel)
- [Media Player Interface](#media-player-interface)

---

## Calculator App

A classic Windows calculator with buttons and display.

```tsx
import { Component, createSignal } from 'solid-js';
import { Window, Button } from '../components';

const Calculator: Component = () => {
  const [display, setDisplay] = createSignal('0');
  const [operation, setOperation] = createSignal('');
  const [previousValue, setPreviousValue] = createSignal(0);
  const [waitingForOperand, setWaitingForOperand] = createSignal(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand()) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display() === '0' ? num : display() + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display());

    if (previousValue() === 0) {
      setPreviousValue(inputValue);
    } else if (operation()) {
      const currentValue = previousValue() || 0;
      const result = calculate(currentValue, inputValue, operation());
      
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+': return firstValue + secondValue;
      case '-': return firstValue - secondValue;
      case '*': return firstValue * secondValue;
      case '/': return firstValue / secondValue;
      case '=': return secondValue;
      default: return secondValue;
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(0);
    setOperation('');
    setWaitingForOperand(false);
  };

  return (
    <Window title="Calculator" width="280px" active>
      <div style="padding: 8px;">
        {/* Display */}
        <input 
          type="text" 
          value={display()} 
          readonly 
          style="
            width: 100%; 
            height: 40px; 
            margin-bottom: 8px; 
            text-align: right; 
            font-size: 18px; 
            font-family: 'Courier New', monospace;
            background: white;
            border: 1px inset #ccc;
          " 
        />
        
        {/* Button Grid */}
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px;">
          {/* Row 1 */}
          <Button onClick={clear}>C</Button>
          <Button onClick={() => setDisplay(display().slice(0, -1) || '0')}>⌫</Button>
          <Button onClick={() => inputOperation('/')}>/</Button>
          <Button onClick={() => inputOperation('*')}>*</Button>
          
          {/* Row 2 */}
          <Button onClick={() => inputNumber('7')}>7</Button>
          <Button onClick={() => inputNumber('8')}>8</Button>
          <Button onClick={() => inputNumber('9')}>9</Button>
          <Button onClick={() => inputOperation('-')}>-</Button>
          
          {/* Row 3 */}
          <Button onClick={() => inputNumber('4')}>4</Button>
          <Button onClick={() => inputNumber('5')}>5</Button>
          <Button onClick={() => inputNumber('6')}>6</Button>
          <Button onClick={() => inputOperation('+')}>+</Button>
          
          {/* Row 4 */}
          <Button onClick={() => inputNumber('1')}>1</Button>
          <Button onClick={() => inputNumber('2')}>2</Button>
          <Button onClick={() => inputNumber('3')}>3</Button>
          <Button 
            onClick={() => inputOperation('=')} 
            style="grid-row: span 2;"
            variant="default"
          >=</Button>
          
          {/* Row 5 */}
          <Button 
            onClick={() => inputNumber('0')} 
            style="grid-column: span 2;"
          >0</Button>
          <Button onClick={() => inputNumber('.')}>.</Button>
        </div>
      </div>
    </Window>
  );
};

export default Calculator;
```

---

## Text Editor

A simple text editor with menu bar and status bar.

```tsx
import { Component, createSignal } from 'solid-js';
import { Window, NavBar, StatusBar, TextArea, DialogBox } from '../components';

const TextEditor: Component = () => {
  const [content, setContent] = createSignal('');
  const [filename, setFilename] = createSignal('Untitled');
  const [modified, setModified] = createSignal(false);
  const [showSaveDialog, setShowSaveDialog] = createSignal(false);

  const newFile = () => {
    if (modified()) {
      setShowSaveDialog(true);
    } else {
      setContent('');
      setFilename('Untitled');
      setModified(false);
    }
  };

  const saveFile = () => {
    // Simulate save
    console.log('Saving file:', filename(), content());
    setModified(false);
  };

  const handleTextChange = (e: Event) => {
    const target = e.currentTarget as HTMLTextAreaElement;
    setContent(target.value);
    setModified(true);
  };

  const getWordCount = () => {
    return content().trim().split(/\s+/).length;
  };

  const getLineCount = () => {
    return content().split('\n').length;
  };

  return (
    <>
      <Window 
        title={`${filename()}${modified() ? '*' : ''} - Notepad`} 
        width="800px" 
        height="600px"
        active
      >
        <NavBar items={[
          {
            id: 'file',
            label: 'File',
            children: [
              { id: 'new', label: 'New\tCtrl+N', onClick: newFile },
              { id: 'open', label: 'Open...\tCtrl+O', onClick: () => console.log('Open') },
              { id: 'save', label: 'Save\tCtrl+S', onClick: saveFile },
              { id: 'save-as', label: 'Save As...', onClick: () => console.log('Save As') },
              { id: 'sep1', label: '', divider: true },
              { id: 'exit', label: 'Exit', onClick: () => console.log('Exit') }
            ]
          },
          {
            id: 'edit',
            label: 'Edit',
            children: [
              { id: 'undo', label: 'Undo\tCtrl+Z', disabled: true },
              { id: 'redo', label: 'Redo\tCtrl+Y', disabled: true },
              { id: 'sep1', label: '', divider: true },
              { id: 'cut', label: 'Cut\tCtrl+X', onClick: () => console.log('Cut') },
              { id: 'copy', label: 'Copy\tCtrl+C', onClick: () => console.log('Copy') },
              { id: 'paste', label: 'Paste\tCtrl+V', onClick: () => console.log('Paste') },
              { id: 'sep2', label: '', divider: true },
              { id: 'select-all', label: 'Select All\tCtrl+A', onClick: () => console.log('Select All') }
            ]
          },
          {
            id: 'view',
            label: 'View',
            children: [
              { id: 'word-wrap', label: 'Word Wrap', onClick: () => console.log('Toggle word wrap') },
              { id: 'status-bar', label: 'Status Bar', onClick: () => console.log('Toggle status bar') }
            ]
          },
          {
            id: 'help',
            label: 'Help',
            children: [
              { id: 'about', label: 'About Notepad', onClick: () => console.log('About') }
            ]
          }
        ]} />

        <TextArea
          value={content()}
          onInput={handleTextChange}
          placeholder="Start typing..."
          style="
            width: 100%; 
            height: calc(100% - 60px); 
            border: none; 
            resize: none; 
            font-family: 'Consolas', 'Courier New', monospace;
            font-size: 12px;
            line-height: 1.4;
          "
        />

        <StatusBar fields={[
          { id: 'status', content: modified() ? 'Modified' : 'Ready' },
          { id: 'lines', content: `Lines: ${getLineCount()}` },
          { id: 'words', content: `Words: ${getWordCount()}` },
          { id: 'chars', content: `Characters: ${content().length}` }
        ]} />
      </Window>

      <DialogBox
        title="Save Changes"
        message={`Do you want to save changes to ${filename()}?`}
        icon="question"
        isOpen={showSaveDialog()}
        onClose={() => setShowSaveDialog(false)}
        buttons={[
          { 
            id: 'save', 
            label: 'Save', 
            variant: 'default',
            onClick: () => {
              saveFile();
              setShowSaveDialog(false);
              newFile();
            }
          },
          { 
            id: 'dont-save', 
            label: "Don't Save", 
            onClick: () => {
              setShowSaveDialog(false);
              setContent('');
              setFilename('Untitled');
              setModified(false);
            }
          },
          { 
            id: 'cancel', 
            label: 'Cancel', 
            onClick: () => setShowSaveDialog(false)
          }
        ]}
      />
    </>
  );
};

export default TextEditor;
```

---

## File Manager

A file explorer interface with tree view and list view.

```tsx
import { Component, createSignal, For } from 'solid-js';
import { Window, NavBar, StatusBar, TreeView, ListView, Button } from '../components';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size: string;
  modified: string;
  selected?: boolean;
}

const FileManager: Component = () => {
  const [currentPath, setCurrentPath] = createSignal('C:\\Users\\Documents');
  const [selectedFiles, setSelectedFiles] = createSignal<string[]>([]);
  const [viewMode, setViewMode] = createSignal<'icons' | 'list' | 'details'>('details');
  
  const [files, setFiles] = createSignal<FileItem[]>([
    { id: '1', name: 'Documents', type: 'folder', size: '12 items', modified: '12/01/2023' },
    { id: '2', name: 'Pictures', type: 'folder', size: '34 items', modified: '11/28/2023' },
    { id: '3', name: 'Music', type: 'folder', size: '56 items', modified: '11/25/2023' },
    { id: '4', name: 'Videos', type: 'folder', size: '8 items', modified: '11/20/2023' },
    { id: '5', name: 'readme.txt', type: 'file', size: '2 KB', modified: '10/15/2023' },
    { id: '6', name: 'report.pdf', type: 'file', size: '1.5 MB', modified: '10/10/2023' },
    { id: '7', name: 'image.jpg', type: 'file', size: '845 KB', modified: '10/05/2023' },
  ]);

  const treeNodes = [
    {
      id: 'computer',
      label: 'Computer',
      icon: '💻',
      expanded: true,
      children: [
        {
          id: 'c-drive',
          label: 'Local Disk (C:)',
          icon: '💾',
          expanded: true,
          children: [
            {
              id: 'users',
              label: 'Users',
              icon: '👥',
              expanded: true,
              children: [
                { id: 'documents', label: 'Documents', icon: '📁' },
                { id: 'desktop', label: 'Desktop', icon: '🖥️' },
                { id: 'downloads', label: 'Downloads', icon: '📥' }
              ]
            },
            { id: 'windows', label: 'Windows', icon: '🪟' },
            { id: 'program-files', label: 'Program Files', icon: '📁' }
          ]
        },
        { id: 'd-drive', label: 'Data (D:)', icon: '💾' }
      ]
    }
  ];

  const handleFileSelect = (fileId: string) => {
    setSelectedFiles([fileId]);
  };

  const handleFileDoubleClick = (file: FileItem) => {
    if (file.type === 'folder') {
      console.log('Opening folder:', file.name);
      // Navigate to folder
    } else {
      console.log('Opening file:', file.name);
      // Open file with default application
    }
  };

  const getStatusText = () => {
    const totalFiles = files().length;
    const selectedCount = selectedFiles().length;
    if (selectedCount > 0) {
      return `${selectedCount} of ${totalFiles} items selected`;
    }
    return `${totalFiles} items`;
  };

  return (
    <Window title="File Manager" width="900px" height="700px" active>
      <NavBar items={[
        {
          id: 'file',
          label: 'File',
          children: [
            { id: 'new-folder', label: 'New Folder', onClick: () => console.log('New Folder') },
            { id: 'sep1', label: '', divider: true },
            { id: 'properties', label: 'Properties', onClick: () => console.log('Properties') }
          ]
        },
        {
          id: 'edit',
          label: 'Edit',
          children: [
            { id: 'copy', label: 'Copy\tCtrl+C', onClick: () => console.log('Copy') },
            { id: 'cut', label: 'Cut\tCtrl+X', onClick: () => console.log('Cut') },
            { id: 'paste', label: 'Paste\tCtrl+V', onClick: () => console.log('Paste') },
            { id: 'sep1', label: '', divider: true },
            { id: 'select-all', label: 'Select All\tCtrl+A', onClick: () => console.log('Select All') }
          ]
        },
        {
          id: 'view',
          label: 'View',
          children: [
            { id: 'large-icons', label: 'Large Icons', onClick: () => setViewMode('icons') },
            { id: 'list', label: 'List', onClick: () => setViewMode('list') },
            { id: 'details', label: 'Details', onClick: () => setViewMode('details') },
            { id: 'sep1', label: '', divider: true },
            { id: 'refresh', label: 'Refresh\tF5', onClick: () => console.log('Refresh') }
          ]
        }
      ]} />

      {/* Toolbar */}
      <div style="
        display: flex; 
        gap: 4px; 
        padding: 4px 8px; 
        border-bottom: 1px solid #ccc;
        background: linear-gradient(#fff, #f0f0f0);
      ">
        <Button onClick={() => console.log('Back')}>⬅️ Back</Button>
        <Button onClick={() => console.log('Forward')}>➡️ Forward</Button>
        <Button onClick={() => console.log('Up')}>⬆️ Up</Button>
        <div style="margin-left: 8px; flex: 1;">
          <input 
            type="text" 
            value={currentPath()} 
            style="width: 100%; padding: 2px 4px;" 
            readonly 
          />
        </div>
      </div>

      {/* Main Content */}
      <div style="display: flex; height: calc(100% - 120px);">
        {/* Sidebar */}
        <div style="
          width: 250px; 
          border-right: 1px solid #ccc; 
          background: #f8f8f8;
          overflow-y: auto;
        ">
          <TreeView 
            nodes={treeNodes}
            onNodeSelect={(nodeId) => {
              console.log('Selected folder:', nodeId);
              setCurrentPath(`C:\\Users\\${nodeId}`);
            }}
          />
        </div>

        {/* File List */}
        <div style="flex: 1; background: white;">
          <ListView
            columns={[
              { key: 'name', title: 'Name', sortable: true },
              { key: 'type', title: 'Type', sortable: true, width: '120px' },
              { key: 'size', title: 'Size', sortable: true, width: '100px' },
              { key: 'modified', title: 'Date Modified', sortable: true, width: '140px' }
            ]}
            items={files().map(file => ({
              ...file,
              selected: selectedFiles().includes(file.id),
              name: file.type === 'folder' ? `📁 ${file.name}` : `📄 ${file.name}`
            }))}
            hasShadow
            onSelectionChange={handleFileSelect}
            onDoubleClick={handleFileDoubleClick}
            onSort={(column, direction) => {
              console.log('Sorting by:', column, direction);
              // Implement sorting logic
            }}
          />
        </div>
      </div>

      <StatusBar fields={[
        { id: 'status', content: getStatusText() },
        { id: 'path', content: currentPath() }
      ]} />
    </Window>
  );
};

export default FileManager;
```

---

## Settings Dialog

A comprehensive settings dialog with multiple tabs.

```tsx
import { Component, createSignal } from 'solid-js';
import { 
  Dialog, 
  Tabs, 
  Checkbox, 
  Radio, 
  Select, 
  Slider, 
  Button, 
  TextBox 
} from '../components';

const SettingsDialog: Component = () => {
  const [isOpen, setIsOpen] = createSignal(false);
  
  // General settings
  const [showHiddenFiles, setShowHiddenFiles] = createSignal(false);
  const [rememberPositions, setRememberPositions] = createSignal(true);
  const [defaultView, setDefaultView] = createSignal('details');
  
  // Appearance settings
  const [theme, setTheme] = createSignal('aero');
  const [transparency, setTransparency] = createSignal(85);
  const [fontSize, setFontSize] = createSignal('medium');
  
  // Advanced settings
  const [enableLogging, setEnableLogging] = createSignal(false);
  const [logLevel, setLogLevel] = createSignal('info');
  const [cacheSize, setCacheSize] = createSignal(256);
  
  // Network settings
  const [proxyEnabled, setProxyEnabled] = createSignal(false);
  const [proxyHost, setProxyHost] = createSignal('');
  const [proxyPort, setProxyPort] = createSignal('8080');

  const handleSave = () => {
    console.log('Saving settings:', {
      general: { showHiddenFiles: showHiddenFiles(), rememberPositions: rememberPositions(), defaultView: defaultView() },
      appearance: { theme: theme(), transparency: transparency(), fontSize: fontSize() },
      advanced: { enableLogging: enableLogging(), logLevel: logLevel(), cacheSize: cacheSize() },
      network: { proxyEnabled: proxyEnabled(), proxyHost: proxyHost(), proxyPort: proxyPort() }
    });
    setIsOpen(false);
  };

  const tabs = [
    {
      id: 'general',
      label: 'General',
      content: (
        <div style="padding: 20px;">
          <div style="margin-bottom: 16px;">
            <h3 style="margin: 0 0 12px 0;">File Display</h3>
            <Checkbox 
              label="Show hidden files and folders"
              checked={showHiddenFiles()}
              onInput={(e) => setShowHiddenFiles(e.currentTarget.checked)}
            />
            <Checkbox 
              label="Remember window positions"
              checked={rememberPositions()}
              onInput={(e) => setRememberPositions(e.currentTarget.checked)}
            />
          </div>

          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 4px;">Default view:</label>
            <Select 
              options={[
                { value: 'icons', label: 'Large Icons' },
                { value: 'list', label: 'List' },
                { value: 'details', label: 'Details' }
              ]}
              value={defaultView()}
              onChange={(e) => setDefaultView(e.currentTarget.value)}
            />
          </div>

          <div>
            <h3 style="margin: 16px 0 12px 0;">Startup</h3>
            <Checkbox label="Start with Windows" />
            <Checkbox label="Open to last folder on startup" />
          </div>
        </div>
      )
    },
    {
      id: 'appearance',
      label: 'Appearance', 
      content: (
        <div style="padding: 20px;">
          <div style="margin-bottom: 20px;">
            <h3 style="margin: 0 0 12px 0;">Theme</h3>
            <div style="margin-bottom: 8px;">
              <Radio 
                name="theme"
                value="classic"
                label="Windows 7 Classic"
                checked={theme() === 'classic'}
                onInput={(e) => setTheme(e.currentTarget.value)}
              />
            </div>
            <div>
              <Radio 
                name="theme"
                value="aero"
                label="Windows 7 Aero"
                checked={theme() === 'aero'}
                onInput={(e) => setTheme(e.currentTarget.value)}
              />
            </div>
          </div>

          <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 8px;">
              Window transparency: {transparency()}%
            </label>
            <Slider 
              value={transparency()}
              min={0}
              max={100}
              onChange={(e) => setTransparency(parseInt(e.currentTarget.value))}
            />
          </div>

          <div>
            <label style="display: block; margin-bottom: 4px;">Font size:</label>
            <Select 
              options={[
                { value: 'small', label: 'Small' },
                { value: 'medium', label: 'Medium' },
                { value: 'large', label: 'Large' }
              ]}
              value={fontSize()}
              onChange={(e) => setFontSize(e.currentTarget.value)}
            />
          </div>
        </div>
      )
    },
    {
      id: 'advanced',
      label: 'Advanced',
      content: (
        <div style="padding: 20px;">
          <div style="margin-bottom: 20px;">
            <h3 style="margin: 0 0 12px 0;">Logging</h3>
            <Checkbox 
              label="Enable debug logging"
              checked={enableLogging()}
              onInput={(e) => setEnableLogging(e.currentTarget.checked)}
            />
            
            {enableLogging() && (
              <div style="margin-top: 8px; margin-left: 20px;">
                <label style="display: block; margin-bottom: 4px;">Log level:</label>
                <Select 
                  options={[
                    { value: 'error', label: 'Error' },
                    { value: 'warn', label: 'Warning' },
                    { value: 'info', label: 'Info' },
                    { value: 'debug', label: 'Debug' }
                  ]}
                  value={logLevel()}
                  onChange={(e) => setLogLevel(e.currentTarget.value)}
                />
              </div>
            )}
          </div>

          <div>
            <label style="display: block; margin-bottom: 8px;">
              Cache size: {cacheSize()} MB
            </label>
            <Slider 
              value={cacheSize()}
              min={64}
              max={1024}
              step={64}
              onChange={(e) => setCacheSize(parseInt(e.currentTarget.value))}
            />
          </div>
        </div>
      )
    },
    {
      id: 'network',
      label: 'Network',
      content: (
        <div style="padding: 20px;">
          <div style="margin-bottom: 20px;">
            <h3 style="margin: 0 0 12px 0;">Proxy Settings</h3>
            <Checkbox 
              label="Use proxy server"
              checked={proxyEnabled()}
              onInput={(e) => setProxyEnabled(e.currentTarget.checked)}
            />
          </div>

          {proxyEnabled() && (
            <div style="margin-left: 20px;">
              <div style="margin-bottom: 12px;">
                <TextBox 
                  label="Proxy host:"
                  labelPosition="left"
                  value={proxyHost()}
                  onInput={(e) => setProxyHost(e.currentTarget.value)}
                  placeholder="proxy.example.com"
                />
              </div>
              <div>
                <TextBox 
                  label="Port:"
                  labelPosition="left"
                  value={proxyPort()}
                  onInput={(e) => setProxyPort(e.currentTarget.value)}
                  placeholder="8080"
                />
              </div>
            </div>
          )}

          <div style="margin-top: 20px;">
            <h3 style="margin: 0 0 12px 0;">Connection</h3>
            <Checkbox label="Enable automatic updates" />
            <Checkbox label="Check for updates on startup" />
          </div>
        </div>
      )
    }
  ];

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Settings</Button>
      
      <Dialog
        title="Settings"
        isOpen={isOpen()}
        onClose={() => setIsOpen(false)}
        width="600px"
        height="500px"
      >
        <div style="display: flex; flex-direction: column; height: 100%;">
          <div style="flex: 1;">
            <Tabs tabs={tabs} />
          </div>
          
          <div style="
            padding: 16px; 
            border-top: 1px solid #ccc; 
            display: flex; 
            justify-content: flex-end; 
            gap: 8px;
            background: #f0f0f0;
          ">
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button variant="default" onClick={handleSave}>OK</Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default SettingsDialog;
```

---

## GitHub Pages Setup Instructions

To deploy your documentation to GitHub Pages:

### 1. Repository Setup

1. Push your code to a GitHub repository
2. Go to repository Settings → Pages
3. Set source to "GitHub Actions"

### 2. Update Configuration

Replace placeholders in the files:
- Update `your-username` in URLs to your actual GitHub username
- Update repository name if different from `solid7`

### 3. Deploy

The GitHub Action will automatically build and deploy when you push to main/master branch.

### 4. Access Your Site

Your documentation will be available at:
`https://your-username.github.io/solid7/`

---

## File Structure

```
solid7/
├── docs/
│   ├── index.md           # Main documentation page
│   ├── COMPONENTS.md      # Component reference
│   ├── EXAMPLES.md        # Usage examples
│   └── _config.yml        # Jekyll configuration
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions workflow
├── src/
│   └── components/        # Component source code
├── README.md              # Project README
└── package.json
```

The documentation uses Jekyll with the Minima theme for clean, professional presentation of your component library.