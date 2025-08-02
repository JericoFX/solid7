import { JSX } from 'solid-js';

export interface BaseProps {
  class?: string;
  children?: JSX.Element;
}

export interface WindowProps extends BaseProps {
  title?: string;
  width?: string;
  height?: string;
  active?: boolean;
  glass?: boolean;
  bright?: boolean;
  hasSpace?: boolean; // Defaults to true, set to false to remove padding
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
}

export interface ButtonProps extends Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, 'class'> {
  class?: string;
  variant?: 'default' | 'normal';
}

export interface ProgressBarProps extends BaseProps {
  value?: number;
  max?: number;
  min?: number;
  paused?: boolean;
  error?: boolean;
  animate?: boolean;
  marquee?: boolean;
}

export interface TabProps extends BaseProps {
  tabs: Array<{
    id: string;
    label: string;
    disabled?: boolean;
    content: JSX.Element;
  }>;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  justified?: boolean;
}

export interface MenuItem {
  id: string;
  label: string;
  disabled?: boolean;
  divider?: boolean;
  onClick?: () => void;
  children?: MenuItem[];
}

export interface MenuProps extends BaseProps {
  items: MenuItem[];
}

export interface SliderProps extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'type' | 'class'> {
  class?: string;
  hasBoxIndicator?: boolean;
  vertical?: boolean;
}

export interface StatusBarProps extends BaseProps {
  fields: Array<{
    id: string;
    content: JSX.Element | string;
  }>;
}

export interface CheckboxProps extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'type' | 'class'> {
  class?: string;
  label?: string;
}

export interface RadioProps extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'type' | 'class'> {
  class?: string;
  label?: string;
  name: string;
}

export interface SelectProps extends Omit<JSX.SelectHTMLAttributes<HTMLSelectElement>, 'class'> {
  class?: string;
  options: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
}

export interface SearchBoxProps extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'type' | 'class'> {
  class?: string;
}