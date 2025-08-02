import { Component, createSignal, For, Show } from 'solid-js';
import { TabProps } from '../types';
import { cn } from '../utils/cn';

export const Tabs: Component<TabProps> = (props) => {
  const [activeTab, setActiveTab] = createSignal(props.activeTab || props.tabs[0]?.id);

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
      {/* 7.css requires menu[role=tablist] not div[role=tablist] */}
      <menu role="tablist" class={tabListClass()}>
        <For each={props.tabs}>
          {(tab) => (
            <button
              role="tab"
              aria-selected={activeTab() === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && handleTabClick(tab.id)}
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
          >
            {tab().content}
          </div>
        )}
      </Show>
    </div>
  );
};