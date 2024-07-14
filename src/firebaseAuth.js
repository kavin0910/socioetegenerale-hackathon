// src/firebaseAuth.js
import React, { useState } from 'react';
import { auth } from './firebaseConfig';

function FirebaseAuth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log('Registered:', userCredential.user);
            })
            .catch((error) => console.error('Error registering:', error));
    };

    const login = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log('Logged in:', userCredential.user);
            })
            .catch((error) => console.error('Error logging in:', error));
    };

    return (
        <div>
            <form onSubmit={login}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Login</button>
            </form>
            <form onSubmit={register}>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default FirebaseAuth;
