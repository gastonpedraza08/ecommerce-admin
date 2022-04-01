import React from 'react';
import { HandleFormProductButton } from 'components';

export default function FinalForm(props) {
	return (
		<div>
			<HandleFormProductButton validateForm={() => ({})} values={{name: 'jordan'}} />
		</div>
	);
}