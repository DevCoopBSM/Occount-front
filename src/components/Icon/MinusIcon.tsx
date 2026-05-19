import React from 'react';
import type { BaseIconProps } from './types';

export interface IconProps extends BaseIconProps {}

const MinusIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    aria-hidden={
      props['aria-label'] || props['aria-labelledby'] ? undefined : true
    }
    {...props}
  >
    <path d="M5 12H19" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export default MinusIcon;
