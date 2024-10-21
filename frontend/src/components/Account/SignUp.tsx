import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Account } from "./Account";
import AccountNavigation from "../AccountNavigation";
import style from "./styling.module.css"

const SignUpAccount = () => {
    const router = useRouter();

    // Create a state for the login account
    const [signup, setSignUp] = useState<Account>({
        firstName : '',
        lastName : '',
        email: '',
        mobile: '',
        username: '',
        password: '',
    });

    // Handle changes in the input fields
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSignUp((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // Fetch API for login
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signup)
            });

            if (response.ok) {
                // Redirect to the dashboard or the desired page upon successful login
                router.push('/login-account'); // Change this to your dashboard or home page
            } else {
                console.error('Sign-up failed:', await response.text());
                // Optionally handle errors (e.g., show a message to the user)
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div>
            <div className="SignUp">
                <AccountNavigation />
                <br />
                <div className={style.container}>
                    <h2 className="text-center">Registration</h2>
                    <br />
                    <form onSubmit={onSubmit}>
                        <div>
                            <div className={style.SignUpContent}>
                                <tr>
                                <td>
                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    name="firstName"
                                    value={signup.firstName}
                                    onChange={handleChange}
                                    required
                                    />
                                </td>
                                <td>
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    name="lastName"
                                    value={signup.lastName}
                                    onChange={handleChange}
                                    required
                                    />
                                </td>
                                </tr>   
                                <tr>
                                <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                value={signup.username}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={signup.password}
                                onChange={handleChange}
                                required
                            />
                                </tr>                        

                            </div>
                        </div>

                        <div className="mb-3">

                        </div>
                        <button type="submit" className="btn btn-outline-warning btn-block">Create Account</button>
                    </form>
                    <div className="mt-3">
                        Already have an account? <Link href="/login-account/{id}"><u>Login to your account.</u></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpAccount;
