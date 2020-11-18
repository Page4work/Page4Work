import { Component, OnInit, Input, Inject } from '@angular/core';
import { ServerConnectService } from '../server-connect.service';
@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})

export class UnitComponent implements OnInit {
  @Input() unitId;
  @Input() edit = false;
  private wait = true;
  private data;
  constructor(@Inject(ServerConnectService) private server: ServerConnectService) { 
      
  }

  ngOnInit() {
    console.log(this.unitId);
    this.server.getUnit(this.unitId, this.edit)
    .subscribe((data: any) => {
      this.wait = false;
      this.data = data; console.log(data);
//      if(this.edit)this.editMode(this.data);
      });
  }
}