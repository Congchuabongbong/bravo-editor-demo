import { Settings, Editor } from 'tinymce';

export interface IBravoSettingEditor extends Settings {
  toolbar1?: boolean | string | string[] | undefined;
  toolbar2?: boolean | string | string[] | undefined;
  toolbar3?: boolean | string | string[] | undefined;
}

export interface IBravoHtmlEditorBase {
  bLocalImageToBase64: boolean;
  baseUrl: string;
  bodyCssClassName: string;
  bodyHtml: string;
  bOnlyBodyHtml: boolean;
  defaultFontFamily: string;
  documentTitle: string;
  // headerStyleContent: string;
  // headerStyleContentElementId: string;
  // bodyColor: string;
  // editorContextMenuStrip: string;
  // editorMode: string;
  // imeMode: string; //enum;
  // scrollBarSetting: string;
  // toolbarContextMenuStrip: string;
  // autoValidate: boolean;
  // defaultFontSizeInPt: number;
  // defaultForceColor: string;
  // documentCssFilePath: string;
}

export type BtnCustom = {
  nameBtn: string;
  icons: string;
  tooltip: string;
  onClick: (editor: Editor) => void;
};

export enum ETypeImageUpload {
  Base64,
  Blob,
  BlobUri,
  Uri,
  Url,
}
