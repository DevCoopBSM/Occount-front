declare module '*.svg' {
    import React = require('react');
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}

declare module 'assets';
declare module 'common';
declare module 'components';
declare module 'constants';
declare module 'contexts';
declare module 'hooks';
declare module 'lib';
declare module 'pages';
declare module 'recoil';
declare module 'utils';

// Axios 타입 확장
import { AxiosInstance, AxiosRequestConfig } from 'axios';

declare module 'axios' {
  interface AxiosInstance {
    suspense: <T = any>(config: AxiosRequestConfig) => Promise<T>;
  }
}