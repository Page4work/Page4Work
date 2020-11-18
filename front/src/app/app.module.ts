import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MyRouterModule } from './my-router.module';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { LoginComponent } from './login/login.component';
import { AnswersComponent } from './answers/answers.component';
import {MatSelectModule} from '@angular/material/select';
import { SelectWorkPageComponent } from './select-work-page/select-work-page.component';
import { ChapterComponent } from './chapter/chapter.component';
import { BuildPageComponent } from './build-page/build-page.component';
import { SectionComponent } from './chapter/section/section.component';
import { UnitComponent } from './unit/unit.component';
import { RegisterComponent } from './register/register.component';
import { NewStudentComponent } from './new-student/new-student.component';
import { AdepterComponent } from './adepter/adepter.component';
import { FeedbackComponent } from './adepter/feedback/feedback.component';
import { InstructionsComponent } from './adepter/instructions/instructions.component';
import { RtextComponent } from './adepter/rtext/rtext.component';
import { ServerConnectService } from './server-connect.service';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CookieService } from 'ngx-cookie-service';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from './build-page/build-page.component';
import { DialogNewPageDialog } from './select-work-page/select-work-page.component';
import { EditUnitComponent } from './edit-unit/edit-unit.component';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

import { GridAllModule } from '@syncfusion/ej2-angular-grids';
@NgModule({
  imports:      [  BrowserModule, FormsModule, MyRouterModule,  HttpClientModule, CKEditorModule, MatMenuModule, MatIconModule, BrowserAnimationsModule, DragDropModule , MatDialogModule,RichTextEditorAllModule, MatSlideToggleModule, MatSelectModule, MatSliderModule,MatExpansionModule, MatCheckboxModule, MatSidenavModule ,MatListModule, GridAllModule],
  entryComponents: [DialogOverviewExampleDialog, DialogNewPageDialog],
  declarations: [ AppComponent, HelloComponent, LoginComponent, SelectWorkPageComponent, ChapterComponent, SectionComponent , UnitComponent, AdepterComponent,FeedbackComponent, InstructionsComponent,RtextComponent,BuildPageComponent, DialogOverviewExampleDialog, EditUnitComponent, AnswersComponent, NewStudentComponent, RegisterComponent, DialogNewPageDialog, DropDownListComponent],
  bootstrap:    [ AppComponent ],
  providers: [ServerConnectService, CookieService]
})
export class AppModule { }
