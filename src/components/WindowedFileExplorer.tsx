import { Component, createSignal } from 'solid-js';
import { FileExplorerProps } from '../types';
import { cn } from '../utils/cn';
import { Window } from './Window';
import { FileExplorer } from './FileExplorer';
import './WindowedFileExplorer.css';

export interface WindowedFileExplorerProps extends FileExplorerProps {
  windowTitle?: string;
  windowWidth?: string;
  windowHeight?: string;
  active?: boolean;
  onWindowClose?: () => void;
  onWindowMinimize?: () => void;
  onWindowMaximize?: () => void;
}

export const WindowedFileExplorer: Component<WindowedFileExplorerProps> = (
  props
) => {
  const [_, setIsMinimized] = createSignal(false);

  // Generate window title based on current path
  const windowTitle = () => {
    if (props.windowTitle) return props.windowTitle;

    const path = props.currentPath;
    if (!path || path === '') {
      return 'Computer - Windows Explorer';
    }
    return `${path} - Windows Explorer`;
  };

  const handleMinimize = () => {
    setIsMinimized(true);
    props.onWindowMinimize?.();
  };

  const handleMaximize = () => {
    setIsMinimized(false);
    props.onWindowMaximize?.();
  };

  const handleClose = () => {
    props.onWindowClose?.();
  };

  return (
    <Window
      title={windowTitle()}
      width={props.windowWidth || '800px'}
      height={props.windowHeight}
      active={props.active !== false}
      hasSpace={false}
      class={cn('windowed-file-explorer', props.class)}
      onClose={handleClose}
      onMinimize={handleMinimize}
      onMaximize={handleMaximize}
    >
      <FileExplorer
        data={props.data}
        currentPath={props.currentPath}
        viewMode={props.viewMode}
        showHidden={props.showHidden}
        showSearch={props.showSearch}
        searchPlaceholder={props.searchPlaceholder}
        width='100%'
        height='100%'
        onNavigate={props.onNavigate}
        onFileSelect={props.onFileSelect}
        onFileOpen={props.onFileOpen}
        onSearchChange={props.onSearchChange}
      />
    </Window>
  );
};
