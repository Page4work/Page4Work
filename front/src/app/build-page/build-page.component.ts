import { Component, OnInit, Inject } from '@angular/core';
import { ServerConnectService } from '../server-connect.service';
import { ActivatedRoute } from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-build-page',
  templateUrl: './build-page.component.html',
  styleUrls: ['./build-page.component.css']
})
export class BuildPageComponent implements OnInit {
  private exist =[];
  private sections=[[],[],[],[],[],[],[],[],[]];
  private numPage =0;
  private allunit = [];
  constructor(@Inject(ActivatedRoute) private activatedRoute:ActivatedRoute, @Inject(ServerConnectService) private server: ServerConnectService,  @Inject(MatDialog) public dialog: MatDialog) { }

  ngOnInit() {
    try{
    this.activatedRoute.firstChild.params.subscribe(
       (params: any) => {
            this.numPage = params['num'];
            this.server.getWorkPage(params['num'])
                .subscribe((data: any) => {
                  this.findExsist()
                  this.sections = data;
                });
            console.log(params)
       }
    );
    }
    catch(e){}
  }
  animal: string;
  name: string;
    openDialog(num): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '70%',
      data: {name: num, animal: this.numPage}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  send(){
    this.server.editWorkPage(this.numPage,this.sections).subscribe((data: any) => {
                  console.log(data);
                });
  }
  findExsist(){
    this.server.editWorkPage(this.numPage,"").subscribe((data: any) => {
      this.allunit = data.filter(function(item, pos) {
          return data.indexOf(item) == pos;
            })
          data = this.allunit;
          for(let item of this.sections){
              data = this.allunit.filter( function( el ) {
                return item.indexOf( el ) < 0;
              } );
          }
          this.exist = data;
        });
  }
  create(){
    return this.server.createObj(this.numPage);
    /*.subscribe((data: any) => {
                  return data.newUnit;
                });*/
    
  }
  ne(){
    this.create().subscribe((data: any) => {
      this.openDialog(data.newUnit);
      this.findExsist();
      })
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(this.sections);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  this.send()
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    @Inject(MatDialogRef) public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
