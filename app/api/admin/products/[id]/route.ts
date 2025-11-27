import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    delete data.id;
    delete data.createdAt;
    delete data.updatedAt;

    try {
        const product = await prisma.product.update({
            where: { id: params.id },
            data
        });
        return NextResponse.json(product);
    } catch (e) {
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
}
