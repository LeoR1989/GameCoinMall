import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { status } = await req.json();

    try {
        const order = await prisma.order.update({
            where: { id: params.id },
            data: { status }
        });

        console.log(`[Email Mock] Sending email to user ${order.userId} for order ${order.id}: Status updated to ${status}`);

        return NextResponse.json(order);
    } catch (e) {
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
}
