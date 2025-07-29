export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'mixtral-8x7b-32768',
      messages: messages,
      temperature: 0.7,
    }),
  });

  const data = await response.json();

  return new Response(JSON.stringify(data.choices[0].message));
}
