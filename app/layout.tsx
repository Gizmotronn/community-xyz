import ClientProviders from "./ClientProviders"
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'


export const metadata: Metadata = {
  title: 'Health Protocol',
  description: 'Health Protocol',
  icons: {
    icon: '/hp.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}> 
      <head>
        <link rel="icon" href="/hp.svg" type="image/svg+xml" />
      </head>
      <body>
        {/* Client-only ThirdwebProvider wrapper */}
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
