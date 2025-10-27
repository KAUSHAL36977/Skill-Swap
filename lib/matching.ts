import { prisma } from './prisma'
import { type Listing, type User } from '@/types'

/**
 * Intelligent matching algorithm for SkillSwap
 * Matches users based on:
 * 1. Skill overlap and complementarity (50%)
 * 2. User reputation (30%)
 * 3. Time sensitivity of listing (20%)
 */
export async function findMatches(listingId: string, currentUserId: string) {
  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
    include: { user: true },
  })

  if (!listing) {
    throw new Error('Listing not found')
  }

  // Get all active listings that are opposite type
  const oppositeType = listing.type === 'offer' ? 'request' : 'offer'
  const candidateListings = await prisma.listing.findMany({
    where: {
      type: oppositeType,
      active: true,
      userId: { not: currentUserId }, // Don't match with yourself
    },
    include: {
      user: true,
      matches: true,
    },
  })

  const matches: {
    listing: Listing
    score: number
    reasons: string[]
  }[] = []

  for (const candidate of candidateListings) {
    let score = 0
    const reasons: string[] = []

    // 1. Skill Complementarity (50% weight)
    const skillMatch = calculateSkillMatch(listing.skills, candidate.skills)
    score += skillMatch * 0.5
    reasons.push(`Skill match: ${(skillMatch * 100).toFixed(0)}%`)

    // 2. User Reputation (30% weight)
    const reputationScore = Math.min(candidate.user.reputation / 5, 1) // Normalize 0-1
    score += reputationScore * 0.3
    reasons.push(`Reputation: ${candidate.user.reputation.toFixed(1)}/5.0`)

    // 3. Time Sensitivity (20% weight)
    const urgencyScores: Record<string, number> = {
      high: 1.0,
      medium: 0.7,
      low: 0.4,
    }
    const urgency = candidate.urgency || 'medium'
    score += urgencyScores[urgency] * 0.2
    reasons.push(`Urgency: ${urgency}`)

    matches.push({
      listing: candidate,
      score,
      reasons,
    })
  }

  // Sort by score (highest first)
  matches.sort((a, b) => b.score - a.score)

  // Return top 10 matches
  return matches.slice(0, 10)
}

/**
 * Calculate skill match percentage between two skill arrays
 */
function calculateSkillMatch(skills1: string[], skills2: string[]): number {
  if (skills1.length === 0 || skills2.length === 0) return 0

  // Normalize skills to lowercase for comparison
  const normalized1 = skills1.map(s => s.toLowerCase().trim())
  const normalized2 = skills2.map(s => s.toLowerCase().trim())

  // Count matches
  let matches = 0
  for (const skill1 of normalized1) {
    if (normalized2.includes(skill1)) {
      matches++
    }
  }

  // Calculate Jaccard similarity (intersection / union)
  const totalUniqueSkills = new Set([...normalized1, ...normalized2]).size
  return matches / totalUniqueSkills
}

/**
 * Create a match between a listing and a user
 */
export async function createMatch(listingId: string, matchedUserId: string) {
  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
  })

  if (!listing) {
    throw new Error('Listing not found')
  }

  // Check if match already exists
  const existingMatch = await prisma.match.findFirst({
    where: {
      listingId,
      userId: matchedUserId,
    },
  })

  if (existingMatch) {
    return existingMatch
  }

  // Create new match
  const match = await prisma.match.create({
    data: {
      listingId,
      userId: matchedUserId,
      status: 'pending',
    },
    include: {
      listing: true,
      matchedUser: true,
    },
  })

  // Create notification for listing owner
  await prisma.notification.create({
    data: {
      userId: listing.userId,
      type: 'match',
      title: 'New Match!',
      message: `Someone wants to swap with you`,
      link: `/matches/${match.id}`,
    },
  })

  return match
}

/**
 * Get complementary skills for a user's listing
 * Finds skills in high demand that complement what the user is offering
 */
export async function getRecommendedSkills(currentSkills: string[]) {
  const allSkills = await prisma.skill.findMany({
    orderBy: { popularity: 'desc' },
    take: 50,
  })

  // Filter out skills the user already has
  const availableSkills = allSkills.filter(
    skill => !currentSkills.some(
      current => current.toLowerCase().trim() === skill.name.toLowerCase().trim()
    )
  )

  return availableSkills.slice(0, 10)
}
