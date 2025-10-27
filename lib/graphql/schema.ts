export const typeDefs = `
  type User {
    id: ID!
    clerkId: String!
    email: String!
    name: String!
    bio: String
    avatar: String
    portfolioUrl: String
    reputation: Float!
    completedSwaps: Int!
    skillsOffered: [String!]!
    skillsSought: [String!]!
    badges: [String!]!
    createdAt: String!
    updatedAt: String!
    listings: [Listing!]!
    matches: [Match!]!
  }

  type Listing {
    id: ID!
    userId: String!
    user: User
    type: String!
    title: String!
    description: String!
    skills: [String!]!
    category: String
    urgency: String
    active: Boolean!
    expiresAt: String
    createdAt: String!
    updatedAt: String!
    matches: [Match!]!
  }

  type Match {
    id: ID!
    listingId: String!
    listing: Listing
    userId: String!
    matchedUser: User
    status: String!
    createdAt: String!
    updatedAt: String!
    messages: [Message!]!
    ratings: [Rating!]!
  }

  type Message {
    id: ID!
    matchId: String!
    senderId: String!
    sender: User
    content: String!
    read: Boolean!
    createdAt: String!
  }

  type Rating {
    id: ID!
    matchId: String!
    fromUserId: String!
    fromUser: User
    toUserId: String!
    toUser: User
    rating: Int!
    comment: String
    createdAt: String!
  }

  type Notification {
    id: ID!
    userId: String!
    type: String!
    title: String!
    message: String!
    read: Boolean!
    link: String
    createdAt: String!
  }

  type Skill {
    id: ID!
    name: String!
    category: String!
    description: String
    tags: [String!]!
    popularity: Int!
    createdAt: String!
  }

  input CreateListingInput {
    type: String!
    title: String!
    description: String!
    skills: [String!]!
    category: String
    urgency: String
    expiresAt: String
  }

  input UpdateListingInput {
    title: String
    description: String
    skills: [String!]
    category: String
    urgency: String
    active: Boolean
    expiresAt: String
  }

  input CreateRatingInput {
    matchId: String!
    toUserId: String!
    rating: Int!
    comment: String
  }

  type Query {
    listings(filter: String): [Listing!]!
    listing(id: ID!): Listing
    matches: [Match!]!
    match(id: ID!): Match
    messages(matchId: ID!): [Message!]!
    userProfile: User
    users: [User!]!
    notifications: [Notification!]!
    skillCategories: [String!]!
    popularSkills: [Skill!]!
  }

  type Mutation {
    createListing(input: CreateListingInput!): Listing!
    updateListing(id: ID!, input: UpdateListingInput!): Listing!
    deleteListing(id: ID!): Listing!
    createMatch(listingId: ID!): Match!
    acceptMatch(matchId: ID!): Match!
    rejectMatch(matchId: ID!): Match!
    completeMatch(matchId: ID!): Match!
    sendMessage(matchId: ID!, content: String!): Message!
    markMessageRead(messageId: ID!): Message!
    createRating(input: CreateRatingInput!): Rating!
    markNotificationRead(notificationId: ID!): Notification!
  }

  type Subscription {
    newMatch: Match!
    newMessage(matchId: ID!): Message!
    listingUpdated(id: ID!): Listing!
  }
`.trim()
