import { Component, Show } from 'solid-js';
import { cn } from '../utils/cn';

export interface BalloonProps {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  isVisible?: boolean;
  id?: string;
  class?: string;
}

export const Balloon: Component<BalloonProps> = (props) => {
  const balloonClass = () => cn(
    'balloon', // Base class for 7.css styling
    {
      'is-top': props.position === 'top',
      'is-bottom': props.position === 'bottom', 
      'is-left': props.position === 'left',
      'is-right': props.position === 'right'
    },
    props.class
  );

  return (
    <Show when={props.isVisible}>
      <div 
        role="tooltip" 
        id={props.id}
        class={balloonClass()}
        style={{
          "min-width": "max-content",
          "white-space": "nowrap"
        }}
      >
        {props.content}
      </div>
    </Show>
  );
};