import { Component, Show, splitProps } from 'solid-js';
import { RadioProps } from '../types';
import { cn } from '../utils/cn';

export const Radio: Component<RadioProps> = (props) => {
  const [local, others] = splitProps(props, [
    'label',
    'class',
    'id',
    'disabled',
  ]);

  const radioId =
    local.id || `radio-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <>
      <input
        type='radio'
        id={radioId}
        class={cn(local.class)}
        disabled={local.disabled}
        {...others}
      />
      <Show when={local.label}>
        <label for={radioId}>{local.label}</label>
      </Show>
    </>
  );
};
