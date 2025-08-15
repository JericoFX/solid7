import { Component, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { Window } from './Window';
import { cn } from '../utils/cn';
import './dialog.css';

export interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  width?: string;
  height?: string;
  class?: string;
  children?: any;
}

export const Modal: Component<ModalProps> = (props) => {
  const modalClass = () => cn('dialog-box', props.class);
  
  const handleOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      props.onClose?.();
    }
  };

  return (
    <Show when={props.isOpen}>
      <Portal>
        <div class={cn('dialog-overlay')} onClick={handleOverlayClick}>
          <div class={modalClass()}>
            <Window
              title={props.title}
              width={props.width || '400px'}
              height={props.height}
              onClose={props.onClose}
              active
            >
              <div class={cn('dialog-content')}>
                {props.children}
              </div>
            </Window>
          </div>
        </div>
      </Portal>
    </Show>
  );
};