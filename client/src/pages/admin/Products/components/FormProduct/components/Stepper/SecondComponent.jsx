import React from 'react';
import { HandleFormProductButton } from 'components';


export default function SecondComponent(props) {

	console.log("second component")

	return (
		<div>
			<h1>
				Second Component
			</h1>
			<HandleFormProductButton />
		</div>
	);
}