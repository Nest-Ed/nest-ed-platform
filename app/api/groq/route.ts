import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Validate and parse JSON body
    const body = await req.json();
    if (!body?.message || typeof body.message !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid "message" in request body.' }, { status: 400 });
    }

    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    if (!GROQ_API_KEY) {
      return NextResponse.json({ error: 'Missing GROQ API key' }, { status: 500 });
    }

    // Prepare request to Groq API
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
            content: body.message,
          },
        ],
      }),
    });

    // Check if Groq API responded OK
    if (!groqRes.ok) {
      let errorData;
      try {
        errorData = await groqRes.json();
      } catch {
        errorData = await groqRes.text();
      }
      return NextResponse.json(
        { error: 'Groq API Error', details: errorData },
        { status: groqRes.status }
      );
    }

    // Parse response from Groq API
    const groqData = await groqRes.json();
    const reply = groqData?.choices?.[0]?.message?.content;

    if (!reply) {
      return NextResponse.json({ error: 'No response from Groq API.', raw: groqData }, { status: 502 });
    }

    // Success
    return NextResponse.json({ content: reply });
  } catch (error) {
    // Log error for debugging
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error instanceof Error ? error.message : error }, { status: 500 });
  }
}
  
