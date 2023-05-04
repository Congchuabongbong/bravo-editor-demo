import { Editor } from 'tinymce';

export const importHtmlFileCmd = (ui: boolean, { editor, result }: { editor: Editor; result: string }) => {
  editor.setContent(result, { format: 'raw' });
  return ui;
};
