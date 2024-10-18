import React from 'react';
import Link from 'next/link';
import navStyle from './Navigation.module.css';

const HomeNavs = () => {
    return (
        <nav className={navStyle.navbar}>
            <ul className={navStyle.navList}>
                <li>
                    <Link href="/create-book">Create Article</Link>
                </li>
                <li>
                    <Link href="/moderation/{id}">Moderate Articles</Link>
                </li>
                <li>
                    <Link href="/show-book/{id}">Show Book List</Link>
                </li>
                <li>
                    <Link href="/login-account/{id}"> Logout </Link>
                </li>
            </ul>
        </nav>
    );
};

export default HomeNavs;
