import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params{
    params: {id:string};
}

export async function GET(request: Request , {params}: Params) {
    try {
        //console.log("Hola  " + params.id)
        const asientos = await prisma.asientos.findMany({
            where:{
                idBus: Number(params.id)
            },
            include:{
                Bus:true

            }

        })

        return NextResponse.json({asientos});
    } catch (error) {
        NextResponse.json({error})
    }
}


