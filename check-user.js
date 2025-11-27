const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.findUnique({
        where: { email: 'admin@example.com' }
    });
    console.log('Admin user found:', user ? 'YES' : 'NO');
    if (user) {
        console.log('Role:', user.role);
        console.log('Password Hash:', user.password);
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
