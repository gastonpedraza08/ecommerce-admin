import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function DescriptionEditor(props) {

	const { setDescription, description } = props;

	return (
			<CKEditor
				editor={ClassicEditor}
				data={description}
				config={{
            removePlugins: ['ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload', 'MediaEmbed', 'EasyImage']
          }}
				onBlur={(event, editor) => {
					const data = editor.getData();
					setDescription(data);
				}}
			/>
	);
}
