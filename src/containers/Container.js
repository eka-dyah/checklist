import { useState } from "react";
import Checklist from "./Checklist";
import FormLoginReg from "./FormLoginReg";

const Container = () => {
	const [isLogin, setIsLogin] = useState(false);
	const [loginMode, setLoginMode] = useState(true);
	const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
    const [name, setName] = useState(null);

	const switchButton = () => {
        setError(null);
        setSuccessMessage(null);
		setLoginMode(!loginMode);
	};

	const submitLoginHandler = (username, password) => {
		setError(null);
		setSuccessMessage(null);
		fetch("http://18.139.50.74:8080/login", {
			method: "POST",
			body: JSON.stringify({
				username,
				password,
			}),
            headers: {
                'Content-Type': 'application/json'
            }
		})
			.then((res) => res.json())
			.then((data) => {
                setToken(data.data.token);
                setIsLogin(true);
                setName(username);
            })
			.catch(() => setError("Username atau password salah"));
	};

	const submitRegisterHandler = (email, username, password) => {
		setError(null);
		fetch("http://18.139.50.74:8080/register", {
			method: "POST",
			body: JSON.stringify({
				email,
				username,
				password,
			}),
            headers: {
                'Content-Type': 'application/json'
            }
		})
			.then((res) => res.json())
			.then(() => {
				setSuccessMessage("Register berhasil, switch to Login");
			})
			.catch(() => setError("Terjadi kesalahan"));
	};

	if (!isLogin) {
		return (
			<>
				<FormLoginReg
					loginMode={loginMode}
					submitLogin={submitLoginHandler}
					submitRegister={submitRegisterHandler}
					switchButton={switchButton}
				/>
				{error && <p>{error}</p>}
				{successMessage && <p>{successMessage}</p>}
			</>
		);
	}

	return (
        <>
            <p>Hai, {name}</p>
            {token && <Checklist token={token} />}
        </>
    );
};

export default Container;
