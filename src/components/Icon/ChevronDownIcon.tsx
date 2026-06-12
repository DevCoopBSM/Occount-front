import React from 'react';
import type { BaseIconProps } from './types';

export interface ChevronDownIconProps extends BaseIconProps {}

export const ChevronDownIcon: React.FC<ChevronDownIconProps> = ({
  size = 24,
  color = '#111111',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden={props['aria-label'] || props['aria-labelledby'] ? undefined : true}
    {...props}
  >
    <path
      d="M6 9l6 6 6-6"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ChevronDownIcon;
