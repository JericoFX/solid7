import { Component, For } from 'solid-js';
import { StatusBarProps } from '../types';
import { cn } from '../utils/cn';

export const StatusBar: Component<StatusBarProps> = (props) => {
  const statusBarClass = () => {
    return cn('status-bar', props.class);
  };

  return (
    <div class={statusBarClass()}>
      <For each={props.fields}>
        {(field) => (
          <div class="status-bar-field">
            {field.content}
          </div>
        )}
      </For>
    </div>
  );
};