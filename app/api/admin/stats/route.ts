import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const where: any = {
        status: { in: ['PAID', 'SHIPPED'] }
    };

    if (startDate && endDate) {
        where.createdAt = {
            gte: new Date(startDate),
            lte: new Date(new Date(endDate).setHours(23, 59, 59, 999))
        };
    }

    try {
        const orders = await prisma.order.findMany({
            where
        });

        const totalRevenue = orders.reduce((sum, order) => sum + ((order.price || 0) * (order.quantity || 1)), 0);
        const totalOrders = orders.length;
        const totalUsers = new Set(orders.map(order => order.userId)).size;

        return NextResponse.json({
            totalRevenue,
            totalOrders,
            totalUsers
        });
    } catch (e) {
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
}
