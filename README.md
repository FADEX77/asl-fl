# All Stars League Fantasy Football

A fantasy football web application for the All Stars League, featuring teams from Computer Science, Information Technology, Accounting, and Cybersecurity departments.

## Features

- User authentication with email/password
- Team selection with position and team limits
- Transfers system with free transfers
- Boosts system (Bench Boost, Triple Captain, Unlimited Transfer, Manager Boost)
- Points calculation based on player performance
- Admin backend for managing players, teams, and gameweeks

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (for production)

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/football-fantasy-app.git
   cd football-fantasy-app
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables:
   Create a `.env` file with the following variables:
   \`\`\`
   DATABASE_URL="postgresql://username:password@localhost:5432/fantasy_football"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   \`\`\`

4. Set up the database:
   \`\`\`bash
   npx prisma db push
   npx prisma db seed
   \`\`\`

5. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## Deployment

### Deploying to Vercel

1. Push your code to GitHub

2. Connect your GitHub repository to Vercel

3. Configure the following environment variables in Vercel:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `NEXTAUTH_SECRET`: A secure random string
   - `NEXTAUTH_URL`: Your production URL

4. Deploy your application

5. After deployment, run the database migrations and seed:
   \`\`\`bash
   npx vercel env pull .env.production.local
   npx prisma db push
   npx prisma db seed
   \`\`\`

## Admin Access

The default admin credentials are:
- Email: admin@example.com
- Password: admin123

## License

This project is licensed under the MIT License - see the LICENSE file for details.

