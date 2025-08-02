import { Component, Show, splitProps } from 'solid-js';
import { CheckboxProps } from '../types';
import { cn } from '../utils/cn';

export const Checkbox: Component<CheckboxProps> = (props) => {
  const [local, others] = splitProps(props, ['label', 'class', 'id']);

  const checkboxId = local.id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <>
      <input 
        type="checkbox" 
        id={checkboxId}
        class={cn(local.class)}
        {...others}
      />
      <Show when={local.label}>
        <label for={checkboxId}>
          {local.label}
        </label>
      </Show>
    </>
  );
};