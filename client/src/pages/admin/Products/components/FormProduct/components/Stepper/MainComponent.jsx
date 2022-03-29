import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { productCreateHandleSetCategory } from 'actions/products';

export default function FirstComponent(props) {

	const dispatch = useDispatch();

	const [number, setNumber] = useState(0);
	const handleSubmit = e => {
		e.preventDefault();
		dispatch(productCreateHandleSetCategory(number));
	}

	return (
		<div>
			<h4>Elige la categoria</h4>
			<form onSubmit={handleSubmit}>
				<input 
					type="number" 
					onChange={e => setNumber(Number(e.target.value))}
				/>
				<input type="submit"/>
			</form>
		</div>
	);
}