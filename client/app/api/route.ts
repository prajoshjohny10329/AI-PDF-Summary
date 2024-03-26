import {NextResponse} from 'next/server';
import { Client } from '@octoai/client';

const client =  new Client(process.env.OCTOAI_TOKEN)

export const POST = async ( req : any ) => {
    console.log("request hist to Route");
    
    const body = await req.json();
    const text = body[1]
    const searchHint = body[2];
    
    

    const completion = await client.chat.completions.
        create({
            "model": "mixtral-8x7b-instruct-fp16",
            "messages": [
                {
                    "role": "system",
                    "content":  body.searchHint + text,
                }
            ]
        })
        console.log(completion);
        console.log(completion.choices[0].message.content);
        
        
    
    return NextResponse.json({
        success: true,
        message: "Api succeed",
        result: completion.choices[0].message.content
        // result: body.text,
    })
}