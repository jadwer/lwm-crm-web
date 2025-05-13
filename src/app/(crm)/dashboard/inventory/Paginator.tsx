// Archivo: Paginator.tsx - Parte del módulo de Inventarios (frontend)

'use client'

import Link from 'next/link'

interface PaginationLink {
  url: string | null
  label: string
  active: boolean
}

interface PaginatorProps {
  links: PaginationLink[]
  currentPage: number
}

const Paginator = ({ links, currentPage }: PaginatorProps) => {
  return (
    <nav aria-label="Navegación de páginas" className="mt-4">
      <ul className="inline-flex -space-x-px text-sm">
        {links.map((link, idx) => {
          const isDisabled = link.url === null
          const isActive = link.active

          const label = link.label
            .replace('&laquo;', '«')
            .replace('&raquo;', '»')
            .replace('Previo', 'Anterior')
            .replace('Siguiente', 'Siguiente')

          return (
            <li key={idx}>
              {isDisabled ? (
                <span className="px-3 py-2 ml-0 leading-tight text-gray-400 bg-white border border-gray-300 cursor-not-allowed">
                  {label}
                </span>
              ) : (
                <Link
                  href={link.url}
                  className={`px-3 py-2 ml-0 leading-tight border border-gray-300 
                    ${isActive ? 'bg-blue-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-100'}
                  `}
                >
                  {label}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Paginator
