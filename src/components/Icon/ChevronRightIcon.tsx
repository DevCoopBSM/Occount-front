import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const ChevronRightIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <svg
    viewBox="0 0 30 30"
    width={size}
    height={size}
    fill="none"
    aria-hidden={props['aria-label'] ? undefined : true}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.6161 8.49112C11.128 8.97927 11.128 9.77074 11.6161 10.2589L16.3573 15L11.6161 19.7411C11.128 20.2292 11.128 21.0207 11.6161 21.5089C12.1042 21.997 12.8958 21.997 13.3839 21.5089L19.0089 15.8839C19.2433 15.6494 19.375 15.3315 19.375 15C19.375 14.6684 19.2433 14.3505 19.0089 14.1161L13.3839 8.49111C12.8958 8.00296 12.1042 8.00296 11.6161 8.49112Z"
      fill={color}
    />
  </svg>
);

export default ChevronRightIcon;