# SkillSwap Setup Guide

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   
   Create a `.env.local` file with:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/skillswap?schema=public"
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Set up the database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open http://localhost:3000**

## Getting API Keys

### Clerk Authentication

1. Go to [https://clerk.com](https://clerk.com)
2. Sign up for a free account
3. Create a new application
4. Copy the publishable key and secret key to your `.env.local` file
5. Configure OAuth providers (Google, GitHub, LinkedIn) in the Clerk dashboard

### PostgreSQL Database

**Option 1: Local PostgreSQL**
- Install PostgreSQL on your machine
- Create a database named `skillswap`
- Use the connection string: `postgresql://user:password@localhost:5432/skillswap`

**Option 2: Free Cloud Database (Recommended for development)**
- Use [Supabase](https://supabase.com) (free PostgreSQL)
- Create a new project
- Copy the connection string from Settings > Database
- Replace the password with your database password

## Next Steps

Once the basic setup is complete, you can:

1. **Configure Clerk OAuth providers** in the Clerk dashboard
2. **Seed the database** with initial skills (optional):
   ```bash
   npx prisma db seed
   ```
3. **Test the application** by creating an account and posting a listing

## Troubleshooting

### Database connection issues
- Make sure PostgreSQL is running
- Check that the DATABASE_URL is correct
- Try running `npx prisma studio` to view the database

### Clerk authentication errors
- Ensure your Clerk keys are correct
- Check that the redirect URLs are configured in Clerk dashboard
- Make sure the OAuth providers are enabled in Clerk

### Build errors
- Delete `node_modules` and `.next` folder
- Run `npm install` again
- Run `npx prisma generate` to regenerate Prisma client
