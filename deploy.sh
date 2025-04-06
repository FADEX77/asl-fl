#!/bin/bash

# Build the application
echo "Building the application..."
npm run build

# Push database schema
echo "Pushing database schema..."
npx prisma db push

# Seed the database
echo "Seeding the database..."
npx prisma db seed

# Deploy to Vercel
echo "Deploying to Vercel..."
npx vercel --prod

echo "Deployment complete!"

