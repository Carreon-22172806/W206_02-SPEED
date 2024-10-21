import React from 'react';
import Link from 'next/link';
import navStyle from './Navigation.module.css';

const AccountNavigation = () => {
    return (
        <nav className={navStyle.navbar}>
            <ul className={navStyle.navList}>
                <li>
                    <Link href="/login-account/{id}">Login</Link>
                </li>
                <li>
                    <Link href="/sign-up/">Sign Up</Link>
                </li>
                <li>
                    <Link href="/show-book/{id}">Show Speed Database</Link>
                </li>
                {/* Add more links as needed */}
            </ul>
        </nav>
    );
};

export default AccountNavigation;
