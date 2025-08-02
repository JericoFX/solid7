import { Component, Show, splitProps } from 'solid-js';
import clsx from 'clsx';

export interface TextAreaProps {
  label?: string;
  labelPosition?: 'left' | 'top';
  class?: string;
  rows?: number;
  cols?: number;
  [key: string]: any;
}

export const TextArea: Component<TextAreaProps> = (props) => {
  const [local, others] = splitProps(props, ['label', 'labelPosition', 'class', 'rows', 'cols']);
  
  const containerClass = () => clsx(
    'field-row',
    {
      'field-row-stacked': local.labelPosition === 'top'
    },
    local.class
  );

  return (
    <div class={containerClass()}>
      <Show when={local.label}>
        <label>{local.label}</label>
      </Show>
      <textarea 
        rows={local.rows || 4}
        cols={local.cols}
        {...others}
      />
    </div>
  );
};