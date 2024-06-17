import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request:Request) {
    try {
        const asientos = await prisma.asientos.findMany();

        return NextResponse.json({asientos:asientos});
    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }
}