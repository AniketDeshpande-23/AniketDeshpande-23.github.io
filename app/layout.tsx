import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aniket Deshpande – AI Engineer',
  description:
    'MSc AI & Robotics · Working Student Gen AI @ Allianz · LLMs · RAG · Edge AI',
  openGraph: {
    title: 'Aniket Deshpande – AI Engineer',
    description: 'Portfolio of Aniket Deshpande — AI engineer specialising in LLMs, RAG, and edge deployment.',
    url: 'https://aniketdeshpande-23.github.io',
    siteName: 'Aniket Deshpande Portfolio',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
