# SkillSwap - Micro Barter Platform for Skills

SkillSwap is a dynamic web platform that enables students and professionals to exchange skills directly—facilitating a barter-based system without money. Users can offer a skill (like code review, resume writing, design feedback) in exchange for another skill, promoting peer-to-peer learning and collaboration.

## Features

- **Profile Management**: Create profiles with skills you offer and skills you need
- **Skill Listings**: Post offers and requests with categories, urgency, and expiry dates
- **Smart Matching**: Intelligent algorithm matches users with complementary skills
- **Real-time Chat**: WebSocket-powered messaging system for negotiations
- **Rating System**: Peer reviews and reputation tracking
- **Authentication**: Secure OAuth authentication with Clerk (Google, GitHub, LinkedIn)

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes, Apollo Server, GraphQL
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **Real-time**: WebSocket support with Socket.io (to be implemented)

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Clerk account (for authentication)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Skill-swap
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your:
- `DATABASE_URL` (PostgreSQL connection string)
- Clerk API keys (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`)

4. Set up the database:
```bash
npx prisma migrate dev
npx prisma generate
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
/
├── app/                    # Next.js app router pages
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Protected dashboard pages
│   │   ├── dashboard/     # Main dashboard
│   │   ├── profile/       # Profile management
│   │   ├── listings/      # Create/manage listings
│   │   ├── marketplace/   # Browse marketplace
│   │   ├── matches/       # View matches
│   │   └── messages/      # Chat interface
│   └── api/               # API routes
│       └── graphql/       # GraphQL endpoint
├── components/             # React components
│   ├── layout/            # Layout components
│   ├── profile/           # Profile components
│   ├── listings/          # Listing components
│   ├── marketplace/       # Marketplace components
│   ├── matching/          # Matching components
│   ├── chat/              # Chat components
│   └── ratings/           # Rating components
├── lib/                    # Utilities and configurations
│   ├── prisma.ts          # Prisma client
│   ├── graphql/           # GraphQL schema and resolvers
│   └── clerk.ts           # Clerk configuration
├── types/                  # TypeScript type definitions
├── hooks/                  # Custom React hooks
├── prisma/                 # Database schema
│   └── schema.prisma      # Prisma schema
└── middleware.ts          # Authentication middleware
```

## Database Schema

The database includes the following main models:

- **User**: User profiles with skills and reputation
- **Listing**: Skill offers and requests
- **Match**: Matches between users and listings
- **Message**: Chat messages for negotiations
- **Rating**: User ratings and feedback
- **Notification**: System notifications
- **Skill**: Available skills catalog

## Key Features in Development

- [ ] WebSocket real-time chat implementation
- [ ] Intelligent matching algorithm
- [ ] Notification system
- [ ] Rating flow after completed swaps
- [ ] Portfolio upload and linking
- [ ] Search and filtering enhancements
- [ ] Skill validation and badges
- [ ] Gamification system

## Contributing

This is a work in progress. Contributions and suggestions are welcome!

## License

MIT
