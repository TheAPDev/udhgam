
import { supabase } from '../../supabaseClient';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!supabase) {
      alert('Supabase client not initialized. Please check your environment variables.');
      setLoading(false);
      return;
    }
    // Defensive: supabase may be undefined, so check before calling .auth
    if (!('auth' in supabase)) {
      alert('Supabase client is not properly initialized.');
      setLoading(false);
      return;
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else {
      console.log('Logged in:', data);
      // redirect to dashboard
    }
    setLoading(false);
  };

  const handleSignUp = async () => {
    if (!supabase) {
      alert('Supabase client not initialized. Please check your environment variables.');
      return;
    }
    if (!('auth' in supabase)) {
      alert('Supabase client is not properly initialized.');
      return;
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) alert(error.message);
    else alert('Account created successfully');
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Sign in to <span style={{ color: '#4f46e5', fontWeight: 700 }}>Hunerz</span></h2>
      <input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">
        {loading ? 'Signing In...' : 'Sign In'}
      </button>
      <button type="button" onClick={handleSignUp} disabled={loading}>
        Sign Up
      </button>
    </form>
  );
}
