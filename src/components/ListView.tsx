import { Component, createMemo, For } from 'solid-js';
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
  const tableClass = createMemo(() =>
    cn(
      {
        'has-shadow': props.hasShadow,
      },
      props.class
    )
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

  const getRowClass = (item: ListViewItem) => {
    return cn({
      highlighted: item.selected && !item.disabled,
    });
  };

  return (
    <table class={tableClass()}>
      <thead>
        <tr>
          <For each={props.columns}>
            {(column) => (
              <th
                class={cn({
                  highlighted: true,
                  indicator: column.sortable && column.sorted,
                  up: column.sorted === 'asc',
                })}
                style={{
                  ...(column.width ? { width: column.width } : {}),
                  cursor: column.sortable ? 'pointer' : 'default',
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
              class={getRowClass(item)}
              aria-disabled={item.disabled}
              onClick={() => handleRowClick(item)}
              onDblClick={() => handleRowDoubleClick(item)}
              style={{ cursor: item.disabled ? 'default' : 'pointer' }}
            >
              <For each={props.columns}>
                {(column) => <td>{item[column.key]}</td>}
              </For>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
};
