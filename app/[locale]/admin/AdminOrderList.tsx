'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface Order {
    id: string;
    status: string;
    user: { email: string };
    product: { name: string };
    createdAt: Date | string;
    deliveryEmail?: string | null;
    quantity?: number;
    price: number;
}

import { useToast } from '@/components/ToastContext';

export default function AdminOrderList({ orders }: { orders: Order[] }) {
    const t = useTranslations('Admin');
    const { showToast } = useToast();
    const [orderList, setOrderList] = useState(orders);
    const [orderToConfirm, setOrderToConfirm] = useState<Order | null>(null);

    const initiateShipping = (order: Order) => {
        setOrderToConfirm(order);
    };

    const confirmShipping = async () => {
        if (!orderToConfirm) return;

        const res = await fetch(`/api/admin/orders/${orderToConfirm.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'SHIPPED' })
        });

        if (res.ok) {
            setOrderList(orderList.map(o => o.id === orderToConfirm.id ? { ...o, status: 'SHIPPED' } : o));
            showToast('Order updated and email sent (simulated)', 'success');
        } else {
            showToast('Failed to update order status', 'error');
        }
        setOrderToConfirm(null);
    };

    return (
        <>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                <thead>
                    <tr style={{ background: 'var(--bg-secondary)', textAlign: 'left' }}>
                        <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{t('orderId')}</th>
                        <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{t('user')}</th>
                        <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{t('deliveryEmail')}</th>
                        <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{t('product')}</th>
                        <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{t('quantity')}</th>
                        <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{t('totalPrice')}</th>
                        <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{t('status')}</th>
                        <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{t('actions')}</th>
                    </tr>
                </thead>
                <tbody>
                    {orderList.map(order => (
                        <tr key={order.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                            <td style={{ padding: '1rem' }}>{order.id.substring(0, 8)}...</td>
                            <td style={{ padding: '1rem' }}>{order.user.email}</td>
                            <td style={{ padding: '1rem' }}>{order.deliveryEmail || '-'}</td>
                            <td style={{ padding: '1rem' }}>{order.product.name}</td>
                            <td style={{ padding: '1rem' }}>{order.quantity || 1}</td>
                            <td style={{ padding: '1rem' }}>${(order.price * (order.quantity || 1)).toFixed(2)}</td>
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
                            <td style={{ padding: '1rem' }}>
                                {order.status === 'PAID' && (
                                    <button
                                        onClick={() => initiateShipping(order)}
                                        className="btn btn-primary"
                                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                                    >
                                        {t('markShipped')}
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {orderToConfirm && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div className="glass-panel" style={{
                        padding: '2rem',
                        borderRadius: '12px',
                        maxWidth: '400px',
                        width: '90%'
                    }}>
                        <h3 style={{ color: 'var(--text-primary)', marginTop: 0 }}>{t('markShipped')}</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            {t('confirmShip')} <strong style={{ color: 'var(--accent-color)' }}>{orderToConfirm.deliveryEmail || orderToConfirm.user.email}</strong>?
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => setOrderToConfirm(null)}
                                className="btn btn-secondary"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmShipping}
                                className="btn btn-primary"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
