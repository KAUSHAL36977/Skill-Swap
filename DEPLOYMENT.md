# SkillSwap Deployment Guide

## Quick Deployment to Vercel

### Prerequisites
1. GitHub repository pushed (✅ Done)
2. Vercel account
3. Clerk account for authentication
4. PostgreSQL database (Supabase recommended)

### Step 1: Set up Clerk Authentication

1. Go to [https://clerk.com](https://clerk.com) and sign up
2. Create a new application
3. Copy your keys from the API Keys page:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (pk_test_...)
   - `CLERK_SECRET_KEY` (sk_test_...)
4. Configure OAuth providers:
   - Google OAuth
   - GitHub OAuth
   - LinkedIn OAuth

### Step 2: Set up PostgreSQL Database

**Option A: Supabase (Free)**
1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project
3. Copy the connection string from Settings > Database
4. It will look like: `postgresql://postgres:password@host:5432/postgres`

**Option B: Railway (Free)**
1. Go to [https://railway.app](https://railway.app)
2. Create a PostgreSQL instance
3. Copy the connection string

### Step 3: Deploy to Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository: `https://github.com/KAUSHAL36977/Skill-Swap.git`
4. Configure Environment Variables:
   ```
   DATABASE_URL=postgresql://...
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```
5. Click "Deploy"

### Step 4: Run Database Migrations

After deployment:

1. Go to Vercel project settings
2. Navigate to "Functions" or use the Vercel CLI
3. Run migrations via Vercel CLI:
   ```bash
   vercel env pull .env.local
   npx prisma migrate deploy
   ```

Or use the Supabase SQL editor to run the Prisma migration SQL.

### Step 5: Configure Clerk Redirect URLs

In Clerk Dashboard:
- Add your Vercel URL to allowed redirect URLs:
  - `https://your-app.vercel.app`
  - `https://your-app.vercel.app/dashboard`

## Local Development Setup

### 1. Clone and Install
```bash
git clone https://github.com/KAUSHAL36977/Skill-Swap.git
cd Skill-swap
npm install
```

### 2. Environment Setup
Create `.env.local`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/skillswap"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup
```bash
npx prisma migrate dev
npx prisma generate
```

### 4. Run Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

## Build Notes

⚠️ **Important**: The app currently requires Clerk API keys to build. This is normal for protected routes.

To build locally with mock keys (for testing only):
```bash
# In .env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_placeholder
CLERK_SECRET_KEY=sk_test_placeholder
```

## Troubleshooting

### Build Error: Clerk publishableKey
- Get real Clerk keys from https://dashboard.clerk.com

### Database Connection Issues
- Check your DATABASE_URL is correct
- Ensure PostgreSQL is running
- Test connection: `npx prisma studio`

### Module Not Found
- Delete `node_modules` and `.next`
- Run `npm install` again

## Next Steps

1. Get Clerk API keys
2. Set up PostgreSQL database
3. Deploy to Vercel
4. Run database migrations
5. Configure Clerk redirect URLs
6. Test the application

## What's Working

✅ Authentication with Clerk  
✅ Profile management  
✅ Skill listings  
✅ Marketplace  
✅ Intelligent matching  
✅ Chat UI  
✅ Rating system  
✅ Notifications  
✅ Database schema  

## What Needs Connection

🔧 Connect UI to actual data (replace mock data)  
🔧 Implement GraphQL API endpoint  
🔧 Add WebSocket for real-time chat  
🔧 Deploy and configure environment  

---

For questions or issues, check the main README.md or project documentation.
