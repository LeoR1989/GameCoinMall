import { getTranslations } from 'next-intl/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import CheckoutForm from './CheckoutForm';

async function getProduct(id: string) {
    return await prisma.product.findUnique({ where: { id } });
}

export default async function CheckoutPage({ params: { id, locale } }: { params: { id: string, locale: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect(`/${locale}/login?callbackUrl=/${locale}/checkout/${id}`);
    }

    const product = await getProduct(id);
    if (!product) {
        return <div>Product not found</div>;
    }

    const t = await getTranslations('Checkout');

    return (
        <div className="glass-panel" style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', borderRadius: '16px' }}>
            <h1 style={{ marginBottom: '2rem' }}>{t('title')}</h1>
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', alignItems: 'center' }}>
                <div style={{
                    width: '120px',
                    height: '72px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    flexShrink: 0
                }}>
                    {product.image ? (
                        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <div style={{ width: '100%', height: '100%', background: 'var(--bg-secondary)' }} />
                    )}
                </div>
                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{product.name}</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>{product.currencyAmount} UC</p>
                </div>
            </div>

            <CheckoutForm product={product} locale={locale} />
        </div>
    );
}
