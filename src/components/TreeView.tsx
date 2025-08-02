import { Component, For, Show, createSignal } from 'solid-js';
import clsx from 'clsx';

export interface TreeViewNode {
  id: string;
  label: string;
  children?: TreeViewNode[];
  expanded?: boolean;
  selected?: boolean;
  icon?: string;
}

export interface TreeViewProps {
  nodes: TreeViewNode[];
  onNodeSelect?: (nodeId: string) => void;
  onNodeToggle?: (nodeId: string, expanded: boolean) => void;
  class?: string;
}

export const TreeView: Component<TreeViewProps> = (props) => {
  const [expandedNodes, setExpandedNodes] = createSignal<Set<string>>(new Set());

  const toggleNode = (nodeId: string) => {
    const expanded = expandedNodes();
    const newExpanded = new Set(expanded);
    
    if (expanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    
    setExpandedNodes(newExpanded);
    props.onNodeToggle?.(nodeId, newExpanded.has(nodeId));
  };

  const selectNode = (nodeId: string, event: MouseEvent) => {
    event.stopPropagation();
    props.onNodeSelect?.(nodeId);
  };

  const TreeNode: Component<{ node: TreeViewNode; level?: number }> = (nodeProps) => {
    const level = nodeProps.level || 0;
    const hasChildren = nodeProps.node.children && nodeProps.node.children.length > 0;
    const isExpanded = () => expandedNodes().has(nodeProps.node.id);

    const nodeClass = () => clsx(
      'tree-node',
      {
        'tree-node-selected': nodeProps.node.selected,
        'tree-node-expanded': isExpanded(),
        'tree-node-has-children': hasChildren
      }
    );

    return (
      <div class={nodeClass()}>
        <div 
          class="tree-node-content"
          style={{ 'padding-left': `${level * 20}px` }}
          onClick={(e) => selectNode(nodeProps.node.id, e)}
        >
          <Show when={hasChildren}>
            <span 
              class={clsx('tree-node-toggle', { 'expanded': isExpanded() })}
              onClick={(e) => {
                e.stopPropagation();
                toggleNode(nodeProps.node.id);
              }}
            >
              {isExpanded() ? '▼' : '▶'}
            </span>
          </Show>
          <Show when={nodeProps.node.icon}>
            <span class="tree-node-icon">{nodeProps.node.icon}</span>
          </Show>
          <span class="tree-node-label">{nodeProps.node.label}</span>
        </div>
        
        <Show when={hasChildren && isExpanded()}>
          <div class="tree-node-children">
            <For each={nodeProps.node.children}>
              {(child) => <TreeNode node={child} level={level + 1} />}
            </For>
          </div>
        </Show>
      </div>
    );
  };

  const treeClass = () => clsx('tree-view', props.class);

  return (
    <div class={treeClass()}>
      <For each={props.nodes}>
        {(node) => <TreeNode node={node} />}
      </For>
    </div>
  );
};