import { getTranslations, getLocale } from 'next-intl/server';
import Link from 'next/link';

interface Product {
    id: string;
    name: string;
    price: number;
    currencyAmount: number;
    description: string | null;
    image: string | null;
}

export default async function ProductCard({ product }: { product: Product }) {
    const t = await getTranslations('Index');
    const locale = await getLocale();

    return (
        <div className="glass-panel" style={{
            borderRadius: '12px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            transition: 'transform 0.2s, box-shadow 0.2s',
            height: '100%'
        }}>
            {product.image ? (
                <div style={{
                    width: '100%',
                    height: '180px',
                    position: 'relative',
                    marginBottom: '0.5rem',
                    borderRadius: '8px',
                    overflow: 'hidden'
                }}>
                    <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
            ) : (
                <div style={{
                    width: '100%',
                    height: '180px',
                    marginBottom: '0.5rem',
                    borderRadius: '8px',
                    background: 'linear-gradient(45deg, #23262f, #1a1c23)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)'
                }}>
                    No Image
                </div>
            )}

            <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{product.name}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{product.currencyAmount} UC</p>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent-color)' }}>
                    ${product.price.toFixed(2)}
                </div>
                <Link href={`/${locale}/checkout/${product.id}`} className="btn btn-primary" style={{ textDecoration: 'none' }}>
                    {t('buy')}
                </Link>
            </div>
        </div>
    );
}
