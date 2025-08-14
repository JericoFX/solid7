import { Component } from 'solid-js';
import { NavBar } from './NavBar';
import { NotepadMenuBarProps } from '../types';

export const NotepadMenuBar: Component<NotepadMenuBarProps> = (props) => {
  const menuItems = [
    {
      id: 'file',
      label: 'File',
      children: [
        {
          id: 'new',
          label: 'New\tCtrl+N',
          onClick: props.onNew || (() => {}),
        },
        {
          id: 'open',
          label: 'Open...\tCtrl+O',
          onClick: props.onOpen || (() => {}),
        },
        {
          id: 'save',
          label: 'Save\tCtrl+S',
          onClick: props.onSave || (() => {}),
        },
        {
          id: 'saveas',
          label: 'Save As...\tCtrl+Shift+S',
          onClick: props.onSaveAs || (() => {}),
        },
        { id: 'sep1', label: '', divider: true },
        {
          id: 'exit',
          label: 'Exit',
          onClick: props.onExit || (() => {}),
        },
      ],
    },
    {
      id: 'edit',
      label: 'Edit',
      children: [
        {
          id: 'undo',
          label: 'Undo\tCtrl+Z',
          disabled: !props.hasUndo,
          onClick: props.onUndo || (() => {}),
        },
        { id: 'sep1', label: '', divider: true },
        {
          id: 'cut',
          label: 'Cut\tCtrl+X',
          disabled: !props.hasSelection,
          onClick: props.onCut || (() => {}),
        },
        {
          id: 'copy',
          label: 'Copy\tCtrl+C',
          disabled: !props.hasSelection,
          onClick: props.onCopy || (() => {}),
        },
        {
          id: 'paste',
          label: 'Paste\tCtrl+V',
          disabled: !props.hasClipboard,
          onClick: props.onPaste || (() => {}),
        },
        { id: 'sep2', label: '', divider: true },
        {
          id: 'find',
          label: 'Find...\tCtrl+F',
          onClick: props.onFind || (() => {}),
        },
        {
          id: 'findnext',
          label: 'Find Next\tF3',
          onClick: () => {}, // TODO: Implement
        },
        {
          id: 'replace',
          label: 'Replace...\tCtrl+H',
          onClick: props.onReplace || (() => {}),
        },
        {
          id: 'goto',
          label: 'Go To...\tCtrl+G',
          onClick: () => {}, // TODO: Implement
        },
        { id: 'sep3', label: '', divider: true },
        {
          id: 'selectall',
          label: 'Select All\tCtrl+A',
          onClick: props.onSelectAll || (() => {}),
        },
        {
          id: 'timedate',
          label: 'Time/Date\tF5',
          onClick: () => {}, // TODO: Implement
        },
      ],
    },
    {
      id: 'format',
      label: 'Format',
      children: [
        {
          id: 'wordwrap',
          label: 'Word Wrap',
          onClick: props.onWordWrap || (() => {}),
          // TODO: Add checkmark indicator when wordWrap is true
        },
        {
          id: 'font',
          label: 'Font...',
          onClick: props.onFont || (() => {}),
        },
      ],
    },
    {
      id: 'view',
      label: 'View',
      children: [
        {
          id: 'statusbar',
          label: 'Status Bar',
          onClick: props.onStatusBar || (() => {}),
          // TODO: Add checkmark indicator when showStatusBar is true
        },
      ],
    },
    {
      id: 'help',
      label: 'Help',
      children: [
        {
          id: 'helptopics',
          label: 'Help Topics',
          onClick: () => {}, // TODO: Implement
        },
        { id: 'sep1', label: '', divider: true },
        {
          id: 'about',
          label: 'About Notepad',
          onClick: props.onAbout || (() => {}),
        },
      ],
    },
  ];

  return <NavBar items={menuItems} class={props.class} />;
};