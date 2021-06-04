import { useRef } from "react";

const Login = ({ submitLogin }) => {
	const usernameRef = useRef();
	const passwordRef = useRef();

	const submitHandler = (e) => {
		e.preventDefault();
		submitLogin(usernameRef.current.value, passwordRef.current.value);
	};

	return (
		<form onSubmit={submitHandler}>
			<h1>Login</h1>
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

export default Login;
