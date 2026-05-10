import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const CloseIcon: React.FC<IconProps> = ({
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
    aria-hidden={props['aria-label'] ? undefined : true}
    {...props}
  >
    <path d="M6 6L18 18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M18 6L6 18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export default CloseIcon;