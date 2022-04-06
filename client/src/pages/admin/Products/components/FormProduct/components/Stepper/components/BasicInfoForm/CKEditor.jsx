import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function DescriptionEditor(props) {

	const { setFieldValue, description } = props;

	return (
		<CKEditor
			editor={ClassicEditor}
			data={description}
			config={{
        toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
      }}
			onBlur={(event, editor) => {
				const data = editor.getData();
				setFieldValue('description', data);
			}}
		/>
	);
}
