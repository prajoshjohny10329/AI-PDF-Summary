import {NextResponse} from 'next/server';

export const GET = async ( req : any ) => {
    const body = await req.jason()
    return NextResponse.json({
        success: true,
        message: "Hello, World"
    })
}