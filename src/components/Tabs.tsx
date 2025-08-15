import { Component, createSignal, For, Show, createEffect } from 'solid-js';
import { TabProps } from '../types';
import { cn } from '../utils/cn';

export const Tabs: Component<TabProps> = (props) => {
  const [activeTab, setActiveTab] = createSignal(props.activeTab || props.tabs[0]?.id);

  // Sync internal state with external prop changes
  createEffect(() => {
    if (props.activeTab && props.activeTab !== activeTab()) {
      setActiveTab(props.activeTab);
    }
  });

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    props.onTabChange?.(tabId);
  };

  const tabListClass = () => {
    return cn(
      {
        'justified': props.justified
      },
      props.class
    );
  };

  const currentTab = () => props.tabs.find(tab => tab.id === activeTab());

  return (
    <div>
      {/* 7.css requires menu[role=tablist] */}
      <menu role="tablist" class={tabListClass()}>
        <For each={props.tabs}>
          {(tab) => (
            <button
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={activeTab() === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
              disabled={tab.disabled}
              tabIndex={activeTab() === tab.id ? 0 : -1}
              onClick={() => !tab.disabled && handleTabClick(tab.id)}
              onKeyDown={(e) => {
                if (!tab.disabled && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  handleTabClick(tab.id);
                }
              }}
            >
              {tab.label}
            </button>
          )}
        </For>
      </menu>
      <Show when={currentTab()}>
        {(tab) => (
          <div 
            role="tabpanel" 
            id={`tabpanel-${tab().id}`}
            aria-labelledby={`tab-${tab().id}`}
            tabIndex={0}
          >
            {tab().content}
          </div>
        )}
      </Show>
    </div>
  );
};