import { Component, JSX, Show, For } from 'solid-js';
import { WindowProps } from '../types';
import { WindowHeader } from './WindowHeader';
import { cn } from '../utils/cn';
import './window.css';

export const Window: Component<WindowProps> = (props) => {
  const windowClass = () => {
    return cn(
      'window',
      {
        'active': props.active,
        'glass': props.glass,
        'is-bright': props.bright
      },
      props.class
    );
  };

  const windowBodyClass = () => {
    return cn(
      'window-body',
      {
        'has-space': props.hasSpace !== false // Default to true unless explicitly set to false
      }
    );
  };

  const windowStyle = (): JSX.CSSProperties => ({
    width: props.width,
    height: props.height,
  });

  const windowBodyStyle = (): JSX.CSSProperties => {
    // If window has a fixed height, calculate body height by subtracting title bar and status bar height
    if (props.height) {
      const titleBarHeight = '2.2rem'; // Standard title bar height in 7.css
      const statusBarHeight = props.statusBar ? '1.5rem' : '0rem'; // Status bar height when present
      return {
        height: `calc(100% - ${titleBarHeight} - ${statusBarHeight})`
      };
    }
    return {};
  };

  const statusBarClass = () => cn('status-bar');

  return (
    <div class={windowClass()} style={windowStyle()}>
      <Show when={props.title || props.onMinimize || props.onMaximize || props.onClose}>
        <WindowHeader 
          title={props.title}
          active={props.active}
          buttons={[
            ...(props.onMinimize ? [{ type: 'minimize' as const, onClick: props.onMinimize, 'aria-label': 'Minimize' }] : []),
            ...(props.onMaximize ? [{ type: 'maximize' as const, onClick: props.onMaximize, 'aria-label': 'Maximize' }] : []),
            ...(props.onClose ? [{ type: 'close' as const, onClick: props.onClose, 'aria-label': 'Close' }] : [])
          ]}
        />
      </Show>
      <div class={windowBodyClass()} style={windowBodyStyle()}>
        {props.children}
      </div>
      <Show when={props.statusBar}>
        <div class={statusBarClass()}>
          <For each={props.statusBar?.fields}>
            {(field) => (
              <div class={cn('status-bar-field')}>
                {field.content}
              </div>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
};