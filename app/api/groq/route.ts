export async function POST(req: Request) {
  const data = await req.json();
  return new Response(
    JSON.stringify({
      message: "Hello from GROQ endpoint",
      received: data,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
