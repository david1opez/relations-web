import styles from './navbar.module.css';
import { useRouter } from 'next/navigation'
import Image from 'next/image';

// COMPONENTS
import Link from '../link/Link';

const CLIENT_ID = 'df25bb12-928b-4419-9a5a-2665b0f16497';
const REDIRECT_URL = 'https://relations-web.vercel.app/login';
const TENANT = "common";
const SCOPE = "openid profile User.Read";

export default function Navbar() {
    const router = useRouter();
    
    const handleLogin = () => {
        router.push('/inicio')
        // router.push(`https://login.microsoftonline.com/${TENANT}/oauth2/v2.0/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URL}&response_mode=query&scope=${SCOPE}`);
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
                <p className={styles.link}></p>
            </Link>
            <Link href="/">
                <p className={styles.link}></p>
            </Link>
            <Link href="/">
                <p className={styles.link}></p>
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
