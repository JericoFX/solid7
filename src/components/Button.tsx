import { Component, mergeProps, splitProps } from 'solid-js';
import clsx from 'clsx';
import { ButtonProps } from '../types';

export const Button: Component<ButtonProps> = (props) => {
  const merged = mergeProps({ variant: 'normal' as const }, props);
  const [local, others] = splitProps(merged, ['variant', 'class', 'children']);

  const buttonClass = () => {
    return clsx(
      {
        'default': local.variant === 'default'
      },
      local.class
    );
  };

  return (
    <button class={buttonClass()} {...others}>
      {local.children}
    </button>
  );
};