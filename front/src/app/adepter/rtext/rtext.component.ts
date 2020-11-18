import { Component, OnInit , Input, ViewChild, Inject} from '@angular/core';

import { ServerConnectService } from '../../server-connect.service';

import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService, RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
@Component({
  selector: 'app-rtext',
  templateUrl: './rtext.component.html',
  styleUrls: ['./rtext.component.css'],
      providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, TableService]
})

export class RtextComponent implements OnInit {
  @ViewChild('toolsRTE', {static: false})
    public rteObj: RichTextEditorComponent;
  baseUrl = 'https://us-central1-vivid-fragment-225620.cloudfunctions.net/'
  @Input() data;
  @Input() fin;
  @Input() id;
  @Input() points = -1;
  public tools: object = {
            items: [
                 'Bold', 'Italic', 'Underline',  '|',
                'FontName', 'FontSize', '|',
                 '|', 'Undo', 'Redo', '|',
                 'OrderedList', '|',
                'Indent', 'Outdent', 'Alignments', '|',  'ClearFormat','|', 'FullScreen']
        };

  constructor(@Inject(ServerConnectService) private server: ServerConnectService) {
    
   }

  ngOnInit() {
       if(this.fin["fin"]) this.checked = true; else this.checked = false; 
  }


  public checked = true;
 

  public saveData() {
      this.saveData2(  this.rteObj );
	}
  public change(event){
    this.checked = event.checked;
    this.saveData();
  }
  public saveData2( data ) {
    let im = document.querySelectorAll('img');
    im.forEach((x)=>{
      var appThis = this;
      if(x.src.startsWith("blob:"))
      fetch(x.src).then( res => {return res.blob();}).then(blob => {
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function() {
          let arraybuffer = reader.result;  
          appThis.server.sendPic(arraybuffer).subscribe((data: any) => {    x.src=data.url;});
        }
      })
    })
   
    let moreData : any = [{"key":"fin","value":this.checked}]
    if('student' in this.fin) moreData.push({"key":"student","value":this.fin.student})
    if(this.points >= 0) moreData.push({"key":"points", "value": this.points})
    console.log("t",moreData);
    this.server.sendText(this.id,data.value,moreData)
        .subscribe((data: any) => {console.log(data)});
	}
  ngOnDestroy() {
    this.saveData();
    console.log('rtext destroyed!');
  }
}