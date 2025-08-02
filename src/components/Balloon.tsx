import { Component, Show } from 'solid-js';
import clsx from 'clsx';

export interface BalloonProps {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  isVisible?: boolean;
  id?: string;
  class?: string;
}

export const Balloon: Component<BalloonProps> = (props) => {
  const balloonClass = () => clsx(
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
          "max-width": "200px",
          "word-wrap": "break-word"
        }}
      >
        {props.content}
      </div>
    </Show>
  );
};