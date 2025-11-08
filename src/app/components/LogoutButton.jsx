'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  
  return (
    <button 
      onClick={() => signOut({ callbackUrl: '/' })}
      className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-colors"
    >
      Sair (Logout)
    </button>
  );
}