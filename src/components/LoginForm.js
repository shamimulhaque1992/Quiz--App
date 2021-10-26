import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import classes from "../styles/Login.module.css";
import Button from "./Button";
import Form from "./Form";
import TextInput from "./TextInput";
export default function LoginForm() {



    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    const history = useHistory();

    const { login } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(email, password);
            history.push("/");
        } catch (err) {
            console.log(err);
            setLoading(false);
            setError("Failed to Login!");
        }

    }

    return (
        <Form className={`${classes.login}`} onSubmit={handleSubmit}>
            <TextInput type="text" placeholder="Enter Email" icons="alternate_email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextInput type="password" placeholder="Enter Password" icons="lock" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button disabled={loading} type="submit"><span>Sumit Now</span></Button>
            {error && <p className="error">{error}</p>}
            <div className="info">Don't have an account? <Link to="signup.html">Signup</Link> instead.
            </div>
        </Form>
    );
}