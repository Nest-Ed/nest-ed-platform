export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-white text-gray-900">
      <h1 className="text-4xl font-bold mb-4">Welcome to Nest-Ed</h1>
      <p className="text-lg mb-6">Your AI-powered education assistant is live.</p>
      <div className="flex gap-4">
        <a
          href="/chat"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Go to Chat
        </a>
        <a
          href="/login"
          className="bg-gray-500 text-white px-5 py-2 rounded-lg shadow hover:bg-gray-600 transition"
        >
          Login
        </a>
      </div>
    </main>
  );
}
