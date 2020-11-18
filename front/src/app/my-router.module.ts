import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HelloComponent } from './hello.component';
import { LoginComponent } from './login/login.component';
import { SelectWorkPageComponent } from './select-work-page/select-work-page.component';
import { ChapterComponent } from './chapter/chapter.component';
import { SectionComponent } from './chapter/section/section.component';
import { BuildPageComponent } from './build-page/build-page.component';
import { AnswersComponent } from './answers/answers.component';
import { NewStudentComponent } from './new-student/new-student.component';
const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'build', component: BuildPageComponent , children:[
    {path: ':num', component: BuildPageComponent }
  ]},
  {path: 'selectWorkPage', component: SelectWorkPageComponent},
  {path: 'chapter', component: ChapterComponent, children:[
    {path: ':num', component: ChapterComponent }
  ]},
  {path: 'answers', component: AnswersComponent, children:[
    {path: ':num', component: AnswersComponent }
  ]},
    {path: 'register', component: RegisterComponent, children:[
    {path: ':num', component: RegisterComponent }
  ]},
    {path: 'students', component: NewStudentComponent, children:[
    {path: ':num', component: NewStudentComponent }
  ]}
  
];

@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class MyRouterModule { }