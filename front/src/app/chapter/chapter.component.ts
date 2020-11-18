import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ServerConnectService } from "../server-connect.service";

@Component({
  selector: "app-chapter",
  templateUrl: "./chapter.component.html",
  styleUrls: ["./chapter.component.css"]
})
export class ChapterComponent implements OnInit {
  private id;
  private wait = true;
  private sections = [[], [], [], [], [], [], [], [], []];

  constructor(
    @Inject(ActivatedRoute) private activatedRoute: ActivatedRoute,
    @Inject(ServerConnectService) private server: ServerConnectService
  ) {}

  ngOnInit() {
    try {
      this.activatedRoute.firstChild.params.subscribe((params: any) => {
        this.server.getWorkPage(params["num"]).subscribe((data: any) => {
          this.sections = data;
          this.wait = false;
        });
      });
    } catch (e) {
      this.goBack();
    }
  }

  goBack() {
    console.log("bug");
  }
}
