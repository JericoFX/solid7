import { Component, For, Show, createSignal } from 'solid-js';
import { cn } from '../utils/cn';
import { MenuItem } from '../types';

export interface NavBarItem extends MenuItem {
  children?: MenuItem[];
}

export interface NavBarProps {
  items: NavBarItem[];
  class?: string;
}

const NavBarItemComponent: Component<{ item: NavBarItem }> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const hasChildren = () => props.item.children && props.item.children.length > 0;
  
  const handleClick = () => {
    if (!props.item.disabled) {
      if (hasChildren()) {
        setIsOpen(!isOpen());
      } else {
        props.item.onClick?.();
      }
    }
  };

  const handleMouseEnter = () => {
    if (hasChildren() && !props.item.disabled) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (hasChildren()) {
      setIsOpen(false);
    }
  };

  return (
    <li 
      role="menuitem"
      tabindex={props.item.disabled ? -1 : 0}
      aria-disabled={props.item.disabled}
      aria-haspopup={hasChildren()}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      class={cn({ 'has-children': hasChildren() })}
    >
      {props.item.label}
      <Show when={hasChildren() && isOpen()}>
        <ul role="menu" class="can-hover">
          <For each={props.item.children}>
            {(childItem) => (
              <li 
                role="menuitem" 
                class={cn({ 'has-divider': childItem.divider })}
                aria-disabled={childItem.disabled}
                tabindex={childItem.disabled ? -1 : 0}
              >
                <button 
                  type="button" 
                  disabled={childItem.disabled}
                  onClick={() => !childItem.disabled && childItem.onClick?.()}
                >
                  {childItem.label}
                </button>
                <Show when={childItem.children && childItem.children.length > 0}>
                  <ul role="menu">
                    <For each={childItem.children}>
                      {(grandchildItem) => (
                        <li 
                          role="menuitem" 
                          class={cn({ 'has-divider': grandchildItem.divider })}
                          aria-disabled={grandchildItem.disabled}
                          tabindex={grandchildItem.disabled ? -1 : 0}
                        >
                          <button 
                            type="button" 
                            disabled={grandchildItem.disabled}
                            onClick={() => !grandchildItem.disabled && grandchildItem.onClick?.()}
                          >
                            {grandchildItem.label}
                          </button>
                        </li>
                      )}
                    </For>
                  </ul>
                </Show>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </li>
  );
};

export const NavBar: Component<NavBarProps> = (props) => {
  const navClass = () => cn('can-hover', props.class);

  return (
    // 7.css menubar styling is applied automatically to ul[role=menubar]
    <ul role="menubar" class={navClass()}>
      <For each={props.items}>
        {(item) => <NavBarItemComponent item={item} />}
      </For>
    </ul>
  );
};