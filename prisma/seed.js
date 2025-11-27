const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

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
    ];

    console.log('Seeding products...');
    for (const p of products) {
        await prisma.product.create({ data: p });
    }

    console.log('Seeding admin user...');
    // Hash for 'admin123'
    const password = '$2a$12$aUVAsoiDXVK44l5SiA7t1OSd7qQD/rQSeB4QZ5R4QN8JtcO2xkkCu';

    await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            password,
            role: 'ADMIN'
        }
    });

    console.log('Seeding completed.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
