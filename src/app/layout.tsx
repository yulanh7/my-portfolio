import type { Metadata } from 'next'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import ParticleBackground from '@/components/ParticleBackground'

export const metadata: Metadata = {
  title: 'Rachel Huang · Full-Stack Developer · Canberra',
  description:
    'Full-stack developer with 5+ years building React and Next.js applications. Based in Canberra, Australia. Open to new opportunities.',
  keywords: ['React', 'Next.js', 'TypeScript', 'Full-Stack Developer', 'Canberra'],
  authors: [{ name: 'Rachel Huang' }],
  openGraph: {
    title: 'Rachel Huang · Full-Stack Developer',
    description: 'Full-stack developer based in Canberra, Australia.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Decorative left sidebar stripe */}
        <div className="sidebar-stripe" aria-hidden="true" />

        {/* Animated blob backgrounds */}
        <div className="blob-bg"  aria-hidden="true" />
        <div className="blob-bg-2" aria-hidden="true" />

        {/* Particle canvas (client component) */}
        <ParticleBackground />

        {/* Custom cursor (client component) */}
        <CustomCursor />

        {/* Page content */}
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  )
}
