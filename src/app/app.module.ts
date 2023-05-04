import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorModule  } from '@tinymce/tinymce-angular';
import { BravoHtmlEditor } from './bravo-editor/bravo.editor.component';


@NgModule({
  declarations: [AppComponent, BravoHtmlEditor],
  imports: [BrowserModule, AppRoutingModule, EditorModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
