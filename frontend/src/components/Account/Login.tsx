import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Account } from "./Account";
import AccountNavigation from "../AccountNavigation";
import style from "./styling.module.css"

const LoginAccount = () => {
    const router = useRouter();

    // Create a state for the login account
    const [login, setLogin] = useState<Account>({
        username: '',
        password: ''
    });

    // Handle changes in the input fields
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLogin((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // Fetch API for login
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/{id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login)
            });

            if (response.ok) {
                // Redirect to the dashboard or the desired page upon successful login
                router.push('/show-book'); // Change this to your dashboard or home page
            } else {
                console.error('Login failed:', await response.text());
                // Optionally handle errors (e.g., show a message to the user)
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div>
            <div className="LoginAccount">
                <AccountNavigation />
                <br />
                <div className={style.container}>
                    <h2 className="text-center">Login</h2>
                    <br />
                    <form onSubmit={onSubmit}>
                        <table className={style.LoginContent}>
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                value={login.username}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={login.password}
                                onChange={handleChange}
                                required
                            />
                        </table>
                        <button type="submit" className="btn btn-outline-warning btn-block">Login</button>
                    </form>
                    <div className="mt-3">
                        Don't have an account?<Link href="/sign-up"> <u>Sign up now!</u></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginAccount;
