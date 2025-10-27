'use client'

import { UserButton } from '@clerk/nextjs'
import NotificationBell from './NotificationBell'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-800">SkillSwap</h2>
        </div>
        <div className="flex items-center space-x-4">
          <NotificationBell />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  )
}
