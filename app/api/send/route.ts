import EmailTemplate from "@/components/email_tempalte";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY)


export async function POST(request:Request) {
   
    console.log("Api" + process.env.RESEND_API_KEY)
    const {email} = await request.json()
    console.log('Received email:', email);
    try {
        const { data } = await resend.emails.send({
            from:'Acme <onboarding@resend.dev>',
            to: [email],
            subject:'Hello from Next.js',
            react: EmailTemplate({ firstName: "John" }) as React.ReactElement,
        })
        console.log('Resend API response:', data);

        return NextResponse.json({data})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error})
    }
}
