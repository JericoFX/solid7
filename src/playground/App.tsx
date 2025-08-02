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
  Dialog,
  Modal,
  ImageViewer,
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
  const [selectedListItem, setSelectedListItem] = createSignal('item1');
  const [textBoxValue, setTextBoxValue] = createSignal('');
  const [textAreaValue, setTextAreaValue] = createSignal('');
  const [sortColumn, setSortColumn] = createSignal<string>('');
  const [sortDirection, setSortDirection] = createSignal<'asc' | 'desc'>('asc');

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
              <ProgressBar value={75} animate />
            </div>

            <div>
              <label>Error Progress</label>
              <ProgressBar value={30} error />
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
                        sorted: sortColumn() === 'name' ? sortDirection() : undefined
                      },
                      { 
                        key: 'type', 
                        title: 'Type', 
                        sortable: true,
                        sorted: sortColumn() === 'type' ? sortDirection() : undefined
                      },
                      { key: 'size', title: 'Size', width: '80px' },
                      {
                        key: 'modified',
                        title: 'Date Modified',
                        sortable: true,
                        sorted: sortColumn() === 'modified' ? sortDirection() : undefined
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
                    onDoubleClick={(item) => alert(`Double-clicked: ${item.name}`)}
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
              Image viewer component with zoom controls and fit-to-window functionality.
            </p>
            
            <div style='display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 20px;'>
              <ImageViewer 
                title='Sample Image Viewer'
                width='400px'
                height='300px'
                imageSrc='https://picsum.photos/800/600'
                imageAlt='Random sample image'
                onClose={() => alert('Close image viewer')}
                onMinimize={() => alert('Minimize image viewer')}
                onMaximize={() => alert('Maximize image viewer')}
              />
              
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
                <li>Zoom In/Out controls</li>
                <li>Actual size (1:1) button</li>
                <li>Fit to window functionality</li>
                <li>Toolbar with zoom level indicator</li>
                <li>Error handling for failed image loads</li>
                <li>Placeholder when no image is provided</li>
                <li>Proper 7.css window styling</li>
              </ul>
            </div>
            
            <div style='margin-bottom: 20px;'>
              <ImageViewer 
                title='Large Image Test'
                width='500px'
                height='400px'
                imageSrc='https://picsum.photos/1920/1080'
                imageAlt='Large sample image for testing zoom'
                onClose={() => alert('Close large image viewer')}
                onMinimize={() => alert('Minimize large image viewer')}
                onMaximize={() => alert('Maximize large image viewer')}
              />
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
      <Window title='Solid 7.CSS Playground' width='100vw' active glass>
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
                  <div style='padding: 8px;'>
                    <Button variant='default'>Action Button</Button>
                  </div>
                </div>
              </Window>
            </div>
          </div>
        </div>

        <StatusBar fields={statusFields} />
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
    </div>
  );
};

export default App;
