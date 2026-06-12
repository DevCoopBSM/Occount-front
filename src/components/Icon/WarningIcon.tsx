import React from 'react';
import type { BaseIconProps } from './types';

export interface IconProps extends BaseIconProps {}

export const WarningIcon: React.FC<IconProps> = ({ size = 24, color = '#FCC800', ...props }) => (
  <svg
    viewBox="0 -960 960 960"
    width={size}
    height={size}
    fill="none"
    aria-hidden={props['aria-label'] || props['aria-labelledby'] ? undefined : true}
    {...props}
  >
    <path
      d="M33.07-115.93 480-888.13l446.93 772.2H33.07Zm150.91-87.42h592.04L480-713.3 183.98-203.35Zm325.24-49.35q11.98-11.97 11.98-29.21 0-17.24-11.98-29.1-11.98-11.86-29.22-11.86t-29.22 11.86q-11.98 11.86-11.98 29.1 0 17.24 11.98 29.21 11.98 11.98 29.22 11.98t29.22-11.98ZM440-360h80v-197.37h-80V-360Zm40-98.33Z"
      fill={color}
    />
  </svg>
);

export default WarningIcon;
