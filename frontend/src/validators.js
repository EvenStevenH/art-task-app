export const isValidImageUrl = (url) => {
	if (!url) return;

	const isValid = /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(url);
	if (!isValid) {
		alert(`Image must be a valid URL, beginning with "https://" and ending in jpg, jpeg, png, or gif!`);
	}

	return isValid;
};
