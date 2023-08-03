import toast, { Toast } from 'react-hot-toast'

type ToastOptions =
  | Partial<Pick<Toast, 'id' | 'icon' | 'duration' | 'ariaProps' | 'className' | 'style' | 'position' | 'iconTheme'>>
  | undefined

const MAP_EDITOR_OPTIONS: ToastOptions = {
  position: 'top-center',
  style: {
    background: '#444',
    fontSize: '15px',
    fontWeight: 400,
    border: '1px solid rgba(255, 255, 255, 0.05)',
  },
}

const showToast = (
  type: 'success' | 'error',
  message: string,
  variant: 'default' | 'mapEditor' = 'default',
  extraOptions?: ToastOptions
) => {
  if (variant === 'mapEditor') {
    return toast[type](message, { ...MAP_EDITOR_OPTIONS, ...extraOptions })
  }

  return toast[type](message, extraOptions)
}

export default showToast
