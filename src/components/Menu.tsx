import { Component, For, Show } from 'solid-js';
import { cn } from '../utils/cn';
import { MenuProps, MenuItem } from '../types';

const MenuItemComponent: Component<{ item: MenuItem }> = (props) => {
  const hasChildren = () => props.item.children && props.item.children.length > 0;
  
  return (
    <li 
      role="menuitem" 
      class={cn({ 'has-divider': props.item.divider })}
      aria-disabled={props.item.disabled}
      aria-haspopup={hasChildren()}
      tabindex={props.item.divider ? -1 : (props.item.disabled ? -1 : 0)}
    >
      <Show when={!props.item.divider}>
        <Show when={props.item.icon}>
          <img src={props.item.icon} alt="" width="18" height="18" />
        </Show>
        <Show when={!hasChildren()}>
          <button 
            type="button" 
            disabled={props.item.disabled}
            onClick={() => !props.item.disabled && props.item.onClick?.()}
          >
            {props.item.label}
          </button>
        </Show>
        <Show when={hasChildren()}>
          {props.item.label}
        </Show>
      </Show>
      <Show when={hasChildren()}>
        <ul role="menu">
          <For each={props.item.children}>
            {(childItem) => <MenuItemComponent item={childItem} />}
          </For>
        </ul>
      </Show>
    </li>
  );
};

export const Menu: Component<MenuProps> = (props) => {
  const menuClass = () => cn('can-hover', props.class);

  return (
    <ul role="menu" class={menuClass()}>
      <For each={props.items}>
        {(item) => <MenuItemComponent item={item} />}
      </For>
    </ul>
  );
};