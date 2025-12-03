import { cookies } from 'next/headers';
import MainSplitterClient from '../components/MainSplitterClient';
import { redirect } from 'next/navigation';

export default async function LandingPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    // If logged in, go straight to dashboard
    if (token) {
        redirect('/dashboard');
    }

    return <MainSplitterClient />;
}
