import { Component, Show, splitProps } from 'solid-js';
import { cn } from '../utils/cn';

export interface TextBoxProps {
  label?: string;
  labelPosition?: 'left' | 'top';
  class?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  [key: string]: any;
}

export const TextBox: Component<TextBoxProps> = (props) => {
  const [local, others] = splitProps(props, ['label', 'labelPosition', 'class', 'type']);
  
  const containerClass = () => cn(
    'field-row',
    {
      'field-row-stacked': local.labelPosition === 'top'
    },
    local.class
  );

  const inputType = () => local.type || 'text';

  return (
    <div class={containerClass()}>
      <Show when={local.label}>
        <label>{local.label}</label>
      </Show>
      <input 
        type={inputType()}
        {...others}
      />
    </div>
  );
};