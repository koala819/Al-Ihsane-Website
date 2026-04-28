import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
}

export const Preinscriptions2027Layout = ({ children }: { children: ReactNode }) => {
  return children
}

export default Preinscriptions2027Layout