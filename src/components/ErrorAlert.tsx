// Archivo: components/ErrorAlert.tsx

type ErrorObject = Record<string, string[]>

interface Props {
  errors: ErrorObject
  className?: string
}

export default function ErrorAlert({ errors, className = '' }: Props) {
  const entries = Object.entries(errors || {})

  if (!entries.length) return null

  return (
    <div className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded ${className}`} role="alert">
      <strong className="font-bold">Errores:</strong>
      <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
        {entries.map(([field, messages]) =>
          messages.map((msg, index) => (
            <li key={`${field}-${index}`}>{msg}</li>
          ))
        )}
      </ul>
    </div>
  )
}
