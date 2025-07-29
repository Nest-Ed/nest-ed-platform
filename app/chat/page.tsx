'use client';

import { useState } from 'react';

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Show user message
    setMessages(prev => [...prev, `🧑‍🎓: ${input}`]);

    // Send to your API route
    const res = await fetch('/api/groq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setMessages(prev => [...prev, `🤖: ${data.message}`]);

    setInput('');
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>💬 Chat with Nest-Ed</h1>
      <div style={{ margin: '1rem 0' }}>
        {messages.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Ask a question..."
        style={{ width: '60%', padding: '0.5rem', marginRight: '1rem' }}
      />
      <button onClick={handleSend} style={{ padding: '0.5rem 1rem' }}>
        Send
      </button>
    </main>
  );
}
