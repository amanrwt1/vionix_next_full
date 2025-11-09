
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(req: NextRequest){
  try {
    const { messages } = await req.json()
    const key = process.env.OPENAI_API_KEY
    if(!key){
      return NextResponse.json({ reply: 'OPENAI_API_KEY missing — Vercel me Environment Variables me add karein.' })
    }
    const openai = new OpenAI({ apiKey: key })
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role:'system', content:'You are Vionix — concise, helpful, safe.' }, ...(messages||[]) ],
      temperature: 0.2,
      max_tokens: 400
    })
    const reply = completion.choices?.[0]?.message?.content || '...'
    return NextResponse.json({ reply })
  } catch (e:any){
    return NextResponse.json({ reply: 'Server error: ' + (e?.message||'unknown') })
  }
}
