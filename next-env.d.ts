/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
declare module '*.mp3'

declare module 'redux-promise'

interface ReduxProps {
  storeData?: Record<any, any>;
  setStoreData?: (type: string, payload: any) => object;
}

interface Window {
  TencentCaptcha: any;
  wxsdk: any;
}

declare module 'react-dom';
declare module 'react-pullload';
declare module 'crypto-js';
