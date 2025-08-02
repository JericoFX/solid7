import { Component, For, splitProps } from 'solid-js';
import { SelectProps } from '../types';

export const Select: Component<SelectProps> = (props) => {
  const [local, others] = splitProps(props, ['options']);

  return (
    <select {...others}>
      <For each={local.options}>
        {(option) => (
          <option 
            value={option.value} 
            disabled={option.disabled}
          >
            {option.label}
          </option>
        )}
      </For>
    </select>
  );
};