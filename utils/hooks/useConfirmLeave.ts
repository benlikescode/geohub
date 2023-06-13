import { useRouter } from 'next/router'
import { useEffect } from 'react'

const DEFAULT_MESSAGE = 'You have unsaved changes. Are you sure you want to leave this page?'

const useConfirmLeave = (hasUnsavedChanges: boolean, message?: string) => {
  const router = useRouter()

  useEffect(() => {
    // Handles refresh of the page / URL change
    const handleBeforeUnload = (e: any) => {
      if (!hasUnsavedChanges) return

      e.preventDefault()
      e.returnValue = message || DEFAULT_MESSAGE // Needed for Chrome and Firefox

      return message || DEFAULT_MESSAGE
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    // Handles browser forward/back
    router.beforePopState(({ as }) => {
      if (!hasUnsavedChanges) return true

      if (as !== router.asPath) {
        return confirm(message || DEFAULT_MESSAGE)
      }

      return true
    })

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      router.beforePopState(() => true)
    }
  }, [router, hasUnsavedChanges, message])
}

export default useConfirmLeave
