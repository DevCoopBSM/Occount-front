import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const EyeIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  strokeWidth = 1.5,
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
    <path
      d="M2.03526 12.3224C1.96618 12.1151 1.96611 11.8907 2.03507 11.6834C3.42343 7.50972 7.3605 4.5 12.0005 4.5C16.6384 4.5 20.5739 7.50692 21.964 11.6776C22.0331 11.8849 22.0332 12.1093 21.9642 12.3166C20.5759 16.4903 16.6388 19.5 11.9988 19.5C7.3609 19.5 3.42535 16.4931 2.03526 12.3224Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.9997 12C14.9997 13.6569 13.6566 15 11.9997 15C10.3429 15 8.99971 13.6569 8.99971 12C8.99971 10.3431 10.3429 9 11.9997 9C13.6566 9 14.9997 10.3431 14.9997 12Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default EyeIcon;