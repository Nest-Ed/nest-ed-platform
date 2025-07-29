export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama3-70b-8192', // ✅ correct Groq model
      messages,
      temperature: 0.7,
    }),
  });

  const data = await res.json();

  // ✅ this safely extracts the actual reply
  const reply = data?.choices?.[0]?.message?.content || '⚠️ No response from model.';

  return new Response(JSON.stringify({ content: reply }));
}

  
