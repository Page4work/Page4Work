import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ServerConnectService } from '../../server-connect.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
   @Input() data;
   private present = 0;
   private Msg = "";
   private wait = true;
  constructor(@Inject(ActivatedRoute) private activatedRoute:ActivatedRoute,@Inject(Router) private router:Router,@Inject(ServerConnectService) private server: ServerConnectService) { }

  ngOnInit() {
    this.activatedRoute.fragment.subscribe(
      (params: any) => {
        if((params-1)>=0 && (params-1)<this.data.length)
          {
            this.present = (params-1);
            this.Msg = "";
          }
        else if(params) this.Msg = "page not found, you see page number "+(this.present+1);
        }
      );
  }
  next(steps){
    this.router.navigate([(this.router.url).split("#")[0]], { fragment: ((1+this.present)+steps).toString() });
  }
  anyPage(steps){
    this.router.navigate([(this.router.url).split("#")[0]], { fragment: (steps+1).toString() });
  }

}