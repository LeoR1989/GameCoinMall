import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "../globals.css";
import Providers from '@/components/Providers';
import Navigation from '@/components/Navigation';
import BottomNav from '@/components/BottomNav';

export default async function LocaleLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const messages = await getMessages();
    const dir = locale === 'ar' ? 'rtl' : 'ltr';

    return (
        <html lang={locale} dir={dir}>
            <body>
                <NextIntlClientProvider messages={messages}>
                    <Providers>
                        <Navigation locale={locale} />
                        <div className="container">
                            {children}
                        </div>
                        <BottomNav locale={locale} />
                    </Providers>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
