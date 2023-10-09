import './globals.css'
import { Inter } from 'next/font/google'
import {Providers} from "@/app/providers";
import localFont from 'next/font/local'

const inter = Inter({
    subsets: ['latin'],
})

const script = localFont({
    src: '../assets/script.woff',
    display: 'swap',
    variable: '--font-script',
})

export const metadata = {
  title: 'Storefront',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${script.variable}`}>
          <Providers>
              {children}
          </Providers>
      </body>
    </html>
  )
}
