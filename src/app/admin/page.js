
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import LogoutButton from '../components/LogoutButton';


export default async function AdminPage() {

    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-3xl font-bold mb-4">
              Bem-vindo ao Admin, {session.user.email}
            </h1>
            <p>Esta é a sua página de administração protegida.</p>
            
            <div className="mt-8">
                <LogoutButton />
            </div>
        </div>
    );
}