import React from 'react';

type IconName = 'close' | 'info' | 'minus' | 'plus' | 'menu' | 'settings' | 'chevronLeft' | 'chevronRight';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

type IconConfig = {
  viewBox?: string;
  render: (strokeWidth: number, color: string) => React.ReactNode;
};

const iconConfigs: Record<IconName, IconConfig> = {
  close: {
    render: (strokeWidth, color) => (
      <>
        <path d="M6 6L18 18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        <path d="M18 6L6 18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      </>
    ),
  },
  info: {
    render: (strokeWidth, color) => (
      <>
        <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={strokeWidth} />
        <path d="M12 8V12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        <path d="M12 16H12.01" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      </>
    ),
  },
  minus: {
    render: (strokeWidth, color) => (
      <path d="M5 12H19" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    ),
  },
  plus: {
    render: (strokeWidth, color) => (
      <>
        <path d="M12 5V19" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        <path d="M5 12H19" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      </>
    ),
  },
  menu: {
    render: (strokeWidth, color) => (
      <path d="M3 6.75H21M3 12H21M3 17.25H21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    ),
  },
  settings: {
    viewBox: '0 0 30 30',
    render: (_strokeWidth, color) => (
      <path
        d="M15.3076 5L24.3757 10.25V20.75L15.3076 26L6.23938 20.75V10.25L15.3076 5ZM15.3076 7.20595L8.14847 11.3506V19.6494L15.3076 23.794L22.4667 19.6494V11.3506L15.3076 7.20595ZM15.3076 19.3182C14.2949 19.3182 13.3237 18.9159 12.6077 18.1998C11.8917 17.4838 11.4894 16.5127 11.4894 15.5C11.4894 14.4873 11.8917 13.5162 12.6077 12.8001C13.3237 12.0841 14.2949 11.6818 15.3076 11.6818C16.3202 11.6818 17.2914 12.0841 18.0074 12.8001C18.7235 13.5162 19.1257 14.4873 19.1257 15.5C19.1257 16.5127 18.7235 17.4838 18.0074 18.1998C17.2914 18.9159 16.3202 19.3182 15.3076 19.3182ZM15.3076 17.4091C15.8139 17.4091 16.2994 17.208 16.6575 16.8499C17.0155 16.4919 17.2167 16.0063 17.2167 15.5C17.2167 14.9937 17.0155 14.5081 16.6575 14.1501C16.2994 13.792 15.8139 13.5909 15.3076 13.5909C14.8013 13.5909 14.3157 13.792 13.9576 14.1501C13.5996 14.5081 13.3985 14.9937 13.3985 15.5C13.3985 16.0063 13.5996 16.4919 13.9576 16.8499C14.3157 17.208 14.8013 17.4091 15.3076 17.4091Z"
        fill={color}
      />
    ),
  },
  chevronLeft: {
    viewBox: '0 0 30 30',
    render: (_strokeWidth, color) => (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.3839 8.49112C18.872 8.97927 18.872 9.77074 18.3839 10.2589L13.6427 15L18.3839 19.7411C18.872 20.2292 18.872 21.0207 18.3839 21.5089C17.8958 21.997 17.1042 21.997 16.6161 21.5089L10.9911 15.8839C10.7567 15.6494 10.625 15.3315 10.625 15C10.625 14.6684 10.7567 14.3505 10.9911 14.1161L16.6161 8.49111C17.1042 8.00296 17.8958 8.00296 18.3839 8.49112Z"
        fill={color}
      />
    ),
  },
  chevronRight: {
    viewBox: '0 0 30 30',
    render: (_strokeWidth, color) => (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.6161 8.49112C11.128 8.97927 11.128 9.77074 11.6161 10.2589L16.3573 15L11.6161 19.7411C11.128 20.2292 11.128 21.0207 11.6161 21.5089C12.1042 21.997 12.8958 21.997 13.3839 21.5089L19.0089 15.8839C19.2433 15.6494 19.375 15.3315 19.375 15C19.375 14.6684 19.2433 14.3505 19.0089 14.1161L13.3839 8.49111C12.8958 8.00296 12.1042 8.00296 11.6161 8.49112Z"
        fill={color}
      />
    ),
  },
};

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = 'currentColor',
  strokeWidth,
  ...props
}) => {
  const config = iconConfigs[name];
  const resolvedStrokeWidth = strokeWidth ?? (name === 'info' ? 1.5 : 2);

  return (
    <svg
      viewBox={config.viewBox ?? '0 0 24 24'}
      width={size}
      height={size}
      fill="none"
      aria-hidden={props['aria-label'] ? undefined : true}
      {...props}
    >
      {config.render(resolvedStrokeWidth, color)}
    </svg>
  );
};

export default Icon;
