import {NextResponse} from 'next/server';

export const POST = async ( req : any ) => {
    const body = await req.json()
    return NextResponse.json({
        success: true,
        message: "Hello, World"
    })
}