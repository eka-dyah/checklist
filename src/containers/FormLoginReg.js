import Login from "../components/Login";
import Register from "../components/Register";

const FormLoginReg = ({ submitLogin, submitRegister, loginMode, switchButton }) => {
	return (
		<>
			{loginMode ? (
				<Login submitLogin={submitLogin} />
			) : (
				<Register submitRegister={submitRegister} />
			)}
			<button onClick={switchButton}>
				Switch to {loginMode ? "Register" : "Login"}
			</button>
		</>
	);
};

export default FormLoginReg;
