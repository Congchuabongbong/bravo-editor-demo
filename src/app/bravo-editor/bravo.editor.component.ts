import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EditorComponent, TINYMCE_SCRIPT_SRC} from '@tinymce/tinymce-angular';
import {Editor} from 'tinymce';
import {ETypeImageUpload, IBravoSettingEditor, fontsFormatDefault, importHtmlFileCmd, pluginsDefault, toolbarAboveDefault, toolbarBellowDefault} from './data-access';
const pathTiny = 'tinymce/tinymce.min.js';
@Component({
	selector: 'bravo-editor',
	template: '<editor #editor (onInit)="onInitEditor($event)"></editor>',
	styleUrls: [],
	providers: [{provide: TINYMCE_SCRIPT_SRC, useValue: pathTiny}],
})
export class BravoHtmlEditor implements OnInit {
	@ViewChild('editor', {static: true}) public editorComp!: EditorComponent;
	//* Declare properties here:
	//access modifiers public:
	private _imgTypeUpload = ETypeImageUpload.Base64;
	private _prefixImgBase64: string = 'data:image/jpg;base64,';
	private _bodyCssClassName: string = '';
	private _documentTitle: string = 'Untitled';
	private _bLocalImageToBase64: boolean = true;
	private _baseUrl: string = '';
	private _bodyHtml: string = '';
	private _bOnlyBodyHtml: boolean = false;

	//access modifiers private:
	// public apiKey: string = '6jxfg26k1mwrpc2lzmjx67o8jmexvyf5558rbbb5fklzavve';

	//img type upload
	set imgTypeUpload(value: ETypeImageUpload) {
		this._imgTypeUpload = value;
	}

	get imgTypeUpload(): ETypeImageUpload {
		return this._imgTypeUpload;
	}

	//body class name
	set bodyCssClassName(value: string) {
		this._bodyCssClassName = value;
	}

	get bodyCssClassName() {
		return this._bodyCssClassName;
	}
	//* constructor here:

	constructor(_elRef: ElementRef) {}

	//*Lifecycle hooks here:
	ngOnInit(): void {
		this.editorComp.init = this._buildSettings();
	}

	ngAfterViewInit(): void {}

	ngOnDestroy(): void {}

	//*method handle here:
	//access modifiers private:
	private _buildSettings(): IBravoSettingEditor {
		const settings: IBravoSettingEditor = {};
		settings['plugins'] = pluginsDefault;
		settings['toolbar1'] = toolbarAboveDefault;
		settings['toolbar2'] = toolbarBellowDefault;
		settings['menubar'] = false;
		settings['branding'] = false;
		settings['resize'] = false;
		settings['font_formats'] = fontsFormatDefault; //import css, font (content_style)
		settings['height'] = '500px';
		settings['width'] = '100vw';
		settings['setup'] = this._setups();
		settings['images_upload_handler'] = this._handleOnImageUpload.bind(this);
		settings['body_class'] = this.bodyCssClassName;
		return settings;
	}

	private _setups() {
		//add event and add custom btn here:
		return (editor: Editor) => {
			editor.addButton('htmlImport', {
				image: 'https://icon-library.com/images/open-icon/open-icon-8.jpg',
				tooltip: 'open',
				type: 'browsebutton',
				text: '',
				accept: '.html',
				onchange: this._handleOnFileInput.bind(this, [editor, oninput]),
			});
			editor.addCommand('htmlImport', importHtmlFileCmd, this);
		};
	}

	public onInitEditor({event, editor}: {event: any; editor: Editor}) {
		const doc = editor.getDoc();
		let titleEl = doc.querySelector('title');
		//set title
		if (this._documentTitle && titleEl) titleEl.textContent = this._documentTitle;
		else if (!titleEl) {
			const headEl = doc.querySelector('head');
			titleEl = doc.createElement('title');
			titleEl.textContent = this._documentTitle;
			headEl && titleEl && headEl.appendChild(titleEl);
		}
		//set body class name
		this.bodyCssClassName && this.bodyCssClassName.length > 0 && doc.body.classList.add(this.bodyCssClassName);
	}

	//*handler Event here:
	private _handleOnImageUpload(pBlobInfo: any, pSuccess: Function, pFailure: Function) {
		if (this.imgTypeUpload === ETypeImageUpload.Url) {
			//upload image on server side
		} else {
			let srcImg = pBlobInfo[this.imgTypeUpload]();
			if (this.imgTypeUpload === ETypeImageUpload.Base64) srcImg = this._prefixImgBase64.concat(srcImg);
			pSuccess(srcImg);
		}
		pSuccess(pBlobInfo.base64());
	}

	//handle import file here
	private _handleOnImportFileHtml(pEditor: Editor) {
		//open and read file here
	}

	private _handleOnFileInput([pEditor, ...rest], oninput) {
		let file = oninput.target.files[0];
		if (file.type !== 'text/html') return;
		let fileReader = new FileReader();
		fileReader.onload = function (e) {
			(pEditor as Editor).execCommand('htmlImport', false, {editor: pEditor, result: fileReader.result.toString()});
		};
		fileReader.readAsText(file);
	}

	private _handleOnSave(): void {}

	//private
}
