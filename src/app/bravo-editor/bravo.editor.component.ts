import { Component, ElementRef, Inject, InjectionToken, NgZone, OnInit, Optional, PLATFORM_ID, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

@Component({
  selector: 'bravo-editor',
  template: '',
  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditorComponent),
      multi: true,
    },
  ],
})
export class BravoEditorComponent extends EditorComponent implements OnInit {
  constructor(private elementRef: ElementRef, ngZone: NgZone, @Inject(PLATFORM_ID) platformId, @Inject(TINYMCE_SCRIPT_SRC) @Optional() tinymceScriptSrc?: string) {
    super(elementRef, ngZone, platformId, tinymceScriptSrc);
    console.log(tinymceScriptSrc);
  }

  //*Lifecycle hooks here:
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    //to do something here...
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    //to do something here...
  }
}
