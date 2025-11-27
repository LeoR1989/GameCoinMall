'use client';

import { useState } from 'react';
import { useToast } from '@/components/ToastContext';
import { useTranslations } from 'next-intl';

export default function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);
    const { showToast } = useToast();
    const t = useTranslations('Common');

    const handleCopy = async () => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
            } else {
                // Fallback for non-secure contexts (HTTP)
                const textArea = document.createElement("textarea");
                textArea.value = text;
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                textArea.style.top = "-999999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    document.execCommand('copy');
                } catch (err) {
                    console.error('Fallback: Oops, unable to copy', err);
                    throw err;
                }
                document.body.removeChild(textArea);
            }

            setCopied(true);
            showToast(t('copySuccess'), 'success');
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
            showToast('Failed to copy', 'error');
        }
    };

    return (
        <button
            onClick={handleCopy}
            style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                marginLeft: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                color: copied ? 'var(--success-green)' : 'var(--text-secondary)',
                transition: 'color 0.2s'
            }}
            title={copied ? t('copySuccess') : "Copy Order ID"}
        >
            {copied ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2-2v1"></path>
                </svg>
            )}
        </button>
    );
}
