import { Component, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { cn } from '../utils/cn';
import './dialog.css';

export interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  class?: string;
  children?: any;
}

export const Modal: Component<ModalProps> = (props) => {
  const modalClass = () => cn('window dialog-box', props.class);
  
  const handleOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      props.onClose?.();
    }
  };

  return (
    <Show when={props.isOpen}>
      <Portal>
        <div class="dialog-overlay" onClick={handleOverlayClick}>
          <div class={modalClass()}>
            <Show when={props.title}>
              <div class="title-bar">
                <div class="title-bar-text">{props.title}</div>
                <Show when={props.onClose}>
                  <div class="title-bar-controls">
                    <button aria-label="Close" onClick={props.onClose}></button>
                  </div>
                </Show>
              </div>
            </Show>
            <div class="window-body dialog-content">
              {props.children}
            </div>
          </div>
        </div>
      </Portal>
    </Show>
  );
};