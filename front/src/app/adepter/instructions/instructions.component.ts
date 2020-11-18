import { Component, OnInit , Input} from '@angular/core';

import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService, RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';



@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  @Input() data;
  @Input() grade;

  public conf = {
        toolbar: [ ]
    }
  public inlineMode: object = { enable: true, onSelection: true };

  constructor() { }

  ngOnInit() {
  }

}