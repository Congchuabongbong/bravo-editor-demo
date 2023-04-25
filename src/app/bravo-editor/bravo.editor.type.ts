import { Settings } from 'tinymce';

export interface IBravoSettingEditor extends Settings {
  toolbar1?: boolean | string | string[] | undefined;
  toolbar2?: boolean | string | string[] | undefined;
  toolbar3?: boolean | string | string[] | undefined;
  suffix?:string
}
