import { Component, For, Show, createMemo, createSignal } from 'solid-js';
import { cn } from '../utils/cn';
import { MenuItem } from '../types';

export interface NavBarItem extends MenuItem {
  children?: MenuItem[];
}

export interface NavBarProps {
  items: NavBarItem[];
  class?: string;
}

const DropdownMenu: Component<{
  items: MenuItem[];
  onItemClick?: (item: MenuItem) => void;
}> = (props) => {
  return (
    <ul role='menu' class={cn({ 'user-select': 'none' })}>
      <For each={props.items}>
        {(item) => (
          <li
            role='menuitem'
            class={cn({ 'has-divider': item.divider, 'user-select': 'none' })}
            aria-disabled={item.disabled}
          >
            <Show when={!item.divider}>
              <button
                type='button'
                disabled={item.disabled}
                onClick={() => {
                  if (!item.disabled) {
                    item.onClick?.();
                    props.onItemClick?.(item);
                  }
                }}
              >
                <Show when={item.icon}>
                  <img src={item.icon} alt='' width='18' height='18' />
                </Show>
                {item.label}
              </button>
            </Show>
          </li>
        )}
      </For>
    </ul>
  );
};

const NavBarItemComponent: Component<{ item: NavBarItem }> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const hasChildren = createMemo(
    () => props.item.children && props.item.children.length > 0
  );

  const handleClick = () => {
    if (!props.item.disabled) {
      if (hasChildren()) {
        setIsOpen(!isOpen());
      } else {
        props.item.onClick?.();
      }
    }
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <li
      role='menuitem'
      tabindex={props.item.disabled ? -1 : 0}
      aria-disabled={props.item.disabled}
      aria-haspopup={hasChildren()}
      aria-expanded={hasChildren() ? isOpen() : undefined}
      onClick={handleClick}
      onFocusOut={(e) => {
        // Close menu if focus moves outside the menu item and its children
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsOpen(false);
        }
      }}
    >
      <Show when={props.item.icon}>
        <img src={props.item.icon} alt='' width='18' height='18' />
      </Show>
      {props.item.label}
      <Show when={hasChildren() && isOpen()}>
        <DropdownMenu
          items={props.item.children!}
          onItemClick={handleItemClick}
        />
      </Show>
    </li>
  );
};

export const NavBar: Component<NavBarProps> = (props) => {
  const navClass = createMemo(() => cn('can-hover', props.class));

  return (
    // 7.css menubar styling is applied automatically to ul[role=menubar]
    <ul role='menubar' style={{ 'user-select': 'none' }} class={navClass()}>
      <For each={props.items}>
        {(item) => <NavBarItemComponent item={item} />}
      </For>
    </ul>
  );
};
