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
  statusBar?: {
    fields: Array<{
      id: string;
      content: JSX.Element | string;
    }>;
  };
}

export interface ButtonProps
  extends Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, 'class'> {
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
  icon?: string; // URL or path to icon image
  onClick?: () => void;
  children?: MenuItem[];
}

export interface MenuProps extends BaseProps {
  items: MenuItem[];
}

export interface SliderProps
  extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'type' | 'class'> {
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

export interface CheckboxProps
  extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'type' | 'class'> {
  class?: string;
  label?: string;
}

export interface RadioProps
  extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'type' | 'class'> {
  class?: string;
  label?: string;
  name: string;
  disabled?: boolean;
}

export interface ScrollbarProps extends BaseProps {
  height?: string;
  width?: string;
}

export interface SelectProps
  extends Omit<JSX.SelectHTMLAttributes<HTMLSelectElement>, 'class'> {
  class?: string;
  options: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
}

export interface SearchBoxProps
  extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'type' | 'class'> {
  class?: string;
}

export interface ImageViewerProps {
  class?: string;
  width?: string;
  height?: string;
  title?: string;
  imageSrc?: string | string[];
  imageAlt?: string | string[];
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  showToolbar?: boolean;
  isModal?: boolean;
}

export interface FileItem {
  name: string;
  type: 'file' | 'folder';
  size?: number;
  modified?: Date;
  icon?: string;
  path?: string;
}

export interface FileExplorerProps extends BaseProps {
  data?: FileItem[];
  currentPath?: string;
  viewMode?: 'icons' | 'details';
  showHidden?: boolean;
  showSearch?: boolean;
  searchPlaceholder?: string;
  width?: string;
  height?: string;
  onNavigate?: (path: string, item: FileItem) => void;
  onFileSelect?: (item: FileItem, selectedItems: string[]) => void;
  onFileOpen?: (item: FileItem) => void;
  onSearchChange?: (searchTerm: string, filteredItems: FileItem[]) => void;
}

export interface NotepadProps extends BaseProps {
  width?: string;
  height?: string;
  title?: string;
  content?: string;
  onContentChange?: (content: string) => void;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  fileName?: string;
  wordWrap?: boolean;
  showStatusBar?: boolean;
}

export interface NotepadMenuBarProps extends BaseProps {
  onNew?: () => void;
  onOpen?: () => void;
  onSave?: () => void;
  onSaveAs?: () => void;
  onExit?: () => void;
  onUndo?: () => void;
  onCut?: () => void;
  onCopy?: () => void;
  onPaste?: () => void;
  onFind?: () => void;
  onReplace?: () => void;
  onSelectAll?: () => void;
  onWordWrap?: () => void;
  onFont?: () => void;
  onStatusBar?: () => void;
  onAbout?: () => void;
  hasUndo?: boolean;
  hasSelection?: boolean;
  hasClipboard?: boolean;
  wordWrap?: boolean;
  showStatusBar?: boolean;
}

export interface FormField {
  id: string;
  label: string;
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'tel'
    | 'textarea'
    | 'select'
    | 'checkbox'
    | 'radio';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string | number | boolean;
  options?: Array<{ value: string | number; label: string }>; // For select/radio
  rows?: number; // For textarea
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    min?: number;
    max?: number;
  };
}

export interface FormButton {
  label: string;
  type?: 'submit' | 'button' | 'reset';
  variant?: 'default' | 'normal';
  onClick?: (data: Record<string, any>) => void;
  disabled?: boolean;
}

export interface FormProps extends BaseProps {
  title: string;
  fields: FormField[];
  buttons?: FormButton[];
  isOpen: boolean;
  onClose?: () => void;
  onSubmit?: (data: Record<string, any>) => void;
  width?: string;
  height?: string;
  labelWidth?: string; // CSS width for consistent label alignment
}
