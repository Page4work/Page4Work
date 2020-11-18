import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-adepter',
  templateUrl: './adepter.component.html',
  styleUrls: ['./adepter.component.css']
})
export class AdepterComponent implements OnInit {
  @Input() part;
  private type
  constructor() { }

  ngOnInit() {
    if(this.part['type']=="private") this.type = 0;
    if(this.part['type']=="public") this.type = 1;
    if(this.part['type']=="private" && !this.part['editable'] ) this.type = 4;
    if(this.part['type']=="user area") this.type = 2;
    if(this.part['type']=="teacher area") this.type = 3;
    
    
  }

}