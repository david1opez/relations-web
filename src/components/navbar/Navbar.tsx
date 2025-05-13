import styles from './navbar.module.css';
import { useRouter } from 'next/navigation'
import Image from 'next/image';

// COMPONENTS
import Link from '../link/Link';

// UTILS
import { Login } from '@/utils/GetUser';

export default function Navbar() {
    const router = useRouter();
    
    const handleLogin = () => {
        Login();
        router.push("/inicio");
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

            <Link href="/">
                <p className={styles.link}>¿Cómo funciona?</p>
            </Link>
            <Link href="/">
                <p className={styles.link}>Accesos y permisos</p>
            </Link>
            <Link href="/">
                <p className={styles.link}>FAQ</p>
            </Link>

            <button
                className={styles.loginButton}
                onClick={() => handleLogin()}
            >
                Empezar a analizar
            </button>
        </div>
    );
};
