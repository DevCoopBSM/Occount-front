import React from 'react';
import CloseIcon from './CloseIcon';
import InfoIcon from './InfoIcon';
import MinusIcon from './MinusIcon';
import PlusIcon from './PlusIcon';
import MenuIcon from './MenuIcon';
import SettingsIcon from './SettingsIcon';
import ChevronLeftIcon from './ChevronLeftIcon';
import ChevronRightIcon from './ChevronRightIcon';
import ChevronForwardIcon from './ChevronForwardIcon';
import ExternalLinkIcon from './ExternalLinkIcon';
import EyeIcon from './EyeIcon';
import EyeOffIcon from './EyeOffIcon';
import SearchIcon from './SearchIcon';

type IconName =
  | 'close'
  | 'info'
  | 'minus'
  | 'plus'
  | 'menu'
  | 'settings'
  | 'chevronLeft'
  | 'chevronRight'
  | 'chevronForward'
  | 'externalLink'
  | 'eye'
  | 'eyeOff'
  | 'search';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const iconComponents = {
  close: CloseIcon,
  info: InfoIcon,
  minus: MinusIcon,
  plus: PlusIcon,
  menu: MenuIcon,
  settings: SettingsIcon,
  chevronLeft: ChevronLeftIcon,
  chevronRight: ChevronRightIcon,
  chevronForward: ChevronForwardIcon,
  externalLink: ExternalLinkIcon,
  eye: EyeIcon,
  eyeOff: EyeOffIcon,
  search: SearchIcon,
};

const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const IconComponent = iconComponents[name];
  return <IconComponent {...props} />;
};

export default Icon;
