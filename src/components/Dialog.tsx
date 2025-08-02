import { Component, Show } from 'solid-js';
import clsx from 'clsx';
import { Window } from './Window';

export interface DialogProps {
  title?: string;
  isOpen: boolean;
  onClose?: () => void;
  width?: string;
  height?: string;
  class?: string;
  children?: any;
}

export const Dialog: Component<DialogProps> = (props) => {
  const dialogClass = () => clsx('dialog', props.class);

  return (
    <Show when={props.isOpen}>
      <div class="dialog-overlay">
        <div class={dialogClass()}>
          <Window
            title={props.title}
            width={props.width || '400px'}
            height={props.height}
            onClose={props.onClose}
            active
          >
            {props.children}
          </Window>
        </div>
      </div>
    </Show>
  );
};