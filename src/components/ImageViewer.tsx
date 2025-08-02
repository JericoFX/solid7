import { Component, createSignal, JSX, Show } from 'solid-js';
import { Window } from './Window';
import { Button } from './Button';
import { cn } from '../utils/cn';

export interface ImageViewerProps {
  class?: string;
  width?: string;
  height?: string;
  title?: string;
  imageSrc?: string;
  imageAlt?: string;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  showToolbar?: boolean;
}

export const ImageViewer: Component<ImageViewerProps> = (props) => {
  const [zoomLevel, setZoomLevel] = createSignal(100);
  const [fitToWindow, setFitToWindow] = createSignal(true);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 500));
    setFitToWindow(false);
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 25));
    setFitToWindow(false);
  };

  const handleActualSize = () => {
    setZoomLevel(100);
    setFitToWindow(false);
  };

  const handleFitToWindow = () => {
    setFitToWindow(true);
  };

  const imageStyle = (): JSX.CSSProperties => {
    if (fitToWindow()) {
      return {
        'max-width': '100%',
        'max-height': '100%',
        'object-fit': 'contain',
        'width': 'auto',
        'height': 'auto'
      };
    }
    return {
      'width': `${zoomLevel()}%`,
      'height': 'auto'
    };
  };

  const viewerContentClass = () => cn(
    'image-viewer-content',
    {
      'fit-to-window': fitToWindow()
    }
  );

  return (
    <>
      <style>{`
        .image-viewer-flex-window .window-body {
          display: flex;
          height: 100%;
        }
      `}</style>
      <Window 
      title={props.title || 'Image Viewer'}
      width={props.width || '600px'}
      height={props.height || '500px'}
      active
      onClose={props.onClose}
      onMinimize={props.onMinimize}
      onMaximize={props.onMaximize}
      hasSpace={false}
      class={cn('image-viewer-window image-viewer-flex-window', props.class)}
    >
      <div style={{
        'display': 'flex',
        'flex-direction': 'column',
        'height': '100%',
        'width': '100%'
      }}>
        <Show when={props.showToolbar !== false}>
          <div class="image-viewer-toolbar" style={{
            'display': 'flex',
            'align-items': 'center',
            'gap': '4px',
            'padding': '4px 8px',
            'border-bottom': '1px solid #cfcfcf',
            'background': '#f0f0f0',
            'flex-shrink': '0'
          }}>
            <Button onClick={handleZoomIn} aria-label="Zoom In">🔍+</Button>
            <Button onClick={handleZoomOut} aria-label="Zoom Out">🔍-</Button>
            <Button onClick={handleActualSize} aria-label="Actual Size">1:1</Button>
            <Button onClick={handleFitToWindow} aria-label="Fit to Window">⏹</Button>
            <span style={{
              'margin-left': '8px',
              'font-size': '11px',
              'color': '#666'
            }}>
              {fitToWindow() ? 'Fit to Window' : `${zoomLevel()}%`}
            </span>
          </div>
        </Show>
        
        <div 
          class={viewerContentClass()}
          style={{
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            'flex': '1',
            'min-height': '0',
            'overflow': 'auto',
            'background': '#fff',
            'position': 'relative'
          }}
        >
        <Show 
          when={props.imageSrc}
          fallback={
            <div style={{
              'display': 'flex',
              'flex-direction': 'column',
              'align-items': 'center',
              'justify-content': 'center',
              'color': '#666',
              'padding': '40px'
            }}>
              <div style={{ 'font-size': '48px', 'margin-bottom': '16px' }}>🖼️</div>
              <p>No image selected</p>
              <p style={{ 'font-size': '11px', 'margin-top': '8px' }}>
                Set the imageSrc prop to display an image
              </p>
            </div>
          }
        >
          <img 
            src={props.imageSrc}
            alt={props.imageAlt || 'Image'}
            style={imageStyle()}
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; color: #d32f2f; padding: 40px;">
                    <div style="font-size: 48px; margin-bottom: 16px;">⚠️</div>
                    <p>Failed to load image</p>
                    <p style="font-size: 11px; margin-top: 8px; word-break: break-all;">${props.imageSrc}</p>
                  </div>
                `;
              }
            }}
          />
        </Show>
        </div>
      </div>
    </Window>
    </>
  );
};