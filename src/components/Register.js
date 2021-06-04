import { useRef } from "react";

const Register = ({ submitRegister }) => {
	const usernameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();

    const submitHandler = (e) => {
        e.preventDefault();
        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const passw = passwordRef.current.value;
        submitRegister(email, username, passw);
    }

	return (
		<form onSubmit={submitHandler}>
			<h1>Register</h1>
			<div>
				<label>Email: </label>
				<input
					ref={emailRef}
					required
					type="email"
					name="email"
					placeholder="example@example.com"
				/>
			</div>
			<div>
				<label>Username: </label>
				<input
					ref={usernameRef}
					required
					type="text"
					name="username"
					placeholder="ekady05"
				/>
			</div>
			<div>
				<label>Password: </label>
				<input
					ref={passwordRef}
					required
					type="password"
					name="password"
					placeholder="password"
				/>
			</div>
			<button type="submit">Submit</button>
		</form>
	);
};

export default Register;
