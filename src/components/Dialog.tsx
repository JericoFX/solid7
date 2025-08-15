import { Component, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { cn } from '../utils/cn';
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
  const dialogClass = () => cn('dialog', props.class);

  const handleOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      props.onClose?.();
    }
  };

  return (
    <Show when={props.isOpen}>
      <Portal>
        <div class={cn('dialog-overlay')} onClick={handleOverlayClick}>
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
      </Portal>
    </Show>
  );
};