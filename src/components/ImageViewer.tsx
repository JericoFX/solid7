import { Component, createSignal, Show, createEffect, onMount, onCleanup } from 'solid-js';
import { Window } from './Window';
import { Button } from './Button';
import { Modal } from './Modal';
import { cn } from '../utils/cn';

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

export const ImageViewer: Component<ImageViewerProps> = (props) => {
  const [zoomLevel, setZoomLevel] = createSignal(100);
  const [fitToWindow, setFitToWindow] = createSignal(true);
  const [currentImageIndex, setCurrentImageIndex] = createSignal(0);

  const images = () => Array.isArray(props.imageSrc) ? props.imageSrc : props.imageSrc ? [props.imageSrc] : [];
  const alts = () => Array.isArray(props.imageAlt) ? props.imageAlt : props.imageAlt ? [props.imageAlt] : [];
  const hasMultipleImages = () => images().length > 1;
  const currentImage = () => images()[currentImageIndex()];
  const currentAlt = () => alts()[currentImageIndex()] || `Image ${currentImageIndex() + 1}`;

  createEffect(() => {
    if (currentImageIndex() >= images().length && images().length > 0) {
      setCurrentImageIndex(0);
    }
  });

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

  const handlePrevImage = () => {
    if (hasMultipleImages()) {
      setCurrentImageIndex(prev => 
        prev === 0 ? images().length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (hasMultipleImages()) {
      setCurrentImageIndex(prev => 
        prev === images().length - 1 ? 0 : prev + 1
      );
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (props.isModal) {
      switch (e.key) {
        case 'Escape':
          props.onClose?.();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handlePrevImage();
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleNextImage();
          break;
      }
    }
  };

  onMount(() => {
    if (props.isModal) {
      document.addEventListener('keydown', handleKeyDown);
    }
  });

  onCleanup(() => {
    if (props.isModal) {
      document.removeEventListener('keydown', handleKeyDown);
    }
  });

  const imageContainerClass = () => cn(
    'image-viewer-container',
    {
      'fit-mode': fitToWindow(),
      'zoom-mode': !fitToWindow()
    }
  );

  const imageContainerStyle = () => ({
    'background': '#fff'
  });

  const imageStyle = () => ({
    'width': fitToWindow() ? 'auto' : `${zoomLevel()}%`
  });

  const toolbarStyle = () => ({
    'display': 'flex',
    'align-items': 'center',
    'gap': '2px',
    'padding': '6px 8px',
    'border-bottom': '1px solid #cfcfcf',
    'background': '#f0f0f0',
    'flex-shrink': '0',
    'flex-wrap': 'nowrap',
    'overflow': 'hidden'
  });

  const Content = () => (
    <>
      <style>{`
        .image-viewer-window {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-sizing: border-box;
        }
        
        .image-viewer-window .window-body {
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
          padding: 0;
          box-sizing: border-box;
          min-height: 0;
        }
        
        .image-viewer-container {
          flex: 1;
          min-height: 0;
          overflow: hidden;
          position: relative;
        }
        
        .image-viewer-container.fit-mode {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .image-viewer-container.zoom-mode {
          overflow: auto;
          padding: 8px;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
        }
        
        .image-viewer-image {
          display: block;
        }
        
        .image-viewer-container.fit-mode .image-viewer-image {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
        }
        
        .image-viewer-container.zoom-mode .image-viewer-image {
          max-width: none;
          height: auto;
        }
        
        .image-viewer-image-wrapper {
          position: relative;
          display: inline-block;
          max-width: 100%;
          max-height: 100%;
        }
        
        .image-viewer-container.fit-mode .image-viewer-image-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .carousel-nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.7);
          color: white;
          border: none;
          padding: 8px 12px;
          cursor: pointer;
          font-size: 16px;
          border-radius: 4px;
          z-index: 2;
          transition: background-color 0.2s;
        }
        
        .carousel-nav-button:hover {
          background: rgba(0, 0, 0, 0.9);
        }
        
        .carousel-nav-button.prev {
          left: 8px;
        }
        
        .carousel-nav-button.next {
          right: 8px;
        }
        
        .carousel-counter {
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 2px 8px;
          border-radius: 8px;
          font-size: 11px;
          z-index: 2;
        }
      `}</style>
      <Show when={props.showToolbar !== false}>
        <div style={toolbarStyle()}>
          <Show when={hasMultipleImages()}>
            <Button onClick={handlePrevImage} aria-label="Previous Image">◀</Button>
            <Button onClick={handleNextImage} aria-label="Next Image">▶</Button>
            <div style={{ 'width': '1px', 'height': '18px', 'background': '#cfcfcf', 'margin': '0 4px' }}></div>
          </Show>
          <Button onClick={handleZoomIn} aria-label="Zoom In">🔍+</Button>
          <Button onClick={handleZoomOut} aria-label="Zoom Out">🔍-</Button>
          <Button onClick={handleActualSize} aria-label="Actual Size">1:1</Button>
          <Button onClick={handleFitToWindow} aria-label="Fit to Window">⏹</Button>
          <span style={{ 'margin-left': '4px', 'font-size': '10px', 'color': '#666', 'white-space': 'nowrap' }}>
            {fitToWindow() ? 'Fit' : `${zoomLevel()}%`}
          </span>
          <Show when={hasMultipleImages()}>
            <span style={{ 'margin-left': 'auto', 'font-size': '10px', 'color': '#666', 'white-space': 'nowrap' }}>
              {currentImageIndex() + 1}/{images().length}
            </span>
          </Show>
        </div>
      </Show>
      
      <div class={imageContainerClass()} style={imageContainerStyle()}>
        <Show 
          when={images().length > 0}
          fallback={
            <div style={{
              'display': 'flex',
              'flex-direction': 'column',
              'align-items': 'center',
              'justify-content': 'center',
              'color': '#666',
              'padding': '40px',
              'width': '100%',
              'height': '100%'
            }}>
              <div style={{ 'font-size': '48px', 'margin-bottom': '16px' }}>🖼️</div>
              <p>No image selected</p>
              <p style={{ 'font-size': '11px', 'margin-top': '8px' }}>
                Set the imageSrc prop to display an image
              </p>
            </div>
          }
        >
          <div class="image-viewer-image-wrapper">
            <img 
              src={currentImage()}
              alt={currentAlt()}
              class="image-viewer-image"
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
                      <p style="font-size: 11px; margin-top: 8px; word-break: break-all;">${currentImage()}</p>
                    </div>
                  `;
                }
              }}
            />
            
            <Show when={hasMultipleImages() && props.isModal}>
              <button 
                class="carousel-nav-button prev"
                onClick={handlePrevImage}
                aria-label="Previous Image"
              >
                ◀
              </button>
              <button 
                class="carousel-nav-button next"
                onClick={handleNextImage}
                aria-label="Next Image"
              >
                ▶
              </button>
              <div class="carousel-counter">
                {currentImageIndex() + 1} / {images().length}
              </div>
            </Show>
          </div>
        </Show>
      </div>
    </>
  );

  const windowTitle = () => {
    const baseTitle = props.title || 'Image Viewer';
    return hasMultipleImages() ? `${baseTitle} (${currentImageIndex() + 1}/${images().length})` : baseTitle;
  };

  const WindowContent = () => (
    <Window 
      title={windowTitle()}
      width={props.width || '600px'}
      height={props.height || '500px'}
      active
      onClose={props.onClose}
      onMinimize={props.onMinimize}
      onMaximize={props.onMaximize}
      hasSpace={false}
      class={cn('image-viewer-window', props.class)}
    >
      <Content />
    </Window>
  );

  const ModalContent = () => (
    <Modal
      isOpen={true}
      onClose={props.onClose}
      title={windowTitle()}
      class={cn('image-viewer-modal', props.class)}
    >
      <div style={{
        'width': props.width || '80vw',
        'height': props.height || '80vh',
        'display': 'flex',
        'flex-direction': 'column',
        'max-width': '90vw',
        'max-height': '80vh'
      }}>
        <Content />
      </div>
    </Modal>
  );

  return props.isModal ? <ModalContent /> : <WindowContent />;
};