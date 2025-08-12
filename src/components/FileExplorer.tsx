import { Component, createSignal, createMemo, For, Show, JSX } from 'solid-js';
import { FileExplorerProps, FileItem } from '../types';
import { cn } from '../utils/cn';
import './FileExplorer.css';

export const FileExplorer: Component<FileExplorerProps> = (props) => {
  const [selectedItems, setSelectedItems] = createSignal<string[]>([]);
  const [searchTerm, setSearchTerm] = createSignal('');
  const [sortBy, setSortBy] = createSignal<'name' | 'type' | 'size' | 'modified'>('name');
  const [sortDirection, setSortDirection] = createSignal<'asc' | 'desc'>('asc');
  
  // Navigation state
  const [navigationHistory, setNavigationHistory] = createSignal<string[]>(['']);
  const [historyIndex, setHistoryIndex] = createSignal(0);
  
  // Current path from props or navigation history
  const currentPath = () => props.currentPath || navigationHistory()[historyIndex()];
  
  // Navigation functions
  const canGoBack = () => historyIndex() > 0;
  const canGoForward = () => historyIndex() < navigationHistory().length - 1;
  const canGoUp = () => {
    const path = currentPath();
    return path && path !== '' && path !== 'Computer';
  };

  // Default sample data if none provided
  const defaultData: FileItem[] = [
    { name: 'Documents', type: 'folder', modified: new Date() },
    { name: 'Pictures', type: 'folder', modified: new Date() },
    { name: 'Music', type: 'folder', modified: new Date() },
    { name: 'Videos', type: 'folder', modified: new Date() },
    { name: 'readme.txt', type: 'file', size: 1024, modified: new Date() },
    { name: 'config.ini', type: 'file', size: 512, modified: new Date() }
  ];

  const fileData = () => props.data || defaultData;

  // Filter and sort data
  const filteredData = createMemo(() => {
    let data = fileData();
    
    // Apply search filter
    const search = searchTerm().toLowerCase();
    if (search) {
      data = data.filter(item => item.name.toLowerCase().includes(search));
    }
    
    // Apply hidden files filter
    if (!props.showHidden) {
      data = data.filter(item => !item.name.startsWith('.'));
    }
    
    // Sort data
    data = [...data].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy()) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'type':
          if (a.type !== b.type) {
            comparison = a.type === 'folder' ? -1 : 1;
          } else {
            comparison = a.name.localeCompare(b.name);
          }
          break;
        case 'size':
          comparison = (a.size || 0) - (b.size || 0);
          break;
        case 'modified':
          comparison = (a.modified?.getTime() || 0) - (b.modified?.getTime() || 0);
          break;
      }
      
      return sortDirection() === 'desc' ? -comparison : comparison;
    });
    
    return data;
  });

  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return '';
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
  };

  const formatDate = (date?: Date): string => {
    if (!date) return '';
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleItemClick = (item: FileItem, event: MouseEvent) => {
    if (event.ctrlKey) {
      // Multi-select with Ctrl
      const current = selectedItems();
      if (current.includes(item.name)) {
        setSelectedItems(current.filter(name => name !== item.name));
      } else {
        setSelectedItems([...current, item.name]);
      }
    } else {
      // Single select
      setSelectedItems([item.name]);
    }
    
    props.onFileSelect?.(item, selectedItems());
  };

  const handleItemDoubleClick = (item: FileItem) => {
    if (item.type === 'folder') {
      const newPath = currentPath() ? `${currentPath()}\\${item.name}` : item.name;
      navigateToPath(newPath, item);
    } else {
      props.onFileOpen?.(item);
    }
  };

  // Navigation functions
  const navigateToPath = (newPath: string, item?: FileItem) => {
    const history = navigationHistory();
    const index = historyIndex();
    
    // Remove any forward history when navigating to a new path
    const newHistory = [...history.slice(0, index + 1), newPath];
    setNavigationHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    
    // Clear selection when navigating
    setSelectedItems([]);
    
    // Call the onNavigate callback
    if (item) {
      props.onNavigate?.(newPath, item);
    }
  };

  const handleGoBack = () => {
    if (canGoBack()) {
      const newIndex = historyIndex() - 1;
      setHistoryIndex(newIndex);
      setSelectedItems([]);
      const path = navigationHistory()[newIndex];
      // Create a dummy folder item for the path
      const pathItem: FileItem = {
        name: path.split('\\').pop() || 'Computer',
        type: 'folder',
        path: path
      };
      props.onNavigate?.(path, pathItem);
    }
  };

  const handleGoForward = () => {
    if (canGoForward()) {
      const newIndex = historyIndex() + 1;
      setHistoryIndex(newIndex);
      setSelectedItems([]);
      const path = navigationHistory()[newIndex];
      // Create a dummy folder item for the path
      const pathItem: FileItem = {
        name: path.split('\\').pop() || 'Computer',
        type: 'folder',
        path: path
      };
      props.onNavigate?.(path, pathItem);
    }
  };

  const handleGoUp = () => {
    if (canGoUp()) {
      const path = currentPath();
      const pathParts = path.split('\\').filter(part => part);
      const parentPath = pathParts.length > 1 ? pathParts.slice(0, -1).join('\\') : '';
      navigateToPath(parentPath);
    }
  };

  const handleBreadcrumbClick = (pathIndex: number, pathParts: string[]) => {
    const newPath = pathParts.slice(0, pathIndex + 1).join('\\');
    navigateToPath(newPath);
  };

  const handleSort = (column: 'name' | 'type' | 'size' | 'modified') => {
    if (sortBy() === column) {
      setSortDirection(sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  const handleSearchInput = (value: string) => {
    setSearchTerm(value);
    props.onSearchChange?.(value, filteredData());
  };

  const explorerStyle = (): JSX.CSSProperties => ({
    width: props.width,
    height: props.height,
  });

  return (
    <div class={cn('win7-file-explorer', props.class)} style={explorerStyle()}>
      {/* Address Bar */}
      <div class="win7-explorer-address-bar">
        <div class="win7-explorer-nav-buttons">
          <button 
            class="win7-explorer-nav-button" 
            title="Back"
            disabled={!canGoBack()}
            onClick={handleGoBack}
          >
            ←
          </button>
          <button 
            class="win7-explorer-nav-button" 
            title="Forward"
            disabled={!canGoForward()}
            onClick={handleGoForward}
          >
            →
          </button>
          <button 
            class="win7-explorer-nav-button" 
            title="Up"
            disabled={!canGoUp()}
            onClick={handleGoUp}
          >
            ↑
          </button>
        </div>
        <div class="win7-explorer-breadcrumb">
          <span 
            class="win7-breadcrumb-item"
            onClick={() => navigateToPath('')}
          >
            Computer
          </span>
          <Show when={currentPath() && currentPath() !== ''}>
            <For each={currentPath().split('\\').filter(part => part)}>
              {(part, index) => {
                const pathParts = currentPath().split('\\').filter(part => part);
                return (
                  <>
                    <span class="win7-breadcrumb-separator">►</span>
                    <span 
                      class={cn(
                        'win7-breadcrumb-item',
                        { 'win7-breadcrumb-current': index() === pathParts.length - 1 }
                      )}
                      onClick={() => handleBreadcrumbClick(index(), pathParts)}
                    >
                      {part}
                    </span>
                  </>
                );
              }}
            </For>
          </Show>
        </div>
      </div>

      {/* Search Bar */}
      <Show when={props.showSearch}>
        <div class="win7-explorer-search-bar">
          <input
            type="text"
            class="win7-explorer-search-input"
            placeholder={props.searchPlaceholder || "Search..."}
            value={searchTerm()}
            onInput={(e) => handleSearchInput(e.target.value)}
          />
          <Show when={searchTerm()}>
            <button 
              class="win7-explorer-search-clear"
              onClick={() => handleSearchInput('')}
              title="Clear search"
            >
              ×
            </button>
          </Show>
        </div>
      </Show>

      {/* Content Area */}
      <div class="win7-explorer-content">
        <Show 
          when={props.viewMode !== 'details'} 
          fallback={
            <div class="win7-explorer-details-view">
              <div class="win7-explorer-details-header">
                <div class="win7-explorer-details-col" onClick={() => handleSort('name')}>
                  Name {sortBy() === 'name' && (sortDirection() === 'asc' ? '▲' : '▼')}
                </div>
                <div class="win7-explorer-details-col" onClick={() => handleSort('type')}>
                  Type {sortBy() === 'type' && (sortDirection() === 'asc' ? '▲' : '▼')}
                </div>
                <div class="win7-explorer-details-col" onClick={() => handleSort('size')}>
                  Size {sortBy() === 'size' && (sortDirection() === 'asc' ? '▲' : '▼')}
                </div>
                <div class="win7-explorer-details-col" onClick={() => handleSort('modified')}>
                  Date Modified {sortBy() === 'modified' && (sortDirection() === 'asc' ? '▲' : '▼')}
                </div>
              </div>
              <div class="win7-explorer-details-content">
                <For each={filteredData()}>
                  {(item) => (
                    <div
                      class={cn(
                        'win7-explorer-details-row',
                        { 'win7-explorer-details-row-selected': selectedItems().includes(item.name) }
                      )}
                      onClick={(e) => handleItemClick(item, e)}
                      onDblClick={() => handleItemDoubleClick(item)}
                    >
                      <div class="win7-explorer-details-cell">
                        <span class="win7-explorer-item-icon">
                          {item.type === 'folder' ? '📁' : '📄'}
                        </span>
                        {item.name}
                      </div>
                      <div class="win7-explorer-details-cell">
                        {item.type === 'folder' ? 'File folder' : 'File'}
                      </div>
                      <div class="win7-explorer-details-cell">
                        {formatFileSize(item.size)}
                      </div>
                      <div class="win7-explorer-details-cell">
                        {formatDate(item.modified)}
                      </div>
                    </div>
                  )}
                </For>
              </div>
            </div>
          }
        >
          <div class="win7-explorer-icons-view">
            <For each={filteredData()}>
              {(item) => (
                <div
                  class={cn(
                    'win7-explorer-item',
                    { 'win7-explorer-item-selected': selectedItems().includes(item.name) }
                  )}
                  onClick={(e) => handleItemClick(item, e)}
                  onDblClick={() => handleItemDoubleClick(item)}
                  title={item.name}
                >
                  <div class="win7-explorer-item-icon">
                    {item.type === 'folder' ? '📁' : '📄'}
                  </div>
                  <div class="win7-explorer-item-name">
                    {item.name}
                  </div>
                </div>
              )}
            </For>
          </div>
        </Show>
      </div>

      {/* Status Bar */}
      <div class="win7-explorer-status">
        <span class="win7-status-info">
          {filteredData().length} item{filteredData().length !== 1 ? 's' : ''}
          <Show when={selectedItems().length > 0}>
            {' '}({selectedItems().length} selected)
          </Show>
        </span>
        <Show when={searchTerm()}>
          <span class="win7-status-search">
            Searching for "{searchTerm()}"
          </span>
        </Show>
      </div>
    </div>
  );
};