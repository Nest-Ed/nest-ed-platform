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
      model: 'llama3-70b-8192',
      messages,
      temperature: 0.7,
    }),
  });

  const data = await response.json();

  return new Response(JSON.stringify(
    data?.choices?.[0]?.message?.content 
      ? { content: data.choices[0].message.content } 
      : { content: 'No response generated.' }
  ));
}
