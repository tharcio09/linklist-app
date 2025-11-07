'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Page() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const resultado = await signIn('credentials', {
                redirect: false,
                email: email,
                password: password,
            });

            if (resultado.error) {
                setError(resultado.error); 
            } else {
                router.push('/admin'); 
            }
        
        } catch (err) {
            setError(err.message || "Ocorreu um erro inesperado.");
        }
    };

    return (
      <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-6">LinkList Admin</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mt-1 bg-gray-700 rounded border border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 text-white"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Senha
              </label>
              <input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mt-1 bg-gray-700 rounded border border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 text-white"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">
                {error}
              </p>
            )}

            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold text-white shadow-lg transition-colors"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </main>
    );
}