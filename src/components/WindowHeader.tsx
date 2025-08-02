import { Component, Show, For } from 'solid-js';
import { cn } from '../utils/cn';

export interface WindowHeaderButton {
  type: 'minimize' | 'maximize' | 'close' | 'restore' | 'help';
  onClick: () => void;
  'aria-label': string;
}

export interface WindowHeaderProps {
  title?: string;
  buttons?: WindowHeaderButton[];
  class?: string;
  active?: boolean;
}

export const WindowHeader: Component<WindowHeaderProps> = (props) => {
  const headerClass = () => cn(
    'title-bar',
    {
      'active': props.active
    },
    props.class
  );

  const getButtonClass = (type: WindowHeaderButton['type']) => {
    return cn(`is-${type}`);
  };

  return (
    <div class={headerClass()}>
      <Show when={props.title}>
        <div class="title-bar-text">{props.title}</div>
      </Show>
      <Show when={props.buttons && props.buttons.length > 0}>
        <div class="title-bar-controls">
          <For each={props.buttons}>
            {(button) => (
              <button 
                class={getButtonClass(button.type)}
                aria-label={button['aria-label']}
                onClick={button.onClick}
              />
            )}
          </For>
        </div>
      </Show>
    </div>
  );
};