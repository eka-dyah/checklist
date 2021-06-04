import { useEffect, useRef, useState } from "react";

const Checklist = ({ token }) => {
	const [data, setData] = useState(null);

	const checklistRef = useRef();

	useEffect(() => {
		fetch("http://18.139.50.74:8080/checklist", {
			method: "GET",
			headers: new Headers({
				Authorization: "Bearer " + token,
				"content-type": "application/json;charset=ISO-8859-1",
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res.data);
				setData(res.data);
			})
			.catch(() => {});
	}, [token]);

	const deleteCheckList = (id) => {
		fetch(`http://18.139.50.74:8080/checklist/${id}`, {
			method: "DELETE",
			headers: new Headers({
				Authorization: "Bearer " + token,
			}),
		})
			.then((res) => res.json())
			.then((dt) => {
				console.log(dt);
				if (!dt.error) {
                    setData(data.filter((check) => check.id !== id));
                }
			})
			.catch(() => {});
	};

	const addChecklist = (e) => {
		e.preventDefault();
		fetch(`http://18.139.50.74:8080/checklist/`, {
			method: "POST",
			body: JSON.stringify({
				name: checklistRef.current.value,
			}),
			headers: new Headers({
				Authorization: "Bearer " + token,
				"content-type": "application/json;charset=ISO-8859-1",
			}),
		})
			.then((res) => res.json())
			.then((dt) => {
				setData([...data, dt.data]);
			})
			.catch(() => {});
	};

	let dataHtml = <p></p>;
	if (data) {
		dataHtml = data.map((check) => {
			return (
				<div key={check.id}>
					<span>{check.name}</span>{" "}
					<button onClick={() => deleteCheckList(check.id)}>
						Delete
					</button>
				</div>
			);
		});
	}
	return (
		<>
			<p>Checklist</p>
			<form onSubmit={addChecklist}>
				<div>
					<label>Checklist: </label>
					<input
						ref={checklistRef}
						type="text"
						required
						name="checklist"
					/>
				</div>
				<button type="submit">Add Checklist</button>
			</form>
			<br />
			{dataHtml}
		</>
	);
};

export default Checklist;
