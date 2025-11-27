import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const products = [
        { name: '60 UC', image: '/uploads/uc_small.png' },
        { name: '300+25 UC', image: '/uploads/uc_small.png' },
        { name: '600+60 UC', image: '/uploads/uc_small.png' },
        { name: '1500+300 UC', image: '/uploads/uc_medium.png' },
        { name: '3000+850 UC', image: '/uploads/uc_medium.png' },
        { name: '6000+2100 UC', image: '/uploads/uc_medium.png' },
        { name: '12000+4200 UC', image: '/uploads/uc_large.png' },
        { name: '18000+6300 UC', image: '/uploads/uc_large.png' },
        { name: '24000+8400 UC', image: '/uploads/uc_large.png' },
        { name: '30000+10500 UC', image: '/uploads/uc_large.png' },
    ];

    for (const p of products) {
        console.log(`Updating ${p.name}...`);
        await prisma.product.updateMany({
            where: { name: p.name },
            data: { image: p.image }
        });
    }

    console.log('Product images updated.');
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
