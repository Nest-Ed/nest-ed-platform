'use client';

import React, { useState } from 'react';

type Message = {
  role: 'user' | 'bot';
  content: string;
};

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    setMessages(msgs => [...msgs, { role: 'user', content: input }]);
    setLoading(true);

    try {
      const response = await fetch('/api/groq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      let botReply = '';
      if (data.error) {
        botReply = `Error: ${data.error}`;
      } else if (data.content) {
        botReply = data.content;
      } else {
        botReply = 'No response from server.';
      }

      setMessages(msgs => [...msgs, { role: 'bot', content: botReply }]);
    } catch (err: any) {
      setMessages(msgs => [
        ...msgs,
        { role: 'bot', content: `Error: ${err.message || 'Unknown error'}` },
      ]);
    } finally {
      setInput('');
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      sendMessage();
    }
  };

  return (
    <main style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
      <h1>
        <span role="img" aria-label="chat">
          💬
        </span>{' '}
        Chat with Nest-Ed
      </h1>
      <div style={{ marginBottom: 24 }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ margin: '8px 0' }}>
            <span>
              {msg.role === 'user' ? '🧑‍💻' : '🤖'} : {msg.content}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question..."
          style={{
            flex: 1,
            padding: '8px 12px',
            fontSize: 16,
            borderRadius: 4,
            border: '1px solid #ccc',
          }}
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            padding: '8px 18px',
            fontSize: 16,
            borderRadius: 4,
            background: '#6246ea',
            color: '#fff',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </main>
  );
}
    
  
