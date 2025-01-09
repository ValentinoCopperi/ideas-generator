'use client'

import Container from '@/components/Container'
import { usePathname } from 'next/navigation'
import AuthBanner from './_components/auth-banner'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const getTitle = () => {
    if (pathname?.endsWith('/register')) {
      return 'Register'
    } else if (pathname?.endsWith('/signup')) {
      return 'Sign In'
    } else {
      return 'Authentication'
    }
  }


  return (
    <Container>
      <h1 className="text-3xl font-bold text-center mt-6 mb-4">
        Welcome to Next Idea
      </h1>
      <p className="text-center max-w-lg mx-auto mb-8">
        {getTitle()} to unlock and start generating groundbreaking AI project ideas. Save the best ones for your next big innovation!
      </p>
      <div className="flex flex-col lg:flex-row lg:justify-around space-x-7  min-h-[70vh]">
        <div className=" w-full lg:w-[60%]">
          <AuthBanner title={getTitle()} />
        </div>
        <div className=" w-[90%]  lg:m-0 lg:w-[40%]">
          {children}
        </div>
      </div>
    </Container>
  )
}