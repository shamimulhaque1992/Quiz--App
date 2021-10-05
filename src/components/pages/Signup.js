import classes from "../../styles/Signup.module.css";
import Button from "../Button";
import Checkbox from "../Checkbox";
import Form from "../Form";
import Illustration from "../Illustration";
import TextInput from "../TextInput";
export default function Signup() {
    return (
        <>
            <h1>Create an account</h1>
            <div class="column">
                <Illustration />
                <Form className={`${classes.signup} form`}>
                    <TextInput type="text" placeholder="Enter Name" icons="preson" />
                    <TextInput type="text" placeholder="Enter Email" icons="alternate_email" />
                    <TextInput type="password" placeholder="Enter Password" icons="lock" />
                    <TextInput type="password" placeholder="Conferm Password" icons="lock_clock" />
                    <Checkbox text="I agree to the Terms &amp; Conditions" />
                    <Button>Sumit Now</Button>
                    <div className="info">
                        Already have an account? <a href="login.html">Login</a> instead.
                    </div>
                </Form>
            </div>
        </>
    );
}