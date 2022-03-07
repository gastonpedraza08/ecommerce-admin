import { fetchWithoutToken } from 'helpers/fetch';

export const uploadFiles = async files => {
	const result = await fetchWithoutToken("shared/upload", { files }, 'POST');
	return result.data.result;
}