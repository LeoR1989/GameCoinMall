import React, { useState, useEffect } from 'react';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (method: string) => void;
    amount: number;
    currency: string;
    t: any; // Translation function
}

const MastercardIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <circle cx="8" cy="12" r="6" fill="#EB001B" fillOpacity="0.8" />
        <circle cx="16" cy="12" r="6" fill="#F79E1B" fillOpacity="0.8" />
    </svg>
);

const VisaIcon = () => (
    <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
        <text x="0" y="16" fontSize="16" fontWeight="bold" fill="#1A1F71">VISA</text>
    </svg>
);

const JcbIcon = () => (
    <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
        <rect x="0" y="0" width="32" height="20" rx="2" fill="#fff" stroke="#000" strokeWidth="0.5" />
        <text x="4" y="14" fontSize="10" fontWeight="bold" fill="#000">JCB</text>
    </svg>
);

const DiscoverIcon = () => (
    <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
        <text x="0" y="14" fontSize="8" fontWeight="bold" fill="#FF6600">DISCOVER</text>
    </svg>
);

const DinersIcon = () => (
    <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
        <text x="0" y="14" fontSize="8" fontWeight="bold" fill="#0079BE">Diners</text>
    </svg>
);


export default function PaymentModal({ isOpen, onClose, onConfirm, amount, currency, t }: PaymentModalProps) {
    const [step, setStep] = useState<'select' | 'details' | 'processing'>('select');
    const [selectedMethod, setSelectedMethod] = useState('');

    // Form state
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expMonth, setExpMonth] = useState('');
    const [expYear, setExpYear] = useState('');
    const [cvv, setCvv] = useState('');

    useEffect(() => {
        if (isOpen) {
            setStep('select');
            setSelectedMethod('');
            // Reset form
            setCardNumber('');
            setCardHolder('');
            setExpMonth('');
            setExpYear('');
            setCvv('');
        }
    }, [isOpen]);

    const handleSelect = (method: string) => {
        setSelectedMethod(method);
        setStep('details');
    };

    const handlePay = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('processing');

        // Simulate processing delay
        setTimeout(() => {
            onConfirm(selectedMethod);
        }, 2000);
    };

    if (!isOpen) return null;

    const paymentMethods = [
        { id: 'diners', name: 'DINERSCLUB', icon: <DinersIcon /> },
        { id: 'discover', name: 'DISCOVER', icon: <DiscoverIcon /> },
        { id: 'jcb', name: 'JCB', icon: <JcbIcon /> },
        { id: 'mastercard', name: 'MASTERCARD', icon: <MastercardIcon /> },
        { id: 'visa', name: 'VISA', icon: <VisaIcon /> },
    ];

    const inputStyle = {
        width: '100%',
        padding: '0.8rem',
        borderRadius: '8px',
        border: '1px solid var(--glass-border)',
        background: 'var(--bg-secondary)',
        color: 'var(--text-primary)',
        marginTop: '0.25rem'
    };

    const labelStyle = {
        display: 'block',
        fontSize: '0.9rem',
        color: 'var(--text-secondary)',
        marginBottom: '0.25rem'
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(5px)'
        }}>
            <div style={{
                background: 'var(--bg-primary)',
                borderRadius: '16px',
                width: '90%',
                maxWidth: '500px',
                padding: '2rem',
                maxHeight: '90vh',
                overflowY: 'auto',
                border: '1px solid var(--glass-border)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
            }}>
                {step === 'select' && (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{t('selectPaymentMethod') || 'Select Payment Method'}</h2>
                            <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>×</button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            {paymentMethods.map((method, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSelect(method.id)}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '1.5rem',
                                        background: 'var(--bg-secondary)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        gap: '0.5rem'
                                    }}
                                    className="payment-method-btn"
                                >
                                    <div style={{ color: 'var(--text-primary)' }}>{method.icon}</div>
                                    <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-secondary)' }}>{method.name}</span>
                                </button>
                            ))}
                        </div>
                    </>
                )}

                {step === 'details' && (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <button onClick={() => setStep('select')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '1.2rem' }}>←</button>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Card Details</h2>
                            </div>
                            <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>×</button>
                        </div>

                        <form onSubmit={handlePay}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={labelStyle}>Card Number <span style={{ color: 'red' }}>*</span></label>
                                <input
                                    type="text"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    style={inputStyle}
                                    placeholder="0000 0000 0000 0000"
                                />
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label style={labelStyle}>Card Holder Name <span style={{ color: 'red' }}>*</span></label>
                                <input
                                    type="text"
                                    value={cardHolder}
                                    onChange={(e) => setCardHolder(e.target.value)}
                                    style={inputStyle}
                                    placeholder="Name on card"
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                <div>
                                    <label style={labelStyle}>Expiration Month <span style={{ color: 'red' }}>*</span></label>
                                    <input
                                        type="text"
                                        value={expMonth}
                                        onChange={(e) => setExpMonth(e.target.value)}
                                        style={inputStyle}
                                        placeholder="MM"
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>Expiration Year <span style={{ color: 'red' }}>*</span></label>
                                    <input
                                        type="text"
                                        value={expYear}
                                        onChange={(e) => setExpYear(e.target.value)}
                                        style={inputStyle}
                                        placeholder="YY"
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={labelStyle}>CVV <span style={{ color: 'red' }}>*</span></label>
                                <input
                                    type="text"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                    style={inputStyle}
                                    placeholder="123"
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    fontSize: '1.1rem',
                                    borderRadius: '12px',
                                    cursor: 'pointer'
                                }}
                            >
                                {t('pay') || 'Pay'}
                            </button>
                        </form>
                    </>
                )}

                {step === 'processing' && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 0' }}>
                        <div className="spinner" style={{
                            width: '40px',
                            height: '40px',
                            border: '3px solid var(--glass-border)',
                            borderTop: '3px solid var(--primary-color)',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            marginBottom: '1rem'
                        }} />
                        <p>{t('processing') || 'Processing...'}</p>
                    </div>
                )}
            </div>
            <style jsx global>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .payment-method-btn:hover {
                    background: rgba(255,255,255,0.1) !important;
                    transform: translateY(-2px);
                }
            `}</style>
        </div>
    );
}
