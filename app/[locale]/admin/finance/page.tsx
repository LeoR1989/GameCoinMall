'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function FinancePage() {
    const t = useTranslations('Finance');
    const [stats, setStats] = useState<{ totalRevenue: number; totalOrders: number; totalUsers: number } | null>(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchStats = () => {
        let url = '/api/admin/stats';
        if (startDate && endDate) {
            url += `?startDate=${startDate}&endDate=${endDate}`;
        }
        fetch(url)
            .then(res => res.json())
            .then(data => setStats(data));
    };

    useEffect(() => {
        fetchStats();
    }, []);

    if (!stats) return <div>Loading...</div>;

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <h1 style={{ marginBottom: '2rem' }}>{t('title')}</h1>

            <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>{t('startDate')}</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>{t('endDate')}</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                    />
                </div>
                <button
                    onClick={fetchStats}
                    className="btn btn-primary"
                    style={{ height: '38px' }}
                >
                    {t('filter')}
                </button>
            </div>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div className="glass-panel" style={{
                    padding: '2rem',
                    borderRadius: '12px',
                    minWidth: '250px',
                    flex: 1
                }}>
                    <h3 style={{ color: 'var(--text-secondary)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {t('totalRevenue')}
                    </h3>
                    <p style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--accent-color)', marginTop: '0.5rem' }}>
                        ${stats.totalRevenue.toFixed(2)}
                    </p>
                </div>
                <div className="glass-panel" style={{
                    padding: '2rem',
                    borderRadius: '12px',
                    minWidth: '250px',
                    flex: 1
                }}>
                    <h3 style={{ color: 'var(--text-secondary)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {t('totalOrders')}
                    </h3>
                    <p style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '0.5rem' }}>
                        {stats.totalOrders}
                    </p>
                </div>
                <div className="glass-panel" style={{
                    padding: '2rem',
                    borderRadius: '12px',
                    minWidth: '250px',
                    flex: 1
                }}>
                    <h3 style={{ color: 'var(--text-secondary)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {t('totalUsers')}
                    </h3>
                    <p style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '0.5rem' }}>
                        {stats.totalUsers}
                    </p>
                </div>
            </div>
        </div>
    );
}
