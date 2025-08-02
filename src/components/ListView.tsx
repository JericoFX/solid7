import { Component, For } from 'solid-js';
import clsx from 'clsx';

export interface ListViewItem {
  id: string;
  content: string;
  selected?: boolean;
  disabled?: boolean;
}

export interface ListViewProps {
  items: ListViewItem[];
  onSelectionChange?: (selectedId: string) => void;
  hasShadow?: boolean;
  hasHover?: boolean;
  class?: string;
}

export const ListView: Component<ListViewProps> = (props) => {
  const listClass = () => clsx(
    {
      'has-shadow': props.hasShadow,
      'has-hover': props.hasHover
    },
    props.class
  );

  const handleItemClick = (item: ListViewItem) => {
    if (!item.disabled) {
      props.onSelectionChange?.(item.id);
    }
  };

  return (
    <div role="listbox" class={listClass()}>
      <For each={props.items}>
        {(item) => (
          <div 
            role="option"
            aria-selected={item.selected}
            aria-disabled={item.disabled}
            onClick={() => handleItemClick(item)}
          >
            {item.content}
          </div>
        )}
      </For>
    </div>
  );
};