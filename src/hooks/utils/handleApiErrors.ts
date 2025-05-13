// Archivo: hooks/utils/handleApiErrors.ts

interface ErrorResponse {
  response?: {
    status?: number
    data?: {
      errors?: Record<string, string[]>
      message?: string
    }
  }
}

export const handleApiErrors = (
  error: ErrorResponse,
  setErrors?: (errors: Record<string, string[]>) => void,
  setStatus?: (status: string | null) => void
) => {
  if (error.response?.status === 422) {
    setErrors?.(error.response.data?.errors || {})
    setStatus?.(null)
  } else {
    throw error
  }
}
