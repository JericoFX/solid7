import { Component, For, Show } from 'solid-js';
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
  const hasChildren = () => props.item.children && props.item.children.length > 0;
  
  const handleClick = () => {
    if (!props.item.disabled && !hasChildren()) {
      props.item.onClick?.();
    }
  };

  return (
    <li 
      role="menuitem"
      tabindex={props.item.disabled ? -1 : 0}
      aria-disabled={props.item.disabled}
      aria-haspopup={hasChildren()}
      onClick={handleClick}
    >
      <Show when={props.item.icon}>
        <img src={props.item.icon} alt="" width="18" height="18" />
      </Show>
      {props.item.label}
      <Show when={hasChildren()}>
        <ul role="menu">
          <For each={props.item.children}>
            {(childItem) => (
              <li 
                role="menuitem" 
                class={cn({ 'has-divider': childItem.divider })}
                aria-disabled={childItem.disabled}
                tabindex={childItem.divider ? -1 : (childItem.disabled ? -1 : 0)}
                aria-haspopup={childItem.children && childItem.children.length > 0}
              >
                <Show when={!childItem.divider}>
                  <Show when={childItem.icon}>
                    <img src={childItem.icon} alt="" width="18" height="18" />
                  </Show>
                  <Show when={!(childItem.children && childItem.children.length > 0)}>
                    <button 
                      type="button" 
                      disabled={childItem.disabled}
                      onClick={() => !childItem.disabled && childItem.onClick?.()}
                    >
                      {childItem.label}
                    </button>
                  </Show>
                  <Show when={childItem.children && childItem.children.length > 0}>
                    {childItem.label}
                  </Show>
                </Show>
                <Show when={childItem.children && childItem.children.length > 0}>
                  <ul role="menu">
                    <For each={childItem.children}>
                      {(grandchildItem) => (
                        <li 
                          role="menuitem" 
                          class={cn({ 'has-divider': grandchildItem.divider })}
                          aria-disabled={grandchildItem.disabled}
                          tabindex={grandchildItem.divider ? -1 : (grandchildItem.disabled ? -1 : 0)}
                        >
                          <Show when={!grandchildItem.divider}>
                            <Show when={grandchildItem.icon}>
                              <img src={grandchildItem.icon} alt="" width="18" height="18" />
                            </Show>
                            <button 
                              type="button" 
                              disabled={grandchildItem.disabled}
                              onClick={() => !grandchildItem.disabled && grandchildItem.onClick?.()}
                            >
                              {grandchildItem.label}
                            </button>
                          </Show>
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