import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const products = [
        { name: '60 UC', price: 0.99, currencyAmount: 60, image: '/uploads/uc_small.png' },
        { name: '300+25 UC', price: 4.99, currencyAmount: 325, image: '/uploads/uc_small.png' },
        { name: '600+60 UC', price: 9.99, currencyAmount: 660, image: '/uploads/uc_small.png' },
        { name: '1500+300 UC', price: 24.99, currencyAmount: 1800, image: '/uploads/uc_medium.png' },
        { name: '3000+850 UC', price: 49.99, currencyAmount: 3850, image: '/uploads/uc_medium.png' },
        { name: '6000+2100 UC', price: 99.99, currencyAmount: 8100, image: '/uploads/uc_medium.png' },
        { name: '12000+4200 UC', price: 199.99, currencyAmount: 16200, image: '/uploads/uc_large.png' },
        { name: '18000+6300 UC', price: 299.99, currencyAmount: 24300, image: '/uploads/uc_large.png' },
        { name: '24000+8400 UC', price: 399.99, currencyAmount: 32400, image: '/uploads/uc_large.png' },
        { name: '30000+10500 UC', price: 499.99, currencyAmount: 40500, image: '/uploads/uc_large.png' },
    ]

    for (const p of products) {
        await prisma.product.create({
            data: p
        })
    }

    // Create admin user
    // Note: In a real app, use bcryptjs to hash. For simplicity in this environment without running npm install, 
    // we will assume the user will install dependencies.
    // We need to import hash but we can't easily if we are just writing the file.
    // Let's use a placeholder hash or try to import if we can.
    // Actually, let's just create a user and let the user know the password is 'admin123' 
    // but we need to hash it for the login to work because auth.ts uses compare().
    // I'll add the import.

    const { hash } = require('bcryptjs');
    const password = await hash('admin123', 10);

    await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            password,
            role: 'ADMIN'
        }
    });

    console.log('Seeded products and admin user (admin@example.com / admin123)')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
