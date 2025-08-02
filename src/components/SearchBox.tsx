import { Component, splitProps } from 'solid-js';
import { cn } from '../utils/cn';
import { SearchBoxProps } from '../types';

export const SearchBox: Component<SearchBoxProps> = (props) => {
  const [local, others] = splitProps(props, ['class']);

  const searchClass = () => {
    return cn('searchbox', local.class);
  };

  return (
    <div class={searchClass()}>
      <input 
        type="search"
        {...others}
      />
      <button aria-label="search"></button>
    </div>
  );
};