import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request:Request) {
    try {
        
        const bus = await prisma.bus.findMany();

        return NextResponse.json({bus})
    } catch (error) {
        
        console.log(error)
        return NextResponse.json(error)
    }
}