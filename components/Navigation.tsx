'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';

export default function Navigation({ locale }: { locale: string }) {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = useSession();
    const t = useTranslations('Navigation');

    const switchLocale = (newLocale: string) => {
        // Simple replace for demo. In production, we should preserve the path segments correctly.
        // Assuming path starts with /locale
        const segments = pathname.split('/');
        segments[1] = newLocale;
        const path = segments.join('/');
        router.push(path);
    };

    return (
        <nav className="glass-panel desktop-nav" style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            padding: '1rem 0',
            marginBottom: '2rem',
            borderBottom: '1px solid var(--glass-border)',
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            borderRadius: 0
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <Link href={`/${locale}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                        <img src="/logo.png" alt="PUBG Shop Logo" style={{ height: '40px', width: 'auto' }} />
                        <span style={{
                            fontWeight: '800',
                            fontSize: '1.5rem',
                            color: 'var(--accent-color)',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            {t('brand')}
                        </span>
                    </Link>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <Link href={`/${locale}`} className="nav-link" style={{ color: 'var(--text-secondary)' }}>{t('home')}</Link>
                        {session && <Link href={`/${locale}/orders`} className="nav-link" style={{ color: 'var(--text-secondary)' }}>{t('orders')}</Link>}
                        {session?.user?.role === 'ADMIN' && (
                            <>
                                <Link href={`/${locale}/admin`} className="nav-link" style={{ color: 'var(--text-secondary)' }}>{t('admin')}</Link>
                                <Link href={`/${locale}/admin/products`} className="nav-link" style={{ color: 'var(--text-secondary)' }}>{t('products')}</Link>
                                <Link href={`/${locale}/admin/finance`} className="nav-link" style={{ color: 'var(--text-secondary)' }}>{t('finance')}</Link>
                            </>
                        )}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <select
                        value={locale}
                        onChange={(e) => switchLocale(e.target.value)}
                        style={{
                            padding: '0.4rem 0.8rem',
                            borderRadius: '20px',
                            border: '1px solid var(--glass-border)',
                            background: 'rgba(0,0,0,0.2)',
                            color: 'var(--text-secondary)',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="en">English</option>
                        <option value="zh">中文</option>
                        <option value="ar">العربية</option>
                    </select>

                    {session ? (
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{session.user?.email}</span>
                            <button onClick={() => signOut()} className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>{t('logout')}</button>
                        </div>
                    ) : (
                        <Link href={`/${locale}/login`} className="btn btn-primary">{t('login')}</Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
