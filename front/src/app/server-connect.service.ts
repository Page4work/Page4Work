import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class ServerConnectService {
  
  baseUrl = 'http://localhost:5000/'
  constructor(@Inject(HttpClient) private http: HttpClient, @Inject(CookieService) private cookieService: CookieService) { }
   getUnit(id, student=false) {
    let loginstring = {"user":this.cookieService.get("Token"),"id":id};
    if (student) loginstring["student"]=student;
    return this.http.post(this.baseUrl+'getUnit',loginstring);
  }
  sendPic(pic) {
    console.log(pic);
    return this.http.post(this.baseUrl+'upload-base64',{"UploadFiles":pic})  
  }
  getUnitTeacher(id, student=false) {
    let loginstring = {"user":this.cookieService.get("Token"),"id":id};
    if (student) loginstring["student"]=student;
    return this.http.post(this.baseUrl+'getUnitTeacher',loginstring);
  }
  joinPage(code,viewOnly=false) {
    let loginstring = {"user":this.cookieService.get("Token"),"code":code,"viewOnly":viewOnly};
    return this.http.post(this.baseUrl+'joinPage',loginstring);
  }
  getTeacherCode(page) {
    let loginstring = {"user":this.cookieService.get("Token"),"page":page};
    return this.http.post(this.baseUrl+'getTeacherCode-1',loginstring);
  }
  newPage(name,desc) {
    let loginstring = {"user":this.cookieService.get("Token"),"name":name,"desc":desc};
    return this.http.post(this.baseUrl+'newPage',loginstring);
  }
  share(page=3,startTime=0,endTime=0) {
    let loginstring = {"user":this.cookieService.get("Token"),"id":page};
    return this.http.post(this.baseUrl+'share',loginstring);
  }
  register(email,passw,lname,fname){
        let loginstring = {"email":email,"pass":passw,"lname":lname,"fname":fname};
    return this.http.post(this.baseUrl+'register',loginstring);
  }
  sendText(id,text,param = []) {
    let loginstring = {"user":this.cookieService.get("Token"),"id":id,"text":text};
    for(let p of param){
      loginstring[p.key]=p.value;
    }
    return this.http.post(this.baseUrl+'editText',loginstring);
  }
  getWorkPages(user) {
    let loginstring = {"user":this.cookieService.get("Token")};
    return this.http.post(this.baseUrl+'getPages',loginstring);
  }
  getWorkPage(id) {
    let loginstring = {"user":this.cookieService.get("Token"),"id":id};
    return this.http.post(this.baseUrl+'getChepters',loginstring);
  }
  editWorkPage(id, newSec) {
    let loginstring = {"user":this.cookieService.get("Token"),"id":id, "newSec": newSec};
    return this.http.post(this.baseUrl+'EditChepters',loginstring);
  }
  createObj(id,type=1,unitnum = 0) {
    let loginstring
    if(!unitnum)
      loginstring = {"user":this.cookieService.get("Token"),"id":id,"type":type};
    else
      loginstring = {"user":this.cookieService.get("Token"),"id":id,"type":type,"unitnum":unitnum};
    return this.http.post(this.baseUrl+'newUnit',loginstring);
  }
  
  login(user,pass){
    let loginstring = {"user":user,"pass":pass};
    return this.http.post(this.baseUrl+'login',loginstring);
  }
  
}
