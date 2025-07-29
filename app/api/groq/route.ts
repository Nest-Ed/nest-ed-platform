import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_API_KEY) {
    return NextResponse.json({ error: 'Missing GROQ API key' }, { status: 500 });
  }

  const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'mixtral-8x7b-32768',
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
    }),
  });

  const groqData = await groqRes.json();

  const reply = groqData?.choices?.[0]?.message?.content;

  return NextResponse.json({ content: reply ?? 'Sorry, no response from Groq.' });
}
