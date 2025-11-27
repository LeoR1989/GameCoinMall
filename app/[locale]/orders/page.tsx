import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { getTranslations } from 'next-intl/server';

async function getOrders(userId: string) {
    return await prisma.order.findMany({
        where: { userId },
        include: { product: true },
        orderBy: { createdAt: 'desc' }
    });
}

export default async function OrdersPage({ params: { locale } }: { params: { locale: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect(`/${locale}/login`);
    }

    const orders = await getOrders(session.user.id);
    const t = await getTranslations('Orders');

    return (
        <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '1rem' }}>
            <h1>{t('title')}</h1>
            {orders.length === 0 ? (
                <p>{t('noOrders')}</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                    <thead>
                        <tr style={{ background: 'var(--bg-secondary)', textAlign: 'left' }}>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{t('orderId')}</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{t('product')}</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{t('quantity')}</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{t('price')}</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{t('deliveryEmail')}</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{t('status')}</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{t('date')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                <td style={{ padding: '1rem' }}>{order.id.substring(0, 8)}...</td>
                                <td style={{ padding: '1rem' }}>{order.product.name}</td>
                                <td style={{ padding: '1rem' }}>{order.quantity || 1}</td>
                                <td style={{ padding: '1rem' }}>${order.price.toFixed(2)}</td>
                                <td style={{ padding: '1rem' }}>{order.deliveryEmail || '-'}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '4px',
                                        background: order.status === 'PAID' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(252, 163, 17, 0.2)',
                                        color: order.status === 'PAID' ? 'var(--success-green)' : 'var(--accent-color)',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        {t(`status_${order.status}`)}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                    {new Date(order.createdAt).toLocaleString()}
                                </td>
                            </tr>
                        ))}</tbody>
                </table>
            )}
        </div>
    );
}
