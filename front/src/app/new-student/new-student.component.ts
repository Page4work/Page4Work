import { ActivatedRoute } from '@angular/router';
import { ServerConnectService } from '../server-connect.service';
import { Component, OnInit,ViewChild, Inject } from '@angular/core';
import {  GridComponent,  } from '@syncfusion/ej2-angular-grids';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.css']
})
export class NewStudentComponent implements OnInit {
public dReady: boolean = false;
    public dtTime: boolean = false;
    public isDataBound: boolean = false;
    public isDataChanged: boolean = true;
    public intervalFun: any;
    public clrIntervalFun: any;
    public clrIntervalFun1: any;
    public clrIntervalFun2: any;    
    public dropSlectedIndex: number = null;
    public stTime: any;
    public data: Object;
    public filter: Object;
    public filterSettings: Object;
    public selectionSettings: Object;  
    public height: string = '240px';
    @ViewChild('sample',{static:false}) 
    public listObj: DropDownListComponent;
    @ViewChild('overviewgrid',{static:false})
    public gridInstance : GridComponent ;  
    public ddlData: Object[] = [
        { text: 'Show All', value: '1' }    
    ]; 
    public fields: Object = { text: 'text', value: 'value' };
    private item: number[] = [1, 2, 3, 4, 5];  
    public page;

  constructor(@Inject(ActivatedRoute) private activatedRoute:ActivatedRoute,@Inject(ServerConnectService) private server: ServerConnectService) { }
  private sections=[];
  getTeacherCode(){
    this.server.getTeacherCode(this.page).subscribe((data: any) => {
      console.log(data)
      this.ngOnInit()
    })
  }
  ngOnInit() {
    try{
    this.activatedRoute.firstChild.params.subscribe(
       (params: any) => {
            this.server.share(params['num'])
                .subscribe((data: any) => {
                  this.data = data;
                  this.page = params['num'];
                });
            
       }
    );
    }
    catch(e){}



this.filterSettings = { type: "Menu" };      
        this.filter = { type: "CheckBox" };    
       this.stTime = performance.now(); 
        this.selectionSettings = {persistSelection: true, type: "Multiple", checkboxOnly: true };  
  }

    
    ngAfterViewInit(args: any): void {
        
        document.getElementById('overviewgrid').addEventListener('DOMSubtreeModified', () => {  
            if (this.stTime && this.isDataChanged) {
                let msgEle = document.getElementById('msg');
                let val: any = (performance.now() - this.stTime).toFixed(0);
                this.stTime = null;                
                this.dtTime = false;
                this.isDataChanged = false;
                msgEle.innerHTML = 'Load Time: ' + "<b>" + val + "</b>" + '<b>ms</b>';
                msgEle.classList.remove('e-hide')
           }
            })
    }

    onDataBound(args:any):void {
        clearTimeout(this.clrIntervalFun);
        clearInterval(this.intervalFun);
        this.dtTime = true;
    }
    

}