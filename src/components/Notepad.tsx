import { Component, createSignal, createEffect, onMount, JSX } from 'solid-js';
import { Window } from './Window';
import { StatusBar } from './StatusBar';
import { NotepadMenuBar } from './NotepadMenuBar';
import { NotepadProps } from '../types';
import { cn } from '../utils/cn';
import './Notepad.css';

export const Notepad: Component<NotepadProps> = (props) => {
  const [content, setContent] = createSignal(props.content || '');
  const [fileName, setFileName] = createSignal(props.fileName || 'Untitled');
  const [wordWrap, setWordWrap] = createSignal(props.wordWrap !== false); // Default to true
  const [showStatusBar, setShowStatusBar] = createSignal(props.showStatusBar !== false); // Default to true
  const [hasUndo, setHasUndo] = createSignal(false);
  const [hasSelection, setHasSelection] = createSignal(false);
  const [hasClipboard] = createSignal(true); // Assume clipboard available
  const [cursorPosition, setCursorPosition] = createSignal({ line: 1, column: 1 });
  const [modified, setModified] = createSignal(false);
  
  let textAreaRef: HTMLTextAreaElement | undefined;

  // Update parent when content changes
  createEffect(() => {
    props.onContentChange?.(content());
  });

  // Update modified state when content changes
  createEffect(() => {
    const currentContent = content();
    const originalContent = props.content || '';
    setModified(currentContent !== originalContent);
  });

  onMount(() => {
    if (textAreaRef) {
      textAreaRef.focus();
    }
  });

  const updateCursorPosition = () => {
    if (!textAreaRef) return;
    
    const textarea = textAreaRef;
    const text = textarea.value;
    const cursorPos = textarea.selectionStart;
    
    // Calculate line and column
    const lines = text.substring(0, cursorPos).split('\n');
    const line = lines.length;
    const column = lines[lines.length - 1].length + 1;
    
    setCursorPosition({ line, column });
    
    // Check if text is selected
    setHasSelection(textarea.selectionStart !== textarea.selectionEnd);
  };

  const handleTextAreaInput = (e: Event) => {
    const target = e.currentTarget as HTMLTextAreaElement;
    setContent(target.value);
    setHasUndo(true);
    updateCursorPosition();
  };

  const handleTextAreaSelect = () => {
    updateCursorPosition();
  };

  const handleTextAreaClick = () => {
    updateCursorPosition();
  };

  const handleTextAreaKeyUp = () => {
    updateCursorPosition();
  };

  // Menu handlers
  const handleNew = () => {
    if (modified() && content().trim() !== '') {
      // TODO: Show save dialog
      if (confirm('Do you want to save changes to ' + fileName() + '?')) {
        // Save file logic would go here
      }
    }
    setContent('');
    setFileName('Untitled');
    setModified(false);
    setHasUndo(false);
    textAreaRef?.focus();
  };

  const handleOpen = () => {
    // TODO: Show open file dialog
    alert('Open file dialog would appear here');
  };

  const handleSave = () => {
    if (fileName() === 'Untitled') {
      handleSaveAs();
    } else {
      // TODO: Save file logic
      alert('File would be saved as: ' + fileName());
      setModified(false);
    }
  };

  const handleSaveAs = () => {
    // TODO: Show save as dialog
    const newFileName = prompt('Save as:', fileName());
    if (newFileName) {
      setFileName(newFileName);
      setModified(false);
      alert('File would be saved as: ' + newFileName);
    }
  };

  const handleExit = () => {
    if (modified() && content().trim() !== '') {
      if (confirm('Do you want to save changes to ' + fileName() + '?')) {
        handleSave();
      }
    }
    props.onClose?.();
  };

  const handleUndo = () => {
    // TODO: Implement undo functionality
    alert('Undo functionality would be implemented here');
  };

  const handleCut = () => {
    if (textAreaRef && hasSelection()) {
      const start = textAreaRef.selectionStart;
      const end = textAreaRef.selectionEnd;
      const selectedText = textAreaRef.value.substring(start, end);
      
      // Copy to clipboard
      navigator.clipboard.writeText(selectedText);
      
      // Remove selected text
      const newContent = textAreaRef.value.substring(0, start) + textAreaRef.value.substring(end);
      setContent(newContent);
      textAreaRef.value = newContent;
      textAreaRef.setSelectionRange(start, start);
      textAreaRef.focus();
      updateCursorPosition();
    }
  };

  const handleCopy = () => {
    if (textAreaRef && hasSelection()) {
      const start = textAreaRef.selectionStart;
      const end = textAreaRef.selectionEnd;
      const selectedText = textAreaRef.value.substring(start, end);
      navigator.clipboard.writeText(selectedText);
    }
  };

  const handlePaste = async () => {
    if (textAreaRef) {
      try {
        const clipboardText = await navigator.clipboard.readText();
        const start = textAreaRef.selectionStart;
        const end = textAreaRef.selectionEnd;
        const currentContent = textAreaRef.value;
        
        const newContent = currentContent.substring(0, start) + clipboardText + currentContent.substring(end);
        setContent(newContent);
        textAreaRef.value = newContent;
        
        const newCursorPos = start + clipboardText.length;
        textAreaRef.setSelectionRange(newCursorPos, newCursorPos);
        textAreaRef.focus();
        updateCursorPosition();
      } catch (err) {
        // Fallback for browsers that don't support clipboard API
        console.warn('Clipboard access denied');
      }
    }
  };

  const handleSelectAll = () => {
    if (textAreaRef) {
      textAreaRef.select();
      updateCursorPosition();
    }
  };

  const handleFind = () => {
    // TODO: Show find dialog
    alert('Find dialog would appear here');
  };

  const handleReplace = () => {
    // TODO: Show replace dialog
    alert('Replace dialog would appear here');
  };

  const handleWordWrap = () => {
    setWordWrap(!wordWrap());
  };

  const handleFont = () => {
    // TODO: Show font dialog
    alert('Font dialog would appear here');
  };

  const handleStatusBar = () => {
    setShowStatusBar(!showStatusBar());
  };

  const handleAbout = () => {
    alert('Notepad\n\nA simple text editor component built with SolidJS and 7.css\n\nVersion 1.0');
  };

  const getTitle = () => {
    const modifiedIndicator = modified() ? '*' : '';
    return `${modifiedIndicator}${fileName()} - Notepad`;
  };

  const getLineCount = () => {
    return content().split('\n').length;
  };

  const getCharacterCount = () => {
    return content().length;
  };

  const statusFields = () => [
    {
      id: 'position',
      content: `Ln ${cursorPosition().line}, Col ${cursorPosition().column}`,
    },
    {
      id: 'zoom',
      content: '100%',
    },
    {
      id: 'encoding',
      content: 'UTF-8',
    },
    {
      id: 'linecount',
      content: `${getLineCount()} lines`,
    },
    {
      id: 'charcount',
      content: `${getCharacterCount()} characters`,
    },
  ];

  const textAreaClass = () => cn(
    'notepad-textarea',
    {
      'word-wrap': wordWrap(),
      'no-word-wrap': !wordWrap(),
    }
  );

  const textAreaStyle = (): JSX.CSSProperties => ({
    width: '100%',
    height: showStatusBar() ? 'calc(100% - 3rem)' : '100%', // Account for menu bar and status bar
    border: 'none',
    outline: 'none',
    resize: 'none',
    'font-family': 'Consolas, "Courier New", monospace',
    'font-size': '11pt',
    'line-height': '1.2',
    padding: '8px',
    margin: '0',
    'background-color': 'white',
    'white-space': wordWrap() ? 'pre-wrap' : 'pre',
    'overflow-wrap': wordWrap() ? 'break-word' : 'normal',
    'word-break': wordWrap() ? 'break-word' : 'normal',
  });

  return (
    <Window
      title={getTitle()}
      width={props.width || '800px'}
      height={props.height || '600px'}
      active={true}
      hasSpace={false}
      onClose={handleExit}
      onMinimize={props.onMinimize}
      onMaximize={props.onMaximize}
      class={props.class}
    >
      <div class="notepad-container" style={{ height: '100%', display: 'flex', 'flex-direction': 'column' }}>
        <NotepadMenuBar
          onNew={handleNew}
          onOpen={handleOpen}
          onSave={handleSave}
          onSaveAs={handleSaveAs}
          onExit={handleExit}
          onUndo={handleUndo}
          onCut={handleCut}
          onCopy={handleCopy}
          onPaste={handlePaste}
          onFind={handleFind}
          onReplace={handleReplace}
          onSelectAll={handleSelectAll}
          onWordWrap={handleWordWrap}
          onFont={handleFont}
          onStatusBar={handleStatusBar}
          onAbout={handleAbout}
          hasUndo={hasUndo()}
          hasSelection={hasSelection()}
          hasClipboard={hasClipboard()}
          wordWrap={wordWrap()}
          showStatusBar={showStatusBar()}
        />
        
        <div class="notepad-content" style={{ flex: '1', position: 'relative', overflow: 'hidden' }}>
          <textarea
            ref={textAreaRef}
            class={textAreaClass()}
            style={textAreaStyle()}
            value={content()}
            onInput={handleTextAreaInput}
            onSelect={handleTextAreaSelect}
            onClick={handleTextAreaClick}
            onKeyUp={handleTextAreaKeyUp}
            placeholder="Start typing..."
            spellcheck={false}
          />
        </div>
        
        {showStatusBar() && (
          <StatusBar
            fields={statusFields()}
            class="notepad-status-bar"
          />
        )}
      </div>
    </Window>
  );
};