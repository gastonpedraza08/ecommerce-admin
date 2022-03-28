import React from 'react';

export default function FirstComponent(props) {

	const handleSubmit = e => {
		e.preventDefault();
		let categoryId = Number(document.getElementById('categoria-producto').value);
		console.log(categoryId)
	}

	console.log("first component")

	return (
		<div>
			<h4>Elige la categoria</h4>
			<form onSubmit={handleSubmit}>
				<input type="number" id="categoria-producto"/>
				<input type="submit"/>
			</form>
		</div>
	);
}