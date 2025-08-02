import { Component, For, createSignal } from 'solid-js';
import { cn } from '../utils/cn';

export interface ListViewColumn {
  key: string;
  title: string;
  width?: string;
  sortable?: boolean;
  sorted?: 'asc' | 'desc';
}

export interface ListViewItem {
  id: string;
  [key: string]: any;
  selected?: boolean;
  disabled?: boolean;
}

export interface ListViewProps {
  columns: ListViewColumn[];
  items: ListViewItem[];
  onSelectionChange?: (selectedId: string) => void;
  onClick?: (item: ListViewItem) => void;
  onDoubleClick?: (item: ListViewItem) => void;
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  hasShadow?: boolean;
  class?: string;
}

export const ListView: Component<ListViewProps> = (props) => {
  const [hoveredRow, setHoveredRow] = createSignal<string | null>(null);
  
  const tableClass = () => cn(
    {
      'has-shadow': props.hasShadow
    },
    props.class
  );

  const handleRowClick = (item: ListViewItem) => {
    if (!item.disabled) {
      props.onSelectionChange?.(item.id);
      props.onClick?.(item);
    }
  };

  const handleRowDoubleClick = (item: ListViewItem) => {
    if (!item.disabled) {
      props.onDoubleClick?.(item);
    }
  };

  const handleHeaderClick = (column: ListViewColumn) => {
    if (column.sortable && props.onSort) {
      const direction = column.sorted === 'asc' ? 'desc' : 'asc';
      props.onSort(column.key, direction);
    }
  };

  const getRowStyle = (item: ListViewItem) => {
    const baseStyle: any = item.disabled 
      ? { opacity: '0.5', 'pointer-events': 'none' } 
      : { cursor: 'pointer' };

    // Hover effect (light blue like menu items)
    if (hoveredRow() === item.id && !item.disabled) {
      return {
        ...baseStyle,
        background: 'var(--w7-li-bg-hl, linear-gradient(#fff9,#e6ecf5cc 90%,#fffc))',
        border: '1px solid var(--w7-li-bd-hl, #aaddfa)',
        'border-radius': 'var(--w7-el-bdr, 3px)'
      };
    }

    // Selection effect (darker blue like navigation)
    if (item.selected && !item.disabled) {
      return {
        ...baseStyle,
        background: '#3399ff',
        color: '#fff',
        border: '1px solid #2288ee',
        'border-radius': 'var(--w7-el-bdr, 3px)'
      };
    }

    return baseStyle;
  };

  return (
    <table class={tableClass()}>
      <thead>
        <tr>
          <For each={props.columns}>
            {(column) => (
              <th 
                class={cn({
                  'highlighted': true,
                  'indicator': column.sortable && column.sorted,
                  'up': column.sorted === 'asc'
                })}
                style={{
                  ...(column.width ? { width: column.width } : {}),
                  cursor: column.sortable ? 'pointer' : 'default'
                }}
                onClick={() => handleHeaderClick(column)}
              >
                {column.title}
              </th>
            )}
          </For>
        </tr>
      </thead>
      <tbody>
        <For each={props.items}>
          {(item) => (
            <tr 
              onClick={() => handleRowClick(item)}
              onDblClick={() => handleRowDoubleClick(item)}
              onMouseEnter={() => setHoveredRow(item.id)}
              onMouseLeave={() => setHoveredRow(null)}
              style={getRowStyle(item)}
            >
              <For each={props.columns}>
                {(column) => (
                  <td>{item[column.key]}</td>
                )}
              </For>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
};