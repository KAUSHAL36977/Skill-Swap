import { prisma } from './prisma'

export interface CreateNotificationParams {
  userId: string
  type: 'match' | 'message' | 'rating' | 'listing'
  title: string
  message: string
  link?: string
}

/**
 * Create a notification for a user
 */
export async function createNotification(params: CreateNotificationParams) {
  return await prisma.notification.create({
    data: {
      userId: params.userId,
      type: params.type,
      title: params.title,
      message: params.message,
      link: params.link,
    },
  })
}

/**
 * Mark a notification as read
 */
export async function markNotificationRead(notificationId: string) {
  return await prisma.notification.update({
    where: { id: notificationId },
    data: { read: true },
  })
}

/**
 * Mark all notifications as read for a user
 */
export async function markAllNotificationsRead(userId: string) {
  return await prisma.notification.updateMany({
    where: {
      userId,
      read: false,
    },
    data: { read: true },
  })
}

/**
 * Get notifications for a user
 */
export async function getUserNotifications(userId: string, unreadOnly = false) {
  return await prisma.notification.findMany({
    where: {
      userId,
      ...(unreadOnly ? { read: false } : {}),
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 50,
  })
}

/**
 * Get unread notification count for a user
 */
export async function getUnreadNotificationCount(userId: string) {
  return await prisma.notification.count({
    where: {
      userId,
      read: false,
    },
  })
}
