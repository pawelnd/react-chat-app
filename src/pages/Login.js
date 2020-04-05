import React, {useState} from "react";
import {signin, signInWithGoogle} from "../helpers/auth";
import {Link} from "react-router-dom";


const Login = () => {

    const [error, setError] = useState('');
    const [inputs, setInputs] = useState({});


    const handleChange = (event) => {
        event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        try {
            await signin(inputs);
        } catch (error) {
            setError(error.message);
        }
    }


    const googleSignIn = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div>
            <form
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <h1>
                    Login to
                    <Link to="/">
                        Chatty
                    </Link>
                </h1>
                <p>
                    Fill in the form below to login to your account.
                </p>
                <div>
                    <input
                        placeholder="Email"
                        name="email"
                        type="email"
                        onChange={handleChange}
                        value={inputs.email}
                    />
                </div>
                <div>
                    <input
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        value={inputs.password}
                        type="password"
                    />
                </div>
                <div>
                    {error ? (
                        <p>{error}</p>
                    ) : null}
                    <button type="submit">Login</button>
                </div>
                <hr/>
                <p>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </form>
            <p>Or</p>
            <button onClick={googleSignIn} type="button">
                Sign up with Google
            </button>
        </div>
    );

}


export default Login;
