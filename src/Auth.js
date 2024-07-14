import React, { useState } from 'react';
import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            alert(`Successfully ${isLogin ? 'logged in' : 'registered'}!`);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
                <button type="button" onClick={() => setIsLogin(!isLogin)}>
                    Switch to {isLogin ? 'Register' : 'Login'}
                </button>
            </form>
        </div>
    );
}

export default Auth;
