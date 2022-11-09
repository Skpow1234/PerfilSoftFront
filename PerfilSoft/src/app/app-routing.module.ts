import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginStudentComponent } from './auth/login-student/login-student.component';
import { LoginTeacherComponent } from './auth/login-teacher/login-teacher.component';
import { ResetPasswordDoneComponent } from './auth/reset-password-done/reset-password-done.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ResetComponent } from './auth/reset/reset.component';
import { IndexmainComponent } from './index/indexmain/indexmain.component';
import { NotfoundErrorComponent } from './error/notfound-error/notfound-error.component';
import { ServerErrorComponent } from './error/server-error/server-error.component';
import { CheatingComponent } from './error/cheating/cheating.component';
const routes: Routes = [
  { path: '', component: IndexmainComponent },
  { path: 'teacher', component: LoginTeacherComponent },
  { path: 'student', component: LoginStudentComponent },
  { path: 'reset', component: ResetComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'reset-password-done', component: ResetPasswordDoneComponent },
  { path: 'cheat', component: CheatingComponent },
  { path: 'error', component: ServerErrorComponent },
  { path: '**', component: NotfoundErrorComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
