import { prisma } from '../prisma'
import { typeDefs } from './schema'

export const resolvers = {
  Query: {
    listings: async (_: any, { filter }: { filter?: string }) => {
      const where = filter ? JSON.parse(filter) : {}
      return await prisma.listing.findMany({
        where,
        include: {
          user: true,
          matches: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    },

    listing: async (_: any, { id }: { id: string }) => {
      return await prisma.listing.findUnique({
        where: { id },
        include: {
          user: true,
          matches: true,
        },
      })
    },

    matches: async () => {
      return await prisma.match.findMany({
        include: {
          listing: {
            include: {
              user: true,
            },
          },
          matchedUser: true,
          messages: {
            orderBy: {
              createdAt: 'asc',
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    },

    match: async (_: any, { id }: { id: string }) => {
      return await prisma.match.findUnique({
        where: { id },
        include: {
          listing: {
            include: {
              user: true,
            },
          },
          matchedUser: true,
          messages: {
            orderBy: {
              createdAt: 'asc',
            },
          },
        },
      })
    },

    messages: async (_: any, { matchId }: { matchId: string }) => {
      return await prisma.message.findMany({
        where: { matchId },
        include: {
          sender: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      })
    },

    notifications: async () => {
      return await prisma.notification.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          read: false,
        },
      })
    },

    skillCategories: async () => {
      const categories = await prisma.skill.findMany({
        select: {
          category: true,
        },
        distinct: ['category'],
      })
      return categories.map((c: { category: string }) => c.category)
    },

    popularSkills: async () => {
      return await prisma.skill.findMany({
        orderBy: {
          popularity: 'desc',
        },
        take: 20,
      })
    },
  },

  Mutation: {
    createListing: async (_: any, { input }: any) => {
      // TODO: Get userId from auth context
      const userId = 'placeholder-user-id'
      return await prisma.listing.create({
        data: {
          ...input,
          userId,
        },
        include: {
          user: true,
        },
      })
    },

    updateListing: async (_: any, { id, input }: any) => {
      return await prisma.listing.update({
        where: { id },
        data: input,
        include: {
          user: true,
        },
      })
    },

    deleteListing: async (_: any, { id }: any) => {
      return await prisma.listing.delete({
        where: { id },
        include: {
          user: true,
        },
      })
    },

    createMatch: async (_: any, { listingId }: { listingId: string }) => {
      // TODO: Get userId from auth context
      const userId = 'placeholder-user-id'
      
      // Check if match already exists
      const existingMatch = await prisma.match.findFirst({
        where: {
          listingId,
          userId,
        },
      })

      if (existingMatch) {
        throw new Error('Match already exists')
      }

      const match = await prisma.match.create({
        data: {
          listingId,
          userId,
        },
        include: {
          listing: {
            include: {
              user: true,
            },
          },
          matchedUser: true,
        },
      })

      // Create notification for listing owner
      await prisma.notification.create({
        data: {
          userId: match.listing.userId,
          type: 'match',
          title: 'New Match!',
          message: `${match.matchedUser.name} wants to swap with you`,
          link: `/matches/${match.id}`,
        },
      })

      return match
    },

    acceptMatch: async (_: any, { matchId }: { matchId: string }) => {
      return await prisma.match.update({
        where: { id: matchId },
        data: { status: 'accepted' },
        include: {
          listing: {
            include: {
              user: true,
            },
          },
          matchedUser: true,
        },
      })
    },

    rejectMatch: async (_: any, { matchId }: { matchId: string }) => {
      return await prisma.match.update({
        where: { id: matchId },
        data: { status: 'rejected' },
        include: {
          listing: {
            include: {
              user: true,
            },
          },
          matchedUser: true,
        },
      })
    },

    completeMatch: async (_: any, { matchId }: { matchId: string }) => {
      return await prisma.match.update({
        where: { id: matchId },
        data: { status: 'completed' },
        include: {
          listing: {
            include: {
              user: true,
            },
          },
          matchedUser: true,
        },
      })
    },

    sendMessage: async (_: any, { matchId, content }: any) => {
      // TODO: Get senderId from auth context
      const senderId = 'placeholder-user-id'
      
      const message = await prisma.message.create({
        data: {
          matchId,
          senderId,
          content,
        },
        include: {
          sender: true,
        },
      })

      // Create notification
      const match = await prisma.match.findUnique({
        where: { id: matchId },
      })

      if (match && match.userId !== senderId) {
        await prisma.notification.create({
          data: {
            userId: match.userId,
            type: 'message',
            title: 'New Message',
            message: content.slice(0, 50),
            link: `/messages/${matchId}`,
          },
        })
      }

      return message
    },

    createRating: async (_: any, { input }: any) => {
      // TODO: Get fromUserId from auth context
      const fromUserId = 'placeholder-user-id'

      const rating = await prisma.rating.create({
        data: {
          ...input,
          fromUserId,
        },
        include: {
          fromUser: true,
          toUser: true,
        },
      })

      // Update user reputation
      const allRatings = await prisma.rating.findMany({
        where: { toUserId: rating.toUserId },
      })

      const averageRating =
        allRatings.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / allRatings.length

      await prisma.user.update({
        where: { id: rating.toUserId },
        data: { reputation: averageRating },
      })

      return rating
    },

    markNotificationRead: async (_: any, { notificationId }: any) => {
      return await prisma.notification.update({
        where: { id: notificationId },
        data: { read: true },
      })
    },
  },
}
