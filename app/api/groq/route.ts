import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body?.message;
    const model = body?.model || 'gpt-3.5-turbo'; // default to 3.5

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid "message"' }, { status: 400 });
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      return NextResponse.json({ error: 'Missing OpenAI API key' }, { status: 500 });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model, // either gpt-3.5-turbo or gpt-4-turbo
        messages: [{ role: 'user', content: message }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: 'OpenAI API error', details: data }, { status: response.status });
    }

    const reply = data?.choices?.[0]?.message?.content;
    if (!reply) {
      return NextResponse.json({ error: 'No response content' }, { status: 502 });
    }

    return NextResponse.json({ content: reply });

  } catch (err) {
    console.error('Error:', err);
    return NextResponse.json({ error: 'Server error', details: err instanceof Error ? err.message : err }, { status: 500 });
  }
}
