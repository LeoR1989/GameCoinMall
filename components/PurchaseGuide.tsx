'use client';

import { useTranslations } from 'next-intl';

export default function PurchaseGuide() {
    const t = useTranslations('PurchaseGuide');

    return (
        <div className="glass-panel" style={{
            margin: '0 auto 4rem auto',
            maxWidth: '1200px',
            background: 'rgba(30, 41, 59, 0.6)',
            border: '1px solid rgba(255,255,255,0.1)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            minHeight: '100px'
        }}>
            {/* Title Section */}
            <div style={{
                background: 'rgba(59, 130, 246, 0.15)',
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '200px',
                position: 'relative',
                borderRight: '1px solid rgba(255,255,255,0.05)',
                flexShrink: 0
            }}>
                <h2 style={{
                    margin: 0,
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    fontStyle: 'italic',
                    color: '#fff',
                    textAlign: 'center',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>
                    {t('title')}
                </h2>
                {/* Arrow indicator */}
                <div style={{
                    position: 'absolute',
                    right: '-12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 0,
                    height: 0,
                    borderTop: '12px solid transparent',
                    borderBottom: '12px solid transparent',
                    borderLeft: '12px solid rgba(59, 130, 246, 0.3)',
                    zIndex: 10
                }} />
            </div>

            {/* Steps Container */}
            <div style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: '1.5rem 2rem',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <Step number="1" title={t('step1_title')} desc={t('step1_desc')} />
                <Chevron />
                <Step number="2" title={t('step2_title')} desc={t('step2_desc')} />
                <Chevron />
                <Step number="3" title={t('step3_title')} desc={t('step3_desc')} />
            </div>
        </div>
    );
}

function Step({ number, title, desc }: { number: string, title: string, desc: string }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', maxWidth: '220px' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--primary-blue)', fontWeight: 700, textTransform: 'uppercase' }}>
                {title}
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 500, lineHeight: '1.4', color: '#e2e8f0' }}>
                {desc}
            </div>
        </div>
    );
}

function Chevron() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', opacity: 0.4 }}>
            <svg width="24" height="48" viewBox="0 0 24 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 12L20 24L8 36" stroke="var(--primary-blue)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    );
}
