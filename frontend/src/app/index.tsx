import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
    const navigation = useRouter();

    useEffect(() => {
        // Redirect to the login page
        console.log('HomePage mounted, redirecting to login');
        navigation.push('/login-page');
    }, [navigation]);

    return null; // This component does not render anything
};

export default HomePage;
