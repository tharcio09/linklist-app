import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import LogoutButton from '../components/LogoutButton';
import AdminDashboard from '../components/AdminDashboard';

export default async function AdminPage() {
  
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <AdminDashboard session={session} />
                
                <div className="mt-8">
                    <LogoutButton />
                </div>
            </div>
        </div>
    );
}