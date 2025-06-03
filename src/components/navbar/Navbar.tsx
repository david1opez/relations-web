import { useState } from 'react';
import styles from './navbar.module.css';
import { useRouter } from 'next/navigation'
import Image from 'next/image';

// COMPONENTS
import ActivityIndicator from '../activityIndicator/ActivityIndicator';

// UTILS
import { checkUserLoggedIn } from '@/utils/auth';

export default function Navbar() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    
    const handleLogin = () => {
        setLoading(true);

        checkUserLoggedIn()
        .then((result) => {
            if (typeof result === 'string') {
                router.push(result);
            } else {
                router.push(`/inicio`);
            }
        })
        .finally(() => {
            setLoading(false);
        });
    }

    return (
        <div className={styles.container}>
            <Image
                alt=''
                src="./images/logo.svg"
                className={styles.logo}
                width={100}
                height={100}
            />

            <button
                className={styles.loginButton}
                onClick={() => !loading && handleLogin()}
            >
                {
                    loading ? (
                        <ActivityIndicator color='var(--black)'/>
                    ) : (
                        "Empezar a analizar"
                    )
                }
            </button>
        </div>
    );
};
