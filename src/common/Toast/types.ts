export interface ToastProps {
  isVisible: boolean;
  message: string;
  type?: 'error' | 'success' | 'warning' | 'info';
  title?: string;
  duration?: number;
  onClose: () => void;
}

export interface ToastContextType {
  showToast: (
    message: string,
    type?: 'error' | 'success' | 'warning' | 'info',
    duration?: number
  ) => void;
  hideToast: () => void;
}
