import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { productId, deliveryEmail, quantity } = await req.json();

    if (!productId) {
        return NextResponse.json({ message: "Product ID required" }, { status: 400 });
    }

    // In a real app, we would verify payment here.
    // For this demo, we assume payment is successful.

    try {
        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        // Verify user exists (to handle session/db mismatch)
        const user = await prisma.user.findUnique({ where: { id: session.user.id } });
        if (!user) {
            return NextResponse.json({ message: "User not found. Please logout and login again." }, { status: 401 });
        }

        const order = await prisma.order.create({
            data: {
                userId: session.user.id,
                productId,
                deliveryEmail,
                price: product.price, // Save the current price
                quantity: quantity || 1 // Default to 1 if not provided
            }
        });
        return NextResponse.json(order);
    } catch (e) {
        console.error("Order creation error:", e);
        return NextResponse.json({ message: "Error creating order", error: String(e) }, { status: 500 });
    }
}
