'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import MessageList from '@/components/chat/MessageList'
import MessageThread from '@/components/chat/MessageThread'
import { type Message, type Match } from '@/types'

// Mock data - replace with actual data fetching
const mockMatches: (Match & {
  listing: { title: string }
  matchedUser: { name: string; avatar?: string }
})[] = []

const mockMessages: Message[] = []

export default function MessagesPage() {
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>(mockMessages)

  const handleSendMessage = (content: string) => {
    // Mock implementation - replace with actual API call
    const newMessage: Message = {
      id: Date.now().toString(),
      matchId: selectedMatchId || '',
      senderId: 'current-user-id',
      content,
      read: false,
      createdAt: new Date(),
    }
    setMessages([...messages, newMessage])
  }

  return (
    <DashboardLayout>
      <div className="h-full bg-white rounded-lg shadow overflow-hidden">
        <div className="flex h-[calc(100vh-200px)]">
          <MessageList
            matches={mockMatches}
            currentMatchId={selectedMatchId}
            onSelectMatch={setSelectedMatchId}
          />
          <div className="flex-1 flex flex-col">
            {selectedMatchId ? (
              <MessageThread
                matchId={selectedMatchId}
                currentUserId="current-user-id"
                messages={messages}
                onSendMessage={handleSendMessage}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-gray-500">
                    Choose a match from the sidebar to start chatting
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
