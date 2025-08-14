import { Component, splitProps, Show } from 'solid-js';
import { cn } from '../utils/cn';
import { SliderProps } from '../types';

export const Slider: Component<SliderProps> = (props) => {
  const [local, others] = splitProps(props, ['hasBoxIndicator', 'vertical', 'class']);

  const sliderClass = () => {
    return cn(
      {
        'has-box-indicator': local.hasBoxIndicator
      },
      local.class
    );
  };

  const wrapperClass = () => {
    return cn({
      'is-vertical': local.vertical
    });
  };

  return (
    <Show 
      when={local.vertical}
      fallback={
        <input 
          type="range"
          class={sliderClass()}
          {...others}
        />
      }
    >
      <div class={wrapperClass()}>
        <input 
          type="range"
          class={sliderClass()}
          {...others}
        />
      </div>
    </Show>
  );
};