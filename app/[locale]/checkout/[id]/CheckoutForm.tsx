'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useToast } from '@/components/ToastContext';

import { useTranslations } from 'next-intl';

export default function CheckoutForm({ product, locale }: { product: any, locale: string }) {
    const [loading, setLoading] = useState(false);
    const [deliveryEmail, setDeliveryEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [quantity, setQuantity] = useState(1);
    const { showToast } = useToast();
    const router = useRouter();
    const t = useTranslations('Checkout');

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        setDeliveryEmail(email);
        if (!email) {
            setEmailError(t('emailRequired'));
        } else if (!validateEmail(email)) {
            setEmailError(t('invalidEmail'));
        } else {
            setEmailError('');
        }
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = parseInt(e.target.value);
        if (isNaN(val)) val = 1;
        if (val < 1) val = 1;
        if (val > 999) val = 999;
        setQuantity(val);
    };

    const handlePayment = async () => {
        if (!validateEmail(deliveryEmail)) {
            setEmailError(t('invalidEmail'));
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId: product.id, deliveryEmail, quantity })
            });

            if (res.ok) {
                showToast(t('paymentSuccess'), 'success');
                router.push(`/${locale}/orders`);
                router.refresh();
            } else {
                showToast(t('paymentFailed'), 'error');
            }
        } catch (e) {
            showToast(t('paymentFailed'), 'error');
        } finally {
            setLoading(false);
        }
    };

    const isPayDisabled = !deliveryEmail || !!emailError || loading;

    return (
        <div>
            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                    {t('quantity')}
                </label>
                <input
                    type="number"
                    min="1"
                    max="999"
                    value={quantity}
                    onChange={handleQuantityChange}
                    style={{
                        width: '100%',
                        padding: '0.8rem',
                        borderRadius: '12px',
                        border: '1px solid var(--glass-border)',
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-primary)'
                    }}
                />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                    {t('deliveryEmail')} <span style={{ color: 'var(--danger-red)' }}>*</span>
                </label>
                <input
                    type="email"
                    value={deliveryEmail}
                    onChange={handleEmailChange}
                    placeholder={t('emailPlaceholder')}
                    style={{
                        width: '100%',
                        padding: '0.8rem',
                        borderRadius: '12px',
                        border: `1px solid ${emailError ? 'var(--danger-red)' : 'var(--glass-border)'}`,
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-primary)'
                    }}
                />
                {emailError && (
                    <p style={{ color: 'var(--danger-red)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                        {emailError}
                    </p>
                )}
            </div>

            <div style={{
                marginBottom: '1.5rem',
                padding: '1rem',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <span style={{ color: 'var(--text-secondary)' }}>{t('total')}</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                    ${(product.price * quantity).toFixed(2)}
                </span>
            </div>

            <button
                onClick={handlePayment}
                disabled={isPayDisabled}
                className="btn btn-primary"
                style={{
                    width: '100%',
                    padding: '1rem',
                    fontSize: '1.1rem',
                    opacity: isPayDisabled ? 0.5 : 1,
                    cursor: isPayDisabled ? 'not-allowed' : 'pointer'
                }}
                title={isPayDisabled ? (emailError || t('emailRequired')) : ''}
            >
                {loading ? 'Processing...' : `${t('pay')} $${(product.price * quantity).toFixed(2)}`}
            </button>
        </div>
    );
}
