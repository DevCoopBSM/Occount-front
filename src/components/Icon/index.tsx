import React from 'react';

type IconName = 'close' | 'info' | 'minus' | 'plus';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const iconPaths: Record<IconName, (strokeWidth: number, color: string) => React.ReactNode> = {
  close: (strokeWidth, color) => (
    <>
      <path d="M6 6L18 18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M18 6L6 18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </>
  ),
  info: (strokeWidth, color) => (
    <>
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={strokeWidth} />
      <path d="M12 8V12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M12 16H12.01" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </>
  ),
  minus: (strokeWidth, color) => (
    <path d="M5 12H19" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  ),
  plus: (strokeWidth, color) => (
    <>
      <path d="M12 5V19" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M5 12H19" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </>
  ),
};

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = 'currentColor',
  strokeWidth,
  ...props
}) => {
  const resolvedStrokeWidth = strokeWidth ?? (name === 'info' ? 1.5 : 2);

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden={props['aria-label'] ? undefined : true}
      {...props}
    >
      {iconPaths[name](resolvedStrokeWidth, color)}
    </svg>
  );
};

export default Icon;
