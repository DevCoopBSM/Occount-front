import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const ChevronLeftIcon: React.FC<IconProps> = ({
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
      d="M18.3839 8.49112C18.872 8.97927 18.872 9.77074 18.3839 10.2589L13.6427 15L18.3839 19.7411C18.872 20.2292 18.872 21.0207 18.3839 21.5089C17.8958 21.997 17.1042 21.997 16.6161 21.5089L10.9911 15.8839C10.7567 15.6494 10.625 15.3315 10.625 15C10.625 14.6684 10.7567 14.3505 10.9911 14.1161L16.6161 8.49111C17.1042 8.00296 17.8958 8.00296 18.3839 8.49112Z"
      fill={color}
    />
  </svg>
);

export default ChevronLeftIcon;