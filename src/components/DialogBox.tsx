import { Component, Show, For } from 'solid-js';
import { cn } from '../utils/cn';
import { Window } from './Window';
import './dialog.css';

export interface DialogButton {
  id: string;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'normal';
  disabled?: boolean;
}

export interface DialogBoxProps {
  title?: string;
  message?: string;
  icon?: 'info' | 'warning' | 'error' | 'question';
  buttons?: DialogButton[];
  isOpen: boolean;
  onClose?: () => void;
  class?: string;
  children?: any;
}

export const DialogBox: Component<DialogBoxProps> = (props) => {
  const dialogClass = () => cn('dialog-box', props.class);
  
  const getIconSymbol = (icon: DialogBoxProps['icon']) => {
    switch (icon) {
      case 'info': return 'ℹ️';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      case 'question': return '❓';
      default: return '';
    }
  };

  const handleOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      props.onClose?.();
    }
  };

  return (
    <Show when={props.isOpen}>
      <div class="dialog-overlay" onClick={handleOverlayClick}>
        <div class={dialogClass()}>
          <Window
            title={props.title || 'Dialog'}
            onClose={props.onClose}
            active
            width="400px"
          >
            <div class="dialog-content">
              <Show when={props.icon || props.message}>
                <div class="dialog-message">
                  <Show when={props.icon}>
                    <span class="dialog-icon">{getIconSymbol(props.icon)}</span>
                  </Show>
                  <Show when={props.message}>
                    <span class="dialog-text">{props.message}</span>
                  </Show>
                </div>
              </Show>
              
              <Show when={props.children}>
                <div class="dialog-body">
                  {props.children}
                </div>
              </Show>
              
              <Show when={props.buttons && props.buttons.length > 0}>
                <div class="dialog-buttons">
                  <For each={props.buttons}>
                    {(button) => (
                      <button
                        class={cn({ 'default': button.variant === 'default' })}
                        disabled={button.disabled}
                        onClick={button.onClick}
                      >
                        {button.label}
                      </button>
                    )}
                  </For>
                </div>
              </Show>
            </div>
          </Window>
        </div>
      </div>
    </Show>
  );
};