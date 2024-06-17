import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    const { correo , contraseña, carnet , estado, fechaRegistro } = await request.json();

    try {
        
        const newCLient = await prisma.cliente.create({
            data:{
                correo: correo,
                contrase_a:contraseña,
                carnet: carnet,
                estado:estado ,
                fechaRegistro: fechaRegistro
            }
        })
    
        return NextResponse.json({  newCLient });
    
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error })
    }

}