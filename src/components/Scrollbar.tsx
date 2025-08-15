import { Component, Show, splitProps } from 'solid-js';
import { cn } from '../utils/cn';
import { ScrollbarProps } from '@/types';

export const Scrollbar: Component<ScrollbarProps> = (props) => {
  const [local, others] = splitProps(props, [
    'class',
    'children',
    'height',
    'width',
  ]);

  return (
    <div
      class={cn('has-scrollbar', local.class)}
      style={{
        height: local.height || '150px',
        width: local.width || '300px',
        overflow: 'auto',
      }}
      {...others}
    >
      <Show when={local.children}>{local.children}</Show>
    </div>
  );
};
