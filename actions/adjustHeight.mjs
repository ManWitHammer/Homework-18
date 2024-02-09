const adjustHeight = (textarea) => {
	textarea.style.height = "30px";
	textarea.style.height = (textarea.scrollHeight) + "px";
}

export default adjustHeight