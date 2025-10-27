'use client'

import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-white mb-6">
            SkillSwap
          </h1>
          <p className="text-2xl text-blue-100 mb-8">
            Exchange skills with students and professionals. No money needed.
          </p>
          <p className="text-lg text-white/90 mb-12">
            A micro-barter platform that connects people to share knowledge, 
            review work, and grow together through peer-to-peer skill exchange.
          </p>

          <SignedOut>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SignInButton mode="modal">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors inline-flex items-center">
                  Get Started
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </button>
              </SignInButton>
            </div>
          </SignedOut>

          <SignedIn>
            <Link href="/dashboard">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors inline-flex items-center">
                Go to Dashboard
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </SignedIn>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Skill Exchange
              </h3>
              <p className="text-blue-100">
                Offer your skills and request help from others in a barter system
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Smart Matching
              </h3>
              <p className="text-blue-100">
                AI-powered matching connects you with the right skill partners
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Build Reputation
              </h3>
              <p className="text-blue-100">
                Earn ratings, badges, and trust through quality exchanges
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}