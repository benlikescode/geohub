import toast, { Toast } from 'react-hot-toast'

type ToastOptions =
  | Partial<Pick<Toast, 'id' | 'icon' | 'duration' | 'ariaProps' | 'className' | 'style' | 'position' | 'iconTheme'>>
  | undefined

export const showErrorToast = (errorMessage: string, options?: ToastOptions) => {
  const defaultErrorMessage = 'An unexpected error occured.'

  return toast.error(errorMessage || defaultErrorMessage, options)
}

export const showSuccessToast = (successMessage: string, options?: ToastOptions) => {
  return toast.success(successMessage, options)
}
