#!/bin/bash

echo "🚀 Starting PUBG Currency Shop Setup..."

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed. Please install Node.js first."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🗄️ Setting up database..."
npx prisma generate
npx prisma db push

echo "🌱 Seeding database..."
npx prisma db seed

echo "✅ Setup complete!"
echo "🌐 Starting development server..."
npm run dev
