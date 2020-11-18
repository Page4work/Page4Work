import { Component, OnInit, Input, Inject } from '@angular/core';
import { ServerConnectService } from '../server-connect.service';
import { CookieService } from 'ngx-cookie-service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-select-work-page',
  templateUrl: './select-work-page.component.html',
  styleUrls: ['./select-work-page.component.css']
})

export class SelectWorkPageComponent implements OnInit {
  private wait = true;
  private workPages = [];
  private newWorkPage = [];
  constructor(@Inject(ServerConnectService) private server: ServerConnectService, @Inject(CookieService) private cookieService: CookieService, @Inject(MatDialog)  public dialog: MatDialog ) { }
  public detail = "";
  ngOnInit() {
    this.showConfig();
  }
  showConfig() {
  let T = this.cookieService.get("Token");
  this.server.getWorkPages(T)
    .subscribe((data: any) => {
      this.wait = false;
      //for remove duplicates
      this.workPages = data.filter(function(item, pos) {
          return data.findIndex(function(item2, i){
                    return item2.id === item.id}) == pos;
            });

      //for raise the level of permittion to owner
      for(let item of data){
        if(item.type == "owner")
          this.workPages[this.workPages.findIndex(function(item2, i){
                    return item2.id === item.id})].type="owner";
      }
    }
    );
  }
  joinGroup(code){
    this.server.joinPage(code)
    .subscribe((data: any) => {
      this.ngOnInit();
    })
  }
    viewonly(code){
    this.server.joinPage(code,false)
    .subscribe((data: any) => {
      this.detail = data.student
    })
  }
  share(id){
    this.server.share(id)
    .subscribe((data: any) => {
      console.log(data);
    })
  }

    openDialog(num): void {
    const dialogRef = this.dialog.open(DialogNewPageDialog, {
      width: '70%',
      data: {name: 4, animal: "f"}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.showConfig();
    });
  }
}

@Component({
  selector: 'dialog-new-page-dialog',
  templateUrl: 'dialog-new-page-dialog.html',
})
export class DialogNewPageDialog {

  constructor(
    @Inject(MatDialogRef) public dialogRef: MatDialogRef<DialogNewPageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public server:ServerConnectService) {}
    createNewPage(name,desc){
    this.server.newPage(name,desc)
    .subscribe((data: any) => {
      this.dialogRef.close();
    },(data: any)=>{alert("erorr")})
  }
  onNoClick(name,desc): void {
    this.createNewPage(name,desc)
  }

}