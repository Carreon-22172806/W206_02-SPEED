import React from 'react';
import Link from 'next/link';
import navStyle from './Navigation.module.css';

const HomeNavs = () => {
    return (
        <nav className={navStyle.navbar}>
            <ul className={navStyle.navList}>
                <li>
                    <Link href="/show-book/{id}">Show SPEED Database</Link>
                </li>
                <li>
                    <Link href="/moderation/{id}">Moderation</Link>
                </li>
                <li>
                    <Link href="/analysis">Analysis</Link>
                </li>
                <li>
                    <Link href="/login-account/{id}"> Logout - Under Construction </Link>
                </li>
            </ul>
        </nav>
    );
};

export default HomeNavs;
