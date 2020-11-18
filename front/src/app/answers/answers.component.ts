import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ServerConnectService } from "../server-connect.service";

@Component({
  selector: "app-answers",
  templateUrl: "./answers.component.html",
  styleUrls: ["./answers.component.css"]
})
export class AnswersComponent implements OnInit {
  public sections = [];
  public data;
  constructor(
    @Inject(ActivatedRoute) private activatedRoute: ActivatedRoute,
    @Inject(ServerConnectService) private server: ServerConnectService
  ) {}
  inArr(arr, value) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == value) return true;
    }
    return false;
  }
  ngOnInit() {
    try {
      this.activatedRoute.firstChild.params.subscribe((params: any) => {
        this.server.getWorkPage(params["num"]).subscribe((data: any) => {
          this.sections = data;
          if (!data.length) return;
          this.selectUnit(data[0][0]);
        });
      });
    } catch (e) {
      console.log(e);
    }
  }
  public output = "";
  public studentList = [];
  public showList = [];
  public showQ = true;
  createSubList(data) {
    this.showList = [];
    for (let i = 0; i < this.studentList.length; i++) {
      this.studSelect(this.studentList[i], i, data);
    }
  }
  studSelect(stud, i, data) {
    this.showList[i] = { obj: [], student: 0, grades: 0 };
    data.forEach(x => {
      console.log(x);
      if (x.student == stud) {
        this.showList[i]["obj"].push(x);
        this.showList[i]["student"] = x.student;
        this.showList[i]["studentName"] = x.StudentName;
        if (x.editable) {
          this.showList[i]["grades"] = x.grades;
        }
        if (x.fin) this.showList[i]["fin"] = x.fin;
      }
      if (!x.student) {
        this.showList[i]["obj"].push(x);
      }
    });
  }
  selectUnit(UnitId) {
    this.server.getUnitTeacher(UnitId).subscribe((data: any) => {
      //data.map((x)=>x.data = "");
      this.output = JSON.stringify(data);

      data.forEach(x => {
        if (x.student && !this.inArr(this.studentList, x.student))
          this.studentList.push(x.student);
      });
      /*data = groups.private.sort(function(a, b) {
                return parseFloat(a.student) - parseFloat(b.student);
            });*/

      this.editMode(data);
      this.data = data;
      this.createSubList(data);
    });
  }
  editMode(data) {
    for (let item of data) {
      if (item["type"] == "public") item["type"] = "public";
      else if (item["editable"]) item["editable"] = false;
      else {
        item["editable"] = true;
        item["type"] = "teacher area";
      }
    }
  }
  step = -1;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
