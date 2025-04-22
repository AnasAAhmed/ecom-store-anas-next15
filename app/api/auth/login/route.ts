import { signIn } from "@/auth";
import { getUser } from "@/lib/actions/actions";
import { ResultCode } from "@/lib/utils/features";
import { compare } from "bcryptjs";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";
import { z } from "zod";

export async function POST(req: Request) {
    const body = await req.json();
    const { email, password } = body;
    try {
        const ip = (await headers()).get('x-forwarded-for') || '36.255.42.109';
        const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
        const geoData = await geoRes.json();
        const userAgent = (await headers()).get('user-agent') || '';
        const parser = new UAParser(userAgent);
        const result = parser.getResult();
        let country = "oooo";
        let city = "pppp";

        if (ip && ip !== '::1' && ip !== '127.0.0.1') {
            country = geoData.country || 'Unknown';
            city = geoData.city || 'Unknown';
        } else {
            country = "Localhost";
            city = "Localhost";
            console.log("Skipping geo lookup for local IP:", ip);
        }

        const os = `${result.os.name} ${result.os.version}`;
        const device = result.device.type || "Desktop";
        const browser = `${result.browser.name} ${result.browser.version}`;

        const parsedCredentials = z
            .object({
                email: z.string().email(),
                password: z.string().min(6, 'Password must contain 6 characters')
            })
            .safeParse({
                email,
                password
            })

        if (parsedCredentials.error) {
            let messages = ''
            parsedCredentials.error.issues.map((i, _) => (
                messages+=`${_>0?' & ':''}`+i.message
            ))
            return NextResponse.json({ type: 'error', resultCode:messages });

        }
        const user: User | null = await getUser({ email: parsedCredentials.data.email, provider: 'credentials', browser, city, country, ip, userAgent, os, device });
        if (!user) {
            return NextResponse.json({ type: 'error', resultCode: ResultCode.InvalidCredentials });

        }
        const isMatched = await compare(parsedCredentials.data.password, user.password!);
        if (!isMatched) {
            return NextResponse.json({ type: 'error', resultCode: ResultCode.InvalidCredentials });

        }
        await signIn('credentials', {
            email,
            id: user.id,
            username: user.name,
            image: user.image,
            redirect: false
        });
        return NextResponse.json({ type: 'success', resultCode: ResultCode.UserLoggedIn });


    } catch (error) {

        return NextResponse.json({ type: 'error', resultCode: 'Login: ' + (error as Error).message });

    }
}
