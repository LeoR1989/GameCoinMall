'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

export default function BottomNav({ locale }: { locale: string }) {
    const pathname = usePathname();
    const { data: session } = useSession();
    const t = useTranslations('Navigation');

    const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

    return (
        <div className="bottom-nav glass-panel" style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '0.8rem 0',
            borderTop: '1px solid var(--glass-border)',
            borderBottom: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            borderRadius: '16px 16px 0 0',
            backdropFilter: 'blur(20px)',
            background: 'rgba(20, 20, 25, 0.9)'
        }}>
            <Link href={`/${locale}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: isActive(`/${locale}`) && pathname === `/${locale}` ? 'var(--accent-color)' : 'var(--text-secondary)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span style={{ fontSize: '0.75rem' }}>{t('home')}</span>
            </Link>

            {session && (
                <Link href={`/${locale}/orders`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: isActive(`/${locale}/orders`) ? 'var(--accent-color)' : 'var(--text-secondary)' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="8" y1="6" x2="21" y2="6"></line>
                        <line x1="8" y1="12" x2="21" y2="12"></line>
                        <line x1="8" y1="18" x2="21" y2="18"></line>
                        <line x1="3" y1="6" x2="3.01" y2="6"></line>
                        <line x1="3" y1="12" x2="3.01" y2="12"></line>
                        <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                    <span style={{ fontSize: '0.75rem' }}>{t('orders')}</span>
                </Link>
            )}

            {session?.user?.role === 'ADMIN' ? (
                <Link href={`/${locale}/admin`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: isActive(`/${locale}/admin`) ? 'var(--accent-color)' : 'var(--text-secondary)' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                    <span style={{ fontSize: '0.75rem' }}>{t('admin')}</span>
                </Link>
            ) : (
                <Link href={session ? `/${locale}/profile` : `/${locale}/login`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: isActive(`/${locale}/login`) ? 'var(--accent-color)' : 'var(--text-secondary)' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span style={{ fontSize: '0.75rem' }}>{session ? 'Profile' : t('login')}</span>
                </Link>
            )}
        </div>
    );
}
