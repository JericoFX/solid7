import { Component, JSX, Show } from 'solid-js';
import { WindowProps } from '../types';
import { WindowHeader } from './WindowHeader';
import { cn } from '../utils/cn';

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
    // If window has a fixed height, calculate body height by subtracting title bar height
    if (props.height) {
      return {
        height: 'calc(100% - 2.2rem)' // Standard title bar height is 2.2rem in 7.css
      };
    }
    return {};
  };

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
    </div>
  );
};