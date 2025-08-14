import { Component, mergeProps } from 'solid-js';
import { cn } from '../utils/cn';
import { ProgressBarProps } from '../types';

export const ProgressBar: Component<ProgressBarProps> = (props) => {
  const merged = mergeProps({ min: 0, max: 100, value: 0 }, props);

  const progressClass = () => {
    return cn(
      'progressbar', // Base class for 7.css styling
      {
        paused: merged.paused,
        error: merged.error,
        animate: merged.animate,
        marquee: merged.marquee,
      },
      merged.class
    );
  };

  const percentage = () => {
    const range = merged.max - merged.min;
    const value = Math.max(merged.min, Math.min(merged.max, merged.value));
    return ((value - merged.min) / range) * 100;
  };

  return (
    <div
      role='progressbar'
      aria-valuenow={merged.value}
      aria-valuemin={merged.min}
      aria-valuemax={merged.max}
      class={progressClass()}
    >
      <div
        style={{
          width: `${Math.round(percentage())}%`,
          transition: 'width 0.3s ease-in-out',
        }}
      ></div>
    </div>
  );
};
