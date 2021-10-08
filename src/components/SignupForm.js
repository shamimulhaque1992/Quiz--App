import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import classes from "../styles/Signup.module.css";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Form from "./Form";
import TextInput from "./TextInput";
export default function SignupForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confermPassword, setConfermPassword] = useState("");
    const [agree, setAgree] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    const history = useHistory();

    const { signup } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        //validation
        if (password !== confermPassword) {
            return setError("Password Don't Match!")
        }

        try {
            setError("");
            setLoading(true);
            await signup(email, password, username);
            history.push("/");
        } catch (err) {
            console.log(err);
            setLoading(false);
            setError("Failed to create an account!");
        }

    }

    return (
        <Form className={`${classes.signup} form`} onSubmit={handleSubmit}>
            <TextInput type="text" placeholder="Enter Name" icons="preson" required value={username} onChange={(e) => setUsername(e.target.value)} />

            <TextInput type="text" placeholder="Enter Email" icons="alternate_email" required value={email} onChange={(e) => setEmail(e.target.value)} />

            <TextInput type="password" placeholder="Enter Password" icons="lock" required value={password} onChange={(e) => setPassword(e.target.value)} />

            <TextInput type="password" placeholder="Conferm Password" icons="lock_clock" required value={confermPassword} onChange={(e) => setConfermPassword(e.target.value)} />

            <Checkbox text="I agree to the Terms &amp; Conditions" required value={agree} onChange={(e) => setAgree(e.target.value)} />

            <Button disabled={loading} type="submit"><span>Sumit Now</span></Button>

            {error && <p className="error">{error}</p>}
            <div className="info">
                Already have an account? <Link to="/login">Login</Link> instead.
            </div>
        </Form>
    );
}