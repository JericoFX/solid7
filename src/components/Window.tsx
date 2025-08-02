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

  return (
    <div class={windowClass()} style={windowStyle()}>
      <Show when={props.title || props.onMinimize || props.onMaximize || props.onClose}>
        <WindowHeader 
          title={props.title}
          buttons={[
            ...(props.onMinimize ? [{ type: 'minimize' as const, onClick: props.onMinimize, 'aria-label': 'Minimize' }] : []),
            ...(props.onMaximize ? [{ type: 'maximize' as const, onClick: props.onMaximize, 'aria-label': 'Maximize' }] : []),
            ...(props.onClose ? [{ type: 'close' as const, onClick: props.onClose, 'aria-label': 'Close' }] : [])
          ]}
        />
      </Show>
      <div class={windowBodyClass()}>
        {props.children}
      </div>
    </div>
  );
};