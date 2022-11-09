import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexnavComponent } from './index/indexnav/indexnav.component';
import { IndexheaderComponent } from './index/indexheader/indexheader.component';
import { IndexmainComponent } from './index/indexmain/indexmain.component';
import { LoginTeacherComponent } from './auth/login-teacher/login-teacher.component';
import { LoginStudentComponent } from './auth/login-student/login-student.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ResetComponent } from './auth/reset/reset.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ResetPasswordDoneComponent } from './auth/reset-password-done/reset-password-done.component';
import { NotfoundErrorComponent } from './error/notfound-error/notfound-error.component';
import { ServerErrorComponent } from './error/server-error/server-error.component';
import { LoadingComponent } from './loading/loading/loading.component';
import { MsgboxComponent } from './msgbox/msgbox.component';
import { CheatingComponent } from './error/cheating/cheating.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexnavComponent,
    IndexheaderComponent,
    IndexmainComponent,
    LoginTeacherComponent,
    LoginStudentComponent,
    ResetComponent,
    ResetPasswordComponent,
    ResetPasswordDoneComponent,
    NotfoundErrorComponent,
    ServerErrorComponent,
    LoadingComponent,
    MsgboxComponent,
    CheatingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
