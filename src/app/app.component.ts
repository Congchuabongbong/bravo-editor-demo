import { AfterViewInit, Component, ViewChild } from '@angular/core';
import * as tinymceType from 'tinymce';
import { BravoEditorComponent } from './bravo-editor/bravo.editor.component';
import { IBravoSettingEditor } from './bravo-editor/bravo.editor.type';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('myEditor', { static: true }) myEditor: BravoEditorComponent;
  private _toolbarAbove = 'newdocument importHtml';
  private _toolbarBellow = 'formatselect | backcolor forecolor| link image media table charmap hr | alignleft aligncenter alignright alignjustify | outdent indent | strikethrough superscript subscript | code | save';
  private _plugins = 'lists link image table code help media table hr save';
  public _myConfigEditor: IBravoSettingEditor = {
    plugins: this._plugins,
    menubar: false,
    statusbar: false,
    toolbar1: this._toolbarAbove,
    toolbar2: this._toolbarBellow,
    height: '50vh',
    width: '70vw',
    images_upload_handler: this._uploadImages.bind(this),
    setup: (editor: tinymceType.Editor) => {
      editor.addButton('importHtml', {
        image: 'https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/ok.png',
        tooltip: 'My button Custom',
        onclick: this._handlerImportFileHtml.bind(this,editor),
      });
    },
  };

  constructor() {

  }


  ngAfterViewInit(): void {
    this.myEditor.init = this._myConfigEditor;
    this.myEditor.onInit.subscribe((e) => {
      const editor = e.editor as tinymceType.Editor;
      console.log(editor.dom);
    });
    this.myEditor.onSaveContent.subscribe((e) => {});
  }

  onInit(): void {
  }

  private _uploadImages(blobInfo:any) {
    // implement your logic to upload images via API or cloud storage service and call `success` on success, `failure` otherwise
    this._uploadImageSuccess('successfully uploaded')
    this._uploadImageFailure('failed to upload')
  }

  private _uploadImageSuccess(message:string) {
    console.log(message);
  }
  private _uploadImageFailure(message:string) {
    console.log(message);
  }


  private _selectFile(callback, value, meta) {
    // implement your logic to open a file picker dialog and call `callback` with selected file information
  }

  //handle event for editor...
  handler(editor: tinymceType.Editor) {}

  //handle importFileHtml here
  private _handlerImportFileHtml(editor: tinymceType.Editor) {

    editor.insertContent('<h1>Hello World</h1>')
  }
}
