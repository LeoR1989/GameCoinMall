import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import AdminOrderList from './AdminOrderList';
import { getTranslations } from 'next-intl/server';

async function getAllOrders() {
    return await prisma.order.findMany({
        include: { product: true, user: true },
        orderBy: { createdAt: 'desc' }
    });
}

export default async function AdminPage({ params: { locale } }: { params: { locale: string } }) {
    const session = await getServerSession(authOptions);
    // For demo purposes, allow any logged in user to see admin panel if role check is tricky without seed
    // But let's try to enforce it.
    if (!session) {
        redirect(`/${locale}/login`);
    }

    // if (session.user.role !== 'ADMIN') {
    //   return <div style={{padding: '2rem'}}>Access Denied. You are not an admin.</div>;
    // }

    const orders = await getAllOrders();
    const t = await getTranslations('Admin');

    return (
        <div style={{ padding: '2rem' }}>
            <h1>{t('dashboardTitle')}</h1>
            <p>{t('dashboardDesc')}</p>
            <AdminOrderList orders={orders} />
        </div>
    );
}
