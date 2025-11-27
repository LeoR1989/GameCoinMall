import { getTranslations } from 'next-intl/server';
import prisma from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';

async function getProducts() {
    try {
        return await prisma.product.findMany({
            orderBy: { price: 'asc' }
        });
    } catch (e) {
        console.error("Failed to fetch products", e);
        return [];
    }
}

export default async function Index() {
    const t = await getTranslations('Index');
    const products = await getProducts();

    return (
        <main className="container" style={{ padding: '4rem 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{
                    fontSize: '3.5rem',
                    marginBottom: '1rem',
                    background: 'linear-gradient(to right, #fff, #a1a1aa)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    {t('title')}
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                    {t('description')}
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '2rem'
            }}>
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </main>
    );
}
