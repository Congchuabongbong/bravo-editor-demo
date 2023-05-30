import {Editor} from 'tinymce';

export const importHtmlFileCmd = (ui: boolean, {editor, result}: {editor: Editor; result: string}) => {
	const document = editor.getDoc();
	const visualDocument = new DOMParser().parseFromString(result, 'text/html');
	const headVisual = visualDocument.querySelector('head');
	const headEditor = document.querySelector('head');
	const bodyVisual = visualDocument.querySelector('body');
	const bodyEditor = document.querySelector('body');
	//replace header;
	if (headVisual && headEditor && headVisual.hasChildNodes()) {
		headEditor.innerHTML = '';
		const nodeArr = [];
		headVisual.childNodes.forEach(node => nodeArr.push(node));
		headEditor.append(...nodeArr);
	}
	//replace body;
	if (bodyVisual && bodyEditor && bodyVisual.hasChildNodes()) {
		bodyEditor.innerHTML = '';
		const nodeArr = [];
		bodyVisual.childNodes.forEach(node => nodeArr.push(node));
		bodyEditor.append(...nodeArr);
	}
	return ui;
};
