import { Component } from 'solid-js';
// Import from the local package
import { Button, Window, WindowHeader, Checkbox, TextBox } from 'solid-7css';

const App: Component = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Solid7 Package Test</h1>
      
      <Window width="400px" class="test-window">
        <WindowHeader 
          title="Test Window" 
          buttons={[
            {
              type: 'close',
              onClick: () => console.log('Close clicked'),
              'aria-label': 'Close window'
            }
          ]}
        />
        <div style={{ padding: '10px' }}>
          <p>Testing solid-7css package components:</p>
          
          <div style={{ margin: '10px 0' }}>
            <Button>Test Button</Button>
          </div>
          
          <div style={{ margin: '10px 0' }}>
            <Checkbox>Test Checkbox</Checkbox>
          </div>
          
          <div style={{ margin: '10px 0' }}>
            <TextBox placeholder="Test TextBox" />
          </div>
        </div>
      </Window>
    </div>
  );
};

export default App;