import { Component, createSignal } from 'solid-js';
import {
  Window,
  Button,
  ProgressBar,
  Tabs,
  Menu,
  NavBar,
  Slider,
  StatusBar,
  Checkbox,
  Radio,
  Select,
  SearchBox,
  DialogBox,
  Balloon,
  ListView,
  TextBox,
  TextArea,
  TreeView,
  Form,
  Dialog,
  Modal,
  ImageViewer,
  FileExplorer,
  WindowedFileExplorer,
  Notepad,
  Scrollbar,
} from '../components';
import './App.css';

const App: Component = () => {
  const [progress, setProgress] = createSignal(50);
  const [sliderValue, setSliderValue] = createSignal(25);
  const [checkboxChecked, setCheckboxChecked] = createSignal(false);
  const [radioValue, setRadioValue] = createSignal('option1');
  const [selectValue, setSelectValue] = createSignal('option2');
  const [showDialog, setShowDialog] = createSignal(false);
  const [showModal, setShowModal] = createSignal(false);
  const [showBalloon, setShowBalloon] = createSignal(false);
  const [showImageModal, setShowImageModal] = createSignal(false);
  const [selectedListItem, setSelectedListItem] = createSignal('item1');
  const [textBoxValue, setTextBoxValue] = createSignal('');
  const [textAreaValue, setTextAreaValue] = createSignal('');
  const [sortColumn, setSortColumn] = createSignal<string>('');
  const [sortDirection, setSortDirection] = createSignal<'asc' | 'desc'>('asc');

  // Form state
  const [showUserForm, setShowUserForm] = createSignal(false);
  const [showContactForm, setShowContactForm] = createSignal(false);

  // File Explorer navigation state
  const [explorerPath, setExplorerPath] = createSignal('');
  const [explorerData, setExplorerData] = createSignal([
    {
      name: 'Documents',
      type: 'folder' as const,
      modified: new Date('2023-12-01'),
    },
    {
      name: 'Pictures',
      type: 'folder' as const,
      modified: new Date('2023-11-28'),
    },
    {
      name: 'Music',
      type: 'folder' as const,
      modified: new Date('2023-11-25'),
    },
    {
      name: 'Videos',
      type: 'folder' as const,
      modified: new Date('2023-11-20'),
    },
    {
      name: 'Desktop',
      type: 'folder' as const,
      modified: new Date('2023-12-05'),
    },
    {
      name: 'Downloads',
      type: 'folder' as const,
      modified: new Date('2023-12-03'),
    },
    {
      name: 'readme.txt',
      type: 'file' as const,
      size: 2048,
      modified: new Date('2023-10-15'),
    },
    {
      name: 'config.ini',
      type: 'file' as const,
      size: 512,
      modified: new Date('2023-11-01'),
    },
    {
      name: 'photo.jpg',
      type: 'file' as const,
      size: 1048576,
      modified: new Date('2023-11-30'),
    },
    {
      name: 'document.pdf',
      type: 'file' as const,
      size: 524288,
      modified: new Date('2023-12-02'),
    },
  ]);

  // Simulated file system for navigation
  const fileSystem: Record<string, any[]> = {
    '': [
      // Root / Computer
      { name: 'Documents', type: 'folder', modified: new Date('2023-12-01') },
      { name: 'Pictures', type: 'folder', modified: new Date('2023-11-28') },
      { name: 'Music', type: 'folder', modified: new Date('2023-11-25') },
      { name: 'Videos', type: 'folder', modified: new Date('2023-11-20') },
      { name: 'Desktop', type: 'folder', modified: new Date('2023-12-05') },
      { name: 'Downloads', type: 'folder', modified: new Date('2023-12-03') },
      {
        name: 'readme.txt',
        type: 'file',
        size: 2048,
        modified: new Date('2023-10-15'),
      },
      {
        name: 'config.ini',
        type: 'file',
        size: 512,
        modified: new Date('2023-11-01'),
      },
      {
        name: 'photo.jpg',
        type: 'file',
        size: 1048576,
        modified: new Date('2023-11-30'),
      },
      {
        name: 'document.pdf',
        type: 'file',
        size: 524288,
        modified: new Date('2023-12-02'),
      },
    ],
    Documents: [
      { name: 'Work', type: 'folder', modified: new Date('2023-11-15') },
      { name: 'Personal', type: 'folder', modified: new Date('2023-11-10') },
      {
        name: 'letter.docx',
        type: 'file',
        size: 15360,
        modified: new Date('2023-11-20'),
      },
      {
        name: 'resume.pdf',
        type: 'file',
        size: 87432,
        modified: new Date('2023-10-05'),
      },
    ],
    'Documents\\Work': [
      { name: 'Projects', type: 'folder', modified: new Date('2023-11-12') },
      { name: 'Reports', type: 'folder', modified: new Date('2023-11-08') },
      {
        name: 'presentation.pptx',
        type: 'file',
        size: 3456789,
        modified: new Date('2023-11-14'),
      },
      {
        name: 'budget.xlsx',
        type: 'file',
        size: 123456,
        modified: new Date('2023-11-01'),
      },
    ],
    Pictures: [
      {
        name: 'Vacation 2023',
        type: 'folder',
        modified: new Date('2023-08-15'),
      },
      { name: 'Family', type: 'folder', modified: new Date('2023-09-20') },
      {
        name: 'sunset.jpg',
        type: 'file',
        size: 1024000,
        modified: new Date('2023-07-12'),
      },
      {
        name: 'beach.png',
        type: 'file',
        size: 2048000,
        modified: new Date('2023-07-15'),
      },
    ],
    Music: [
      { name: 'Rock', type: 'folder', modified: new Date('2023-05-10') },
      { name: 'Jazz', type: 'folder', modified: new Date('2023-06-05') },
      {
        name: 'favorite_song.mp3',
        type: 'file',
        size: 5242880,
        modified: new Date('2023-06-20'),
      },
    ],
  };

  const handleFileExplorerNavigation = (path: string) => {
    setExplorerPath(path);
    const data = fileSystem[path] || [];
    setExplorerData(data);
    console.log(`Navigated to: "${path}" - ${data.length} items`);
  };

  const tabs = [
    {
      id: 'buttons',
      label: 'Buttons',
      content: (
        <div class='section'>
          <h3>Button Components</h3>
          <div class='component-group'>
            <Button>Normal Button</Button>
            <Button variant='default'>Default Button</Button>
            <Button disabled>Disabled Button</Button>
            <Button aria-label='Search'>🔍</Button>
          </div>
        </div>
      ),
    },
    {
      id: 'forms',
      label: 'Forms',
      content: (
        <div class='section'>
          <h3>Form Components</h3>
          <div class='component-group'>
            <Checkbox
              label='Checkbox Example'
              checked={checkboxChecked()}
              onInput={(e) => setCheckboxChecked(e.currentTarget.checked)}
            />

            <div>
              <Radio
                name='radio-group'
                value='option1'
                label='Option 1'
                checked={radioValue() === 'option1'}
                onInput={(e) => setRadioValue(e.currentTarget.value)}
              />
              <Radio
                name='radio-group'
                value='option2'
                label='Option 2'
                checked={radioValue() === 'option2'}
                onInput={(e) => setRadioValue(e.currentTarget.value)}
              />
            </div>

            <Select
              value={selectValue()}
              onChange={(e) => setSelectValue(e.currentTarget.value)}
              options={[
                { value: 'option1', label: 'Option 1' },
                { value: 'option2', label: 'Option 2' },
                { value: 'option3', label: 'Option 3', disabled: true },
              ]}
            />

            <SearchBox placeholder='Search files...' />

            <input type='text' placeholder='Regular text input' />
          </div>

          <div style='margin-top: 20px;'>
            <h4>Modal Forms:</h4>
            <div class='component-group'>
              <Button onClick={() => setShowUserForm(true)}>
                Show User Registration Form
              </Button>
              <Button onClick={() => setShowContactForm(true)}>
                Show Contact Form
              </Button>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'controls',
      label: 'Controls',
      content: (
        <div class='section'>
          <h3>Control Components</h3>
          <div class='component-group'>
            <div>
              <label>Progress Bar: {progress()}%</label>
              <ProgressBar value={progress()} />
              <Button onClick={() => setProgress(Math.random() * 100)}>
                Random Progress
              </Button>
            </div>

            <div>
              <label>Animated Progress</label>
              <ProgressBar value={progress()} animate />
            </div>

            <div>
              <label>Error Progress</label>
              <ProgressBar value={progress()} error />
            </div>
            <div>
              <label>Marquee Progress</label>
              <ProgressBar value={progress()} marquee />
            </div>
            <div>
              <label>Pause Progress</label>
              <ProgressBar value={progress()} paused />
            </div>
            <div>
              <label>Slider: {sliderValue()}</label>
              <Slider
                value={sliderValue()}
                onChange={(e) =>
                  setSliderValue(parseInt(e.currentTarget.value))
                }
              />
            </div>

            <div>
              <label>Box Indicator Slider</label>
              <Slider hasBoxIndicator value={60} />
            </div>

            <div>
              <label>Vertical Slider</label>
              <Slider vertical value={40} />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'advanced',
      label: 'Advanced',
      content: (
        <div class='section'>
          <h3>Advanced Components</h3>
          <div class='component-group'>
            <div style='margin-bottom: 20px;'>
              <h4>Text Input Components:</h4>
              <div style='display: flex; flex-direction: column; gap: 12px; max-width: 300px;'>
                <TextBox
                  label='Username:'
                  labelPosition='left'
                  value={textBoxValue()}
                  onInput={(e: Event & { currentTarget: HTMLInputElement }) =>
                    setTextBoxValue(e.currentTarget.value)
                  }
                  placeholder='Enter username'
                />

                <TextBox
                  label='Email Address'
                  labelPosition='top'
                  type='email'
                  placeholder='user@example.com'
                />

                <TextArea
                  label='Comments:'
                  labelPosition='top'
                  value={textAreaValue()}
                  onInput={(
                    e: Event & { currentTarget: HTMLTextAreaElement }
                  ) => setTextAreaValue(e.currentTarget.value)}
                  placeholder='Enter your comments here...'
                  rows={3}
                />
              </div>
            </div>

            <div style='margin-bottom: 20px;'>
              <h4>List and Tree Components:</h4>
              <div style='display: flex; gap: 20px; flex-wrap: wrap;'>
                <div>
                  <h5>List View:</h5>
                  <ListView
                    columns={[
                      {
                        key: 'name',
                        title: 'Name',
                        sortable: true,
                        sorted:
                          sortColumn() === 'name' ? sortDirection() : undefined,
                      },
                      {
                        key: 'type',
                        title: 'Type',
                        sortable: true,
                        sorted:
                          sortColumn() === 'type' ? sortDirection() : undefined,
                      },
                      { key: 'size', title: 'Size', width: '80px' },
                      {
                        key: 'modified',
                        title: 'Date Modified',
                        sortable: true,
                        sorted:
                          sortColumn() === 'modified'
                            ? sortDirection()
                            : undefined,
                      },
                    ]}
                    items={[
                      {
                        id: 'item1',
                        name: 'Documents',
                        type: 'Folder',
                        size: '12 items',
                        modified: '12/01/2023',
                        selected: selectedListItem() === 'item1',
                      },
                      {
                        id: 'item2',
                        name: 'Pictures',
                        type: 'Folder',
                        size: '34 items',
                        modified: '11/28/2023',
                        selected: selectedListItem() === 'item2',
                      },
                      {
                        id: 'item3',
                        name: 'Music',
                        type: 'Folder',
                        size: '56 items',
                        modified: '11/25/2023',
                        selected: selectedListItem() === 'item3',
                      },
                      {
                        id: 'item4',
                        name: 'Videos',
                        type: 'Folder',
                        size: '8 items',
                        modified: '11/20/2023',
                        selected: selectedListItem() === 'item4',
                      },
                      {
                        id: 'item5',
                        name: 'readme.txt',
                        type: 'Text Document',
                        size: '2 KB',
                        modified: '10/15/2023',
                        disabled: true,
                      },
                    ]}
                    onSelectionChange={setSelectedListItem}
                    onClick={(item) => console.log('Clicked:', item.name)}
                    onDoubleClick={(item) =>
                      alert(`Double-clicked: ${item.name}`)
                    }
                    onSort={(column, direction) => {
                      setSortColumn(column);
                      setSortDirection(direction);
                      console.log(`Sorting by ${column} ${direction}`);
                    }}
                    hasShadow
                    class='custom-listview'
                  />
                </div>

                <div>
                  <h5>Tree View:</h5>
                  <TreeView
                    nodes={[
                      {
                        id: 'root1',
                        label: 'My Computer',
                        icon: '💻',
                        children: [
                          {
                            id: 'c-drive',
                            label: 'Local Disk (C:)',
                            icon: '💾',
                            children: [
                              { id: 'windows', label: 'Windows', icon: '📁' },
                              { id: 'users', label: 'Users', icon: '👥' },
                            ],
                          },
                        ],
                      },
                    ]}
                    onNodeSelect={(id) => alert(`Selected: ${id}`)}
                    class='custom-treeview'
                  />
                </div>
              </div>
            </div>

            <div style='margin-bottom: 20px;'>
              <h4>Progress Bar Variants:</h4>
              <div style='display: flex; flex-direction: column; gap: 12px; max-width: 300px;'>
                <div>
                  <label>Normal Progress (75%)</label>
                  <ProgressBar value={75} />
                </div>
                <div>
                  <label>Animated Progress</label>
                  <ProgressBar value={60} animate />
                </div>
                <div>
                  <label>Error State</label>
                  <ProgressBar value={45} error />
                </div>
                <div>
                  <label>Paused State</label>
                  <ProgressBar value={30} paused />
                </div>
                <div>
                  <label>Marquee (Indeterminate)</label>
                  <ProgressBar marquee />
                </div>
              </div>
            </div>

            <div style='margin-bottom: 20px;'>
              <h4>Interactive Components:</h4>
              <div style='display: flex; gap: 10px; flex-wrap: wrap;'>
                <Button onClick={() => setShowDialog(true)}>Show Dialog</Button>
                <Button onClick={() => setShowModal(true)}>Show Modal</Button>
                <Button
                  onMouseEnter={() => setShowBalloon(true)}
                  onMouseLeave={() => setShowBalloon(false)}
                  style='position: relative;'
                >
                  Hover for Tooltip
                  <Balloon
                    content='This is a tooltip balloon with proper 7.css styling!'
                    position='top'
                    isVisible={showBalloon()}
                    class='custom-balloon'
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'navigation',
      label: 'Navigation',
      content: (
        <div class='section'>
          <h3>Navigation Components</h3>
          <div class='component-group'>
            <h4>Context Menu Example:</h4>
            <div style='position: relative; display: inline-block; margin-bottom: 16px;'>
              <Menu
                items={[
                  {
                    id: 'file',
                    label: 'New File',
                    onClick: () => alert('New File'),
                  },
                  {
                    id: 'folder',
                    label: 'New Folder',
                    onClick: () => alert('New Folder'),
                  },
                  { id: 'sep1', label: '', divider: true },
                  { id: 'copy', label: 'Copy', onClick: () => alert('Copy') },
                  {
                    id: 'paste',
                    label: 'Paste',
                    onClick: () => alert('Paste'),
                  },
                  { id: 'sep2', label: '', divider: true },
                  {
                    id: 'properties',
                    label: 'Properties',
                    onClick: () => alert('Properties'),
                  },
                  { id: 'disabled', label: 'Disabled Item', disabled: true },
                ]}
              />
            </div>

            <p>
              This context menu demonstrates the proper 7.css styling with
              dividers and disabled items.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'viewer',
      label: 'Image Viewer',
      content: (
        <div class='section'>
          <h3>Image Viewer Component</h3>
          <div class='component-group'>
            <p style='margin-bottom: 16px;'>
              Enhanced image viewer component with zoom controls, carousel
              functionality, and modal support.
            </p>

            <div style='display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px;'>
              <Button onClick={() => setShowImageModal(true)}>
                Open Modal Carousel
              </Button>
            </div>

            <div style='display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 20px;'>
              <ImageViewer
                title='Single Image Viewer'
                width='400px'
                height='300px'
                imageSrc='https://picsum.photos/800/600?random=1'
                imageAlt='Random sample image'
                onClose={() => alert('Close image viewer')}
                onMinimize={() => alert('Minimize image viewer')}
                onMaximize={() => alert('Maximize image viewer')}
              />

              <ImageViewer
                title='Multiple Images Carousel'
                width='640px'
                height='300px'
                imageSrc={[
                  'https://picsum.photos/800/600?random=2',
                  'https://picsum.photos/800/600?random=3',
                  'https://picsum.photos/800/600?random=4',
                ]}
                imageAlt={[
                  'Random sample image 1',
                  'Random sample image 2',
                  'Random sample image 3',
                ]}
                onClose={() => alert('Close carousel viewer')}
                onMinimize={() => alert('Minimize carousel viewer')}
                onMaximize={() => alert('Maximize carousel viewer')}
              />
            </div>

            <div style='display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 20px;'>
              <ImageViewer
                title='No Image Example'
                width='350px'
                height='250px'
                onClose={() => alert('Close empty viewer')}
                showToolbar={true}
              />
            </div>

            <div style='margin-bottom: 20px;'>
              <h4>Features:</h4>
              <ul style='margin: 8px 0; padding-left: 20px;'>
                <li>🔍 Zoom In/Out controls</li>
                <li>📐 Actual size (1:1) button</li>
                <li>🖼️ Fit to window functionality</li>
                <li>🎛️ Toolbar with zoom level indicator</li>
                <li>🚨 Error handling for failed image loads</li>
                <li>📋 Placeholder when no image is provided</li>
                <li>🎨 Proper 7.css window styling</li>
                <li>
                  🎠 <strong>NEW:</strong> Carousel for multiple images
                </li>
                <li>
                  🪟 <strong>NEW:</strong> Modal overlay support
                </li>
                <li>
                  ⌨️ <strong>NEW:</strong> Keyboard navigation (arrows, ESC)
                </li>
                <li>
                  🔢 <strong>NEW:</strong> Image counter display
                </li>
              </ul>
            </div>

            <div style='margin-bottom: 20px;'>
              <h4>Usage Examples:</h4>
              <pre style='background: #f5f5f5; padding: 10px; border-radius: 4px; font-size: 12px; overflow-x: auto;'>{`// Single image
<ImageViewer imageSrc="image.jpg" />

// Multiple images (carousel)
<ImageViewer imageSrc={["img1.jpg", "img2.jpg", "img3.jpg"]} />

// Modal overlay
<ImageViewer
  isModal={true}
  imageSrc={["img1.jpg", "img2.jpg"]}
  onClose={() => setShowModal(false)}
/>`}</pre>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'explorer',
      label: 'File Explorer',
      content: (
        <div class='section'>
          <h3>Windows 7 File Explorer</h3>
          <div class='component-group'>
            <p style='margin-bottom: 16px;'>
              File Explorer component with Windows 7 styling, supporting both
              icons and details view.
            </p>

            <div style='margin-bottom: 20px;'>
              <div style='background: #f0f0f0; padding: 10px; border-radius: 4px; margin-bottom: 10px; font-size: 12px;'>
                <strong>Current Path:</strong>{' '}
                {explorerPath() || 'Computer (Root)'}
              </div>

              <h4>Windowed File Explorer - Icons View</h4>
              <Window
                title={`${explorerPath() || 'Computer'} - Windows Explorer`}
                width='700px'
                height='500px'
                active={true}
                hasSpace={false}
                onClose={() => alert('File Explorer closed')}
                onMinimize={() => alert('File Explorer minimized')}
                onMaximize={() => alert('File Explorer maximized')}
              >
                <FileExplorer
                  data={explorerData()}
                  currentPath={explorerPath()}
                  viewMode='icons'
                  showSearch={true}
                  searchPlaceholder='Search files and folders...'
                  width='100%'
                  height='100%'
                  onNavigate={(path, item) => {
                    handleFileExplorerNavigation(path);
                    console.log('Navigate to:', path, item);
                  }}
                  onFileSelect={(item, selected) => {
                    console.log(
                      'Selected:',
                      item.name,
                      'Total:',
                      selected.length
                    );
                  }}
                  onFileOpen={(item) => {
                    console.log('Open:', item);
                    alert(`Opening: ${item.name} (${item.type})`);
                  }}
                  onSearchChange={(term, filtered) => {
                    console.log('Search:', term, 'Results:', filtered.length);
                  }}
                />
              </Window>
            </div>

            <div style='margin-bottom: 20px;'>
              <h4>Windowed Details View (System Files Example)</h4>
              <Window
                title='C:\ - Windows Explorer'
                width='800px'
                height='450px'
                active={true}
                hasSpace={false}
                onClose={() => alert('System Explorer closed')}
                onMinimize={() => alert('System Explorer minimized')}
                onMaximize={() => alert('System Explorer maximized')}
              >
                <FileExplorer
                  data={[
                    {
                      name: 'System32',
                      type: 'folder',
                      modified: new Date('2023-10-01'),
                    },
                    {
                      name: 'Program Files',
                      type: 'folder',
                      modified: new Date('2023-09-15'),
                    },
                    {
                      name: 'Program Files (x86)',
                      type: 'folder',
                      modified: new Date('2023-09-15'),
                    },
                    {
                      name: 'Users',
                      type: 'folder',
                      modified: new Date('2023-11-20'),
                    },
                    {
                      name: 'Windows',
                      type: 'folder',
                      modified: new Date('2023-10-01'),
                    },
                    {
                      name: 'autoexec.bat',
                      type: 'file',
                      size: 128,
                      modified: new Date('2023-08-01'),
                    },
                    {
                      name: 'config.sys',
                      type: 'file',
                      size: 256,
                      modified: new Date('2023-08-01'),
                    },
                    {
                      name: 'pagefile.sys',
                      type: 'file',
                      size: 4294967296,
                      modified: new Date('2023-12-05'),
                    },
                    {
                      name: 'hiberfil.sys',
                      type: 'file',
                      size: 2147483648,
                      modified: new Date('2023-12-04'),
                    },
                  ]}
                  currentPath='C:'
                  viewMode='details'
                  showSearch={true}
                  searchPlaceholder='Search system files...'
                  width='100%'
                  height='100%'
                  onNavigate={(path, item) => {
                    console.log('Navigate to:', path, item);
                    alert(`Would navigate to: ${path} (${item.name})`);
                  }}
                  onFileSelect={(item, selected) => {
                    console.log(
                      'Selected:',
                      item.name,
                      'Total:',
                      selected.length
                    );
                  }}
                  onFileOpen={(item) => {
                    console.log('Open:', item);
                    alert(`Opening: ${item.name} (${item.type})`);
                  }}
                  onSearchChange={(term, filtered) => {
                    console.log('Search:', term, 'Results:', filtered.length);
                  }}
                />
              </Window>
            </div>

            <div style='margin-bottom: 20px;'>
              <h4>Features:</h4>
              <ul style='margin: 8px 0; padding-left: 20px;'>
                <li>📁 Icons view and Details view modes</li>
                <li>🔍 Integrated search functionality with live filtering</li>
                <li>
                  🏷️ Interactive breadcrumb navigation (click any path segment)
                </li>
                <li>
                  🔄 <strong>NEW:</strong> Functional Back, Forward, and Up
                  navigation buttons
                </li>
                <li>
                  🧭 <strong>NEW:</strong> Navigation history with browser-like
                  behavior
                </li>
                <li>📊 Status bar with item counts and search status</li>
                <li>🎯 Click to select, double-click to navigate/open</li>
                <li>⌨️ Multi-select with Ctrl+Click</li>
                <li>📝 Sortable columns in details view (click headers)</li>
                <li>🎨 Authentic Windows 7 styling and gradients</li>
                <li>📏 Custom scrollbars matching Windows 7 design</li>
                <li>🗂️ File and folder icons with proper types</li>
                <li>📋 Smart file size formatting (B, KB, MB, GB)</li>
                <li>📅 Date and time formatting</li>
                <li>🚫 Disabled navigation buttons when not applicable</li>
                <li>🏠 "Computer" root navigation</li>
                <li>
                  🪟 <strong>NEW:</strong> WindowedFileExplorer component
                  (FileExplorer + Window)
                </li>
                <li>
                  📱 <strong>NEW:</strong> Dynamic window titles that update
                  with navigation
                </li>
                <li>
                  🎛️ <strong>NEW:</strong> Full window controls (minimize,
                  maximize, close)
                </li>
              </ul>
            </div>

            <div style='margin-bottom: 20px;'>
              <h4>Usage Examples:</h4>
              <pre style='background: #f5f5f5; padding: 10px; border-radius: 4px; font-size: 12px; overflow-x: auto;'>{`// Basic usage with navigation
const [currentPath, setCurrentPath] = createSignal('');
const [fileData, setFileData] = createSignal([]);

// Update data when path changes
const handleNavigation = (path: string, item: FileItem) => {
  setCurrentPath(path);
  const newData = getDataForPath(path); // Your data source
  setFileData(newData);
};

<FileExplorer 
  data={fileData()} 
  currentPath={currentPath()}
  viewMode="icons"
  showSearch={true}
  onNavigate={handleNavigation}
  onFileOpen={(item) => openFile(item)}
  onFileSelect={(item, selected) => updateSelection(selected)}
/>

// Static explorer (no navigation)
<FileExplorer
  data={staticFileData}
  currentPath="C:\\Windows\\System32"
  viewMode="details"
  showSearch={false}
  onFileOpen={(item) => alert(\`Opening: \${item.name}\`)}
/>

// Windowed File Explorer (easiest usage)
<WindowedFileExplorer
  data={fileData()}
  currentPath={currentPath()}
  viewMode="icons"
  showSearch={true}
  windowWidth="800px"
  windowHeight="600px"
  onNavigate={handleNavigation}
  onFileOpen={(item) => openFile(item)}
  onWindowClose={() => closeExplorer()}
/>`}</pre>
            </div>

            <div style='margin-bottom: 20px;'>
              <h4>Try the Navigation:</h4>
              <p style='margin: 8px 0; font-size: 13px; color: #666;'>
                In the interactive examples above: • Double-click folders to
                navigate into them
                <br />
                • Use Back/Forward buttons to navigate history
                <br />
                • Click any breadcrumb segment to jump to that location
                <br />
                • Try the Up button to go to parent directory
                <br />
                • Use search to filter files in current directory
                <br />• Click window controls (minimize, maximize, close) to
                test functionality
              </p>
            </div>

            <div style='margin-bottom: 20px;'>
              <h4>Standalone Windowed Component</h4>
              <p style='margin: 8px 0 16px 0; font-size: 13px; color: #666;'>
                The <code>WindowedFileExplorer</code> component combines the
                FileExplorer with a Window for easy usage:
              </p>
              <WindowedFileExplorer
                data={explorerData()}
                currentPath={explorerPath()}
                viewMode='details'
                showSearch={true}
                searchPlaceholder='Search in standalone window...'
                windowWidth='750px'
                windowHeight='400px'
                onNavigate={(path, item) => {
                  handleFileExplorerNavigation(path);
                  console.log('Standalone Navigate to:', path, item);
                }}
                onFileSelect={(item, selected) => {
                  console.log(
                    'Standalone Selected:',
                    item.name,
                    'Total:',
                    selected.length
                  );
                }}
                onFileOpen={(item) => {
                  console.log('Standalone Open:', item);
                  alert(`Standalone Opening: ${item.name} (${item.type})`);
                }}
                onSearchChange={(term, filtered) => {
                  console.log(
                    'Standalone Search:',
                    term,
                    'Results:',
                    filtered.length
                  );
                }}
                onWindowClose={() =>
                  alert('Standalone File Explorer would close')
                }
                onWindowMinimize={() =>
                  alert('Standalone File Explorer minimized')
                }
                onWindowMaximize={() =>
                  alert('Standalone File Explorer maximized')
                }
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'notepad',
      label: 'Notepad',
      content: (
        <div class='section'>
          <h3>Windows 7 Notepad</h3>
          <div class='component-group'>
            <p style='margin-bottom: 16px;'>
              A fully functional Windows 7-style Notepad component with
              authentic menus, status bar, and text editing features.
            </p>

            <div style='margin-bottom: 20px;'>
              <h4>Notepad Window</h4>
              <Notepad
                width='700px'
                height='500px'
                content='Welcome to Windows 7 Notepad!\n\nThis is a fully functional text editor with:\n- File operations (New, Open, Save, Save As)\n- Edit operations (Cut, Copy, Paste, Find, Replace)\n- Format options (Word Wrap, Font)\n- View options (Status Bar)\n- Real-time cursor position tracking\n- Character and line counting\n\nTry typing some text and using the menus!'
                fileName='Welcome.txt'
                onContentChange={(content) =>
                  console.log('Content changed:', content.length, 'characters')
                }
                onClose={() => alert('Notepad would close')}
                onMinimize={() => alert('Notepad minimized')}
                onMaximize={() => alert('Notepad maximized')}
              />
            </div>

            <div style='margin-bottom: 20px;'>
              <h4>Features:</h4>
              <ul style='margin: 8px 0; padding-left: 20px;'>
                <li>📝 Full text editing with real-time content updates</li>
                <li>📁 File menu with New, Open, Save, Save As, Exit</li>
                <li>
                  ✂️ Edit menu with Cut, Copy, Paste, Find, Replace, Select All
                </li>
                <li>🔤 Format menu with Word Wrap toggle and Font options</li>
                <li>👁️ View menu with Status Bar toggle</li>
                <li>❓ Help menu with About dialog</li>
                <li>
                  📊 Status bar showing cursor position, zoom, encoding, line
                  count
                </li>
                <li>🎯 Real-time cursor position tracking (line and column)</li>
                <li>
                  🔤 Monospace font (Consolas/Courier New) for authentic feel
                </li>
                <li>📄 Word wrap toggle functionality</li>
                <li>🚨 Modified state tracking with title bar indicator (*)</li>
                <li>⌨️ Keyboard shortcuts in menu labels</li>
                <li>🎨 Authentic Windows 7 styling and layout</li>
                <li>
                  🪟 Proper window integration with minimize/maximize/close
                </li>
                <li>📋 Clipboard integration for cut/copy/paste operations</li>
                <li>
                  ✅ Menu item state management (disabled when no selection,
                  etc.)
                </li>
              </ul>
            </div>

            <div style='margin-bottom: 20px;'>
              <h4>Usage Examples:</h4>
              <pre style='background: #f5f5f5; padding: 10px; border-radius: 4px; font-size: 12px; overflow-x: auto;'>{`// Basic Notepad
<Notepad 
  width="600px" 
  height="400px" 
/>

// Notepad with initial content
<Notepad
  content="Hello World!"
  fileName="document.txt"
  onContentChange={(content) => console.log(content)}
  onClose={() => handleClose()}
/>

// Notepad with custom settings
<Notepad
  wordWrap={false}
  showStatusBar={true}
  width="800px"
  height="600px"
  onMinimize={() => minimizeWindow()}
  onMaximize={() => maximizeWindow()}
/>`}</pre>
            </div>

            <div style='margin-bottom: 20px;'>
              <h4>Try It Out:</h4>
              <p style='margin: 8px 0; font-size: 13px; color: #666;'>
                In the Notepad window above: • Try typing and editing text
                <br />
                • Use Ctrl+A to select all text
                <br />
                • Use the Edit menu for Cut/Copy/Paste operations
                <br />
                • Toggle Word Wrap in the Format menu
                <br />
                • Watch the status bar for cursor position updates
                <br />
                • Try the File menu options (they show dialogs for now)
                <br />• Notice the modified indicator (*) in the title when text
                changes
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const statusFields = [
    { id: 'status', content: 'Ready' },
    { id: 'items', content: `${tabs.length} tabs` },
    { id: 'progress', content: `${Math.round(progress())}%` },
  ];

  return (
    <div class='app'>
      <Window
        title='Solid 7.CSS Playground'
        width='100vw'
        active
        glass
        statusBar={{
          fields: statusFields,
        }}
      >
        <div class='playground-content'>
          <h1>🪟 Solid 7.CSS Components</h1>
          <p>
            Interactive playground showcasing all SolidJS wrapper components for
            7.css
          </p>

          <NavBar
            items={[
              {
                id: 'file',
                label: 'File',
                children: [
                  { id: 'new', label: 'New', onClick: () => alert('New file') },
                  {
                    id: 'open',
                    label: 'Open...',
                    onClick: () => alert('Open file'),
                  },
                  {
                    id: 'recent',
                    label: 'Recent Files',
                    children: [
                      {
                        id: 'recent1',
                        label: 'Document1.txt',
                        onClick: () => alert('Recent 1'),
                      },
                      {
                        id: 'recent2',
                        label: 'Project.html',
                        onClick: () => alert('Recent 2'),
                      },
                      {
                        id: 'recent3',
                        label: 'Style.css',
                        onClick: () => alert('Recent 3'),
                      },
                    ],
                  },
                  { id: 'sep1', label: '', divider: true },
                  { id: 'save', label: 'Save', onClick: () => alert('Save') },
                  {
                    id: 'saveas',
                    label: 'Save As...',
                    onClick: () => alert('Save As'),
                  },
                  { id: 'sep2', label: '', divider: true },
                  { id: 'exit', label: 'Exit', onClick: () => alert('Exit') },
                ],
              },
              {
                id: 'edit',
                label: 'Edit',
                children: [
                  { id: 'undo', label: 'Undo', onClick: () => alert('Undo') },
                  { id: 'redo', label: 'Redo', onClick: () => alert('Redo') },
                  { id: 'sep1', label: '', divider: true },
                  { id: 'cut', label: 'Cut', onClick: () => alert('Cut') },
                  { id: 'copy', label: 'Copy', onClick: () => alert('Copy') },
                  {
                    id: 'paste',
                    label: 'Paste',
                    onClick: () => alert('Paste'),
                  },
                  { id: 'sep2', label: '', divider: true },
                  {
                    id: 'find',
                    label: 'Find',
                    children: [
                      {
                        id: 'findtext',
                        label: 'Find Text...',
                        onClick: () => alert('Find Text'),
                      },
                      {
                        id: 'findnext',
                        label: 'Find Next',
                        onClick: () => alert('Find Next'),
                      },
                      {
                        id: 'replace',
                        label: 'Replace...',
                        onClick: () => alert('Replace'),
                      },
                    ],
                  },
                ],
              },
              {
                id: 'view',
                label: 'View',
                children: [
                  {
                    id: 'toolbar',
                    label: 'Toolbar',
                    onClick: () => alert('Toggle Toolbar'),
                  },
                  {
                    id: 'statusbar',
                    label: 'Status Bar',
                    onClick: () => alert('Toggle Status Bar'),
                  },
                  { id: 'sep1', label: '', divider: true },
                  {
                    id: 'zoom',
                    label: 'Zoom',
                    children: [
                      {
                        id: 'zoomin',
                        label: 'Zoom In',
                        onClick: () => alert('Zoom In'),
                      },
                      {
                        id: 'zoomout',
                        label: 'Zoom Out',
                        onClick: () => alert('Zoom Out'),
                      },
                      {
                        id: 'zoom100',
                        label: '100%',
                        onClick: () => alert('100% Zoom'),
                      },
                    ],
                  },
                ],
              },
              {
                id: 'help',
                label: 'Help',
                children: [
                  {
                    id: 'docs',
                    label: 'Documentation',
                    onClick: () => alert('Documentation'),
                  },
                  {
                    id: 'shortcuts',
                    label: 'Keyboard Shortcuts',
                    onClick: () => alert('Shortcuts'),
                  },
                  { id: 'sep1', label: '', divider: true },
                  {
                    id: 'about',
                    label: 'About',
                    onClick: () => alert('About'),
                  },
                ],
              },
            ]}
          />

          <Tabs tabs={tabs} justified />

          <div class='section'>
            <h3>Nested Window Examples</h3>
            <div style='display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 20px;'>
              <Window
                title='Child Window (with padding)'
                width='300px'
                onClose={() => alert('Close clicked')}
                onMinimize={() => alert('Minimize clicked')}
                onMaximize={() => alert('Maximize clicked')}
              >
                <p>This window has the default padding (has-space).</p>
                <Button variant='default'>Action Button</Button>
              </Window>

              <Window
                title='Child Window (no padding)'
                width='300px'
                hasSpace={false}
                onClose={() => alert('Close clicked')}
                onMinimize={() => alert('Minimize clicked')}
                onMaximize={() => alert('Maximize clicked')}
              >
                <div style='padding: 0; margin: 0;'>
                  <p style='margin: 8px;'>
                    This window has no padding (hasSpace=false).
                  </p>
                  <Scrollbar width='23px' height='100px'>
                    <p>Scrollable content goes here.</p>
                  </Scrollbar>
                  <div style='padding: 8px;'>
                    <Button variant='default'>Action Button</Button>
                  </div>
                </div>
              </Window>
            </div>
          </div>
        </div>
      </Window>

      <DialogBox
        title='Information Dialog'
        message='This is an example dialog box with proper 7.css styling. It includes an icon, message, and multiple buttons.'
        icon='info'
        isOpen={showDialog()}
        onClose={() => setShowDialog(false)}
        buttons={[
          {
            id: 'ok',
            label: 'OK',
            onClick: () => setShowDialog(false),
            variant: 'default',
          },
          {
            id: 'cancel',
            label: 'Cancel',
            onClick: () => setShowDialog(false),
          },
        ]}
      />

      <Modal
        title='Example Modal'
        isOpen={showModal()}
        onClose={() => setShowModal(false)}
      >
        <div>
          <p>This is a modal dialog with custom content.</p>
          <div style='margin: 16px 0;'>
            <ProgressBar value={75} animate />
            <p style='margin-top: 8px;'>Animated progress bar</p>
          </div>
          <div style='margin: 16px 0;'>
            <ProgressBar value={45} error />
            <p style='margin-top: 8px;'>Error state progress bar</p>
          </div>
          <div style='margin: 16px 0;'>
            <ProgressBar value={60} paused />
            <p style='margin-top: 8px;'>Paused progress bar</p>
          </div>
          <div style='margin: 16px 0;'>
            <ProgressBar marquee />
            <p style='margin-top: 8px;'>Marquee progress bar (indeterminate)</p>
          </div>
          <div style='display: flex; gap: 8px; justify-content: flex-end; margin-top: 20px;'>
            <Button variant='default' onClick={() => setShowModal(false)}>
              Close Modal
            </Button>
          </div>
        </div>
      </Modal>

      <Dialog
        title='Simple Dialog'
        isOpen={false}
        onClose={() => {}}
        width='350px'
      >
        <p>This is a simple dialog component.</p>
      </Dialog>

      {showImageModal() && (
        <ImageViewer
          title='Modal Image Carousel'
          isModal={true}
          imageSrc={[
            'https://picsum.photos/1200/800?random=10',
            'https://picsum.photos/1200/800?random=11',
            'https://picsum.photos/1200/800?random=12',
            'https://picsum.photos/1200/800?random=13',
            'https://picsum.photos/1200/800?random=14',
          ]}
          imageAlt={[
            'Modal sample image 1',
            'Modal sample image 2',
            'Modal sample image 3',
            'Modal sample image 4',
            'Modal sample image 5',
          ]}
          width='80vw'
          height='80vh'
          onClose={() => setShowImageModal(false)}
        />
      )}

      {/* User Registration Form */}
      <Form
        title='User Registration'
        isOpen={showUserForm()}
        onClose={() => setShowUserForm(false)}
        labelWidth='140px'
        width='600px'
        fields={[
          {
            id: 'firstName',
            label: 'First Name',
            type: 'text',
            required: true,
            placeholder: 'Enter your first name',
            validation: { minLength: 2, maxLength: 50 },
          },
          {
            id: 'lastName',
            label: 'Last Name',
            type: 'text',
            required: true,
            placeholder: 'Enter your last name',
            validation: { minLength: 2, maxLength: 50 },
          },
          {
            id: 'email',
            label: 'Email Address',
            type: 'email',
            required: true,
            placeholder: 'user@example.com',
            validation: { pattern: '^[^@]+@[^@]+\\.[^@]+$' },
          },
          {
            id: 'password',
            label: 'Password',
            type: 'password',
            required: true,
            placeholder: 'Create a secure password',
            validation: { minLength: 8, maxLength: 128 },
          },
          {
            id: 'confirmPassword',
            label: 'Confirm Password',
            type: 'password',
            required: true,
            placeholder: 'Repeat your password',
          },
          {
            id: 'age',
            label: 'Age',
            type: 'number',
            required: true,
            validation: { min: 13, max: 120 },
          },
          {
            id: 'country',
            label: 'Country',
            type: 'select',
            required: true,
            options: [
              { value: 'us', label: 'United States' },
              { value: 'uk', label: 'United Kingdom' },
              { value: 'ca', label: 'Canada' },
              { value: 'de', label: 'Germany' },
              { value: 'fr', label: 'France' },
              { value: 'es', label: 'Spain' },
              { value: 'mx', label: 'Mexico' },
              { value: 'other', label: 'Other' },
            ],
          },
          {
            id: 'bio',
            label: 'Biography',
            type: 'textarea',
            placeholder: 'Tell us about yourself...',
            rows: 4,
            validation: { maxLength: 500 },
          },
          {
            id: 'newsletter',
            label: 'Subscribe to newsletter',
            type: 'checkbox',
            value: true,
          },
          {
            id: 'terms',
            label: 'I agree to the terms and conditions',
            type: 'checkbox',
            required: true,
          },
        ]}
        onSubmit={(data) => {
          console.log('User registration data:', data);
          alert('User registered successfully!\nCheck console for form data.');
          setShowUserForm(false);
        }}
      />

      {/* Contact Form */}
      <Form
        title='Contact Us'
        isOpen={showContactForm()}
        onClose={() => setShowContactForm(false)}
        labelWidth='120px'
        width='500px'
        fields={[
          {
            id: 'name',
            label: 'Name',
            type: 'text',
            required: true,
            placeholder: 'Your full name',
          },
          {
            id: 'email',
            label: 'Email',
            type: 'email',
            required: true,
            placeholder: 'your.email@example.com',
          },
          {
            id: 'phone',
            label: 'Phone',
            type: 'tel',
            placeholder: '+1 (555) 123-4567',
          },
          {
            id: 'priority',
            label: 'Priority',
            type: 'radio',
            required: true,
            options: [
              { value: 'low', label: 'Low - General inquiry' },
              { value: 'medium', label: 'Medium - Support needed' },
              { value: 'high', label: 'High - Urgent issue' },
            ],
          },
          {
            id: 'subject',
            label: 'Subject',
            type: 'text',
            required: true,
            placeholder: 'Brief description of your inquiry',
            validation: { minLength: 5, maxLength: 100 },
          },
          {
            id: 'message',
            label: 'Message',
            type: 'textarea',
            required: true,
            placeholder: 'Please provide details about your inquiry...',
            rows: 6,
            validation: { minLength: 20, maxLength: 1000 },
          },
        ]}
        buttons={[
          {
            label: 'Send Message',
            type: 'submit',
            variant: 'default',
          },
          {
            label: 'Cancel',
            type: 'button',
            onClick: () => setShowContactForm(false),
          },
        ]}
        onSubmit={(data) => {
          console.log('Contact form data:', data);
          alert('Message sent successfully!\nWe will get back to you soon.');
          setShowContactForm(false);
        }}
      />
    </div>
  );
};

export default App;
