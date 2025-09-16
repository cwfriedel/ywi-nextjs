'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.push('/admin');
      } else if (res.status === 401) {
        setError('Invalid credentials');
      } else {
        setError('Something went wrong. Please try again later.');
      }
    } catch (err) {
      console.error('Login request failed', err);
      setError('Unable to reach the server. Please check your connection and try again.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 max-w-sm mx-auto mt-10">
      <input
        className="w-full border p-2"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="w-full border p-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white w-full">
        Login
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
