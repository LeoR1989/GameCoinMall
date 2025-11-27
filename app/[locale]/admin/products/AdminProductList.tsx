'use client';

import { useState } from 'react';

import { useToast } from '@/components/ToastContext';

export default function AdminProductList({ products }: { products: any[] }) {
    const [list, setList] = useState(products);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<any>({});
    const { showToast } = useToast();

    const handleEdit = (product: any) => {
        setEditingId(product.id);
        setEditForm(product);
    };

    const handleSave = async () => {
        const res = await fetch(`/api/admin/products/${editingId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editForm),
        });
        if (res.ok) {
            setList(list.map(p => p.id === editingId ? { ...p, ...editForm } : p));
            setEditingId(null);
            showToast('Product updated successfully', 'success');
        } else {
            showToast('Failed to save', 'error');
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (res.ok) {
                setEditForm({ ...editForm, image: data.url });
                showToast('Image uploaded successfully', 'success');
            } else {
                showToast('Upload failed', 'error');
            }
        } catch (error) {
            showToast('Upload error', 'error');
        }
    };

    return (
        <div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '2px solid #ccc' }}>
                        <th style={{ padding: '0.5rem' }}>Name</th>
                        <th style={{ padding: '0.5rem' }}>Price</th>
                        <th style={{ padding: '0.5rem' }}>Currency</th>
                        <th style={{ padding: '0.5rem' }}>Image</th>
                        <th style={{ padding: '0.5rem' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(product => (
                        <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '0.5rem' }}>
                                {editingId === product.id ? (
                                    <input value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
                                ) : product.name}
                            </td>
                            <td style={{ padding: '0.5rem' }}>
                                {editingId === product.id ? (
                                    <input type="number" value={editForm.price} onChange={e => setEditForm({ ...editForm, price: parseFloat(e.target.value) })} />
                                ) : `$${product.price}`}
                            </td>
                            <td style={{ padding: '0.5rem' }}>
                                {editingId === product.id ? (
                                    <input type="number" value={editForm.currencyAmount} onChange={e => setEditForm({ ...editForm, currencyAmount: parseInt(e.target.value) })} />
                                ) : product.currencyAmount}
                            </td>
                            <td style={{ padding: '0.5rem' }}>
                                {editingId === product.id ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <input type="file" accept="image/*" onChange={handleUpload} />
                                        {editForm.image && <img src={editForm.image} alt="Preview" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />}
                                    </div>
                                ) : (
                                    product.image && <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                )}
                            </td>
                            <td style={{ padding: '0.5rem' }}>
                                {editingId === product.id ? (
                                    <button onClick={handleSave} className="btn btn-primary">Save</button>
                                ) : (
                                    <button onClick={() => handleEdit(product)} className="btn">Edit</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
