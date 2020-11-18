import { Component, OnInit, Input, Inject } from '@angular/core';
import { ServerConnectService } from '../server-connect.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-edit-unit',
  templateUrl: './edit-unit.component.html',
  styleUrls: ['./edit-unit.component.css']
})
export class EditUnitComponent implements OnInit {
@Input() unitId;
@Input() pageId;
  private data;
  constructor(@Inject(ServerConnectService) private server: ServerConnectService) { }

  ngOnInit() {
    console.log(this.unitId);
    this.server.getUnit(this.unitId)
    .subscribe((data: any) => {
      this.data = data; console.log(data);
      this.editMode(this.data);
      });
  }
  add(num, unitnum){
    this.server.createObj(this.pageId,num,this.unitId).subscribe((data: any) => {
                  this.ngOnInit();
                });
  }
  addq(){
    this.server.createObj(this.pageId,1,this.unitId).subscribe((data: any) => {
      this.server.createObj(this.pageId,0,this.unitId).subscribe((data: any) => {
        this.server.createObj(this.pageId,2,this.unitId).subscribe((data: any) => {
          this.ngOnInit();  
                });          
                });            
                });
  }
  editMode(data){
    for(let item of data){
      if(item['type']=="public"){
        item['type']="private";
        item['editable'] = true;
      }
      else
        if(item["editable"])
        item['type']="user area";
        else
        item['type']="user area";
    }
  }
    drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}