import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import AdminProductList from './AdminProductList';

async function getProducts() {
    return await prisma.product.findMany({
        orderBy: { price: 'asc' }
    });
}

export default async function AdminProductsPage({ params: { locale } }: { params: { locale: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect(`/${locale}/login`);
    }

    const products = await getProducts();

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Product Management</h1>
            <AdminProductList products={products} />
        </div>
    );
}
