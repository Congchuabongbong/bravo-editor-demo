import { AfterViewInit, Component, ViewChild } from '@angular/core';
import * as tinymceType from 'tinymce';
import { IBravoSettingEditor } from './bravo-editor/data-access/bravo.editor.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('myEditor', { static: true }) myEditor: any;
  private _toolbarAbove = 'newdocument importHtml';
  private _toolbarBellow = 'formatselect | backcolor forecolor| link image media table charmap hr | alignleft aligncenter alignright alignjustify | outdent indent | strikethrough superscript subscript | code | save';
  private _plugins = 'lists link image table code help media table hr save';
  private _imagesArrPush: string[] = [];
  private _imagesArrRemaining: string[] = [];
  public _myConfigEditor: IBravoSettingEditor = {
    plugins: this._plugins,
    menubar: false,
    statusbar: false,
    toolbar1: this._toolbarAbove,
    toolbar2: this._toolbarBellow,
    height: '50vh',
    width: '70vw',
    automatic_uploads: true,
    images_upload_handler: this._uploadImages.bind(this),
    file_browser_callback: (field_name: string, url: string, type: string, win: Window) => {},
    setup: (editor: tinymceType.Editor) => {
      editor.addButton('importHtml', {
        icons: 'upload2',
        tooltip: 'Import HTML File',
        onclick: this._handlerImportFileHtml.bind(this, editor),
      });
    },
  };

  //constructor
  constructor() {}

  ngAfterViewInit(): void {}

  onInit(): void {}

  private _uploadImages(blobInfo: any, success: Function, failure: Function): void {
    // implement your logic to upload images via API or cloud storage service and call `success` on success, `failure` otherwise
    //call api here:
    success('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfPlxCCQ5ydy93GtuVUWA89t27P3U-FCctQ41a_Wpj2w&s');
    this._imagesArrPush.push('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfPlxCCQ5ydy93GtuVUWA89t27P3U-FCctQ41a_Wpj2w&s');
    // failure('failed to upload')
  }

  public onSubmit() {
    const currentImagesSrc = [];
    this.myEditor.editor
      .getBody()
      .querySelectorAll('img')
      .forEach((image) => currentImagesSrc.push(image.src));
    this._imagesArrRemaining = this._unintersection(this._imagesArrPush, currentImagesSrc);
    console.log(this._imagesArrRemaining);
    debugger;
  }

  private _selectFile(callback, value, meta) {
    // implement your logic to open a file picker dialog and call `callback` with selected file information
  }

  //handle event for editor...
  handler(editor: tinymceType.Editor) {}

  //handle importFileHtml here
  private _handlerImportFileHtml(editor: tinymceType.Editor) {
    editor.insertContent('<h1>Hello World</h1>');
  }

  private _unintersection(arr1: string[], arr2: string[]) {
    let result = [];

    for (let i = 0; i < arr1.length; i++) {
      if (!arr2.includes(arr1[i]) && !result.includes(arr1[i])) {
        result.push(arr1[i]);
      }
    }

    for (let i = 0; i < arr2.length; i++) {
      if (!arr1.includes(arr2[i]) && !result.includes(arr2[i])) {
        result.push(arr2[i]);
      }
    }
    return result;
  }
}
