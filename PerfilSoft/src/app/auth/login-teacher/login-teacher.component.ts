import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
// import { catchError, retry } from 'rxjs/operators';
import * as $ from 'jquery';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login-teacher',
  templateUrl: './login-teacher.component.html',
  styleUrls: ['./login-teacher.component.css']
})
export class LoginTeacherComponent implements OnInit {
  msg: any = [];
  avail: boolean;
  constructor(private router: Router, private authService: AuthService) { }
  ngOnInit(): void {
    $(document).ready(() => {
      $('#sign-in-btn').click(() => {
        $('.containerr').addClass('sign-up-mode');
      });
      $('#sign-up-btn').click(() => {
        $('.containerr').removeClass('sign-up-mode');
      });
    });
  }
  signinup(): void {
    // console.log("hello1");
    this.msg = '';
    this.avail = false;
  }
  onSubmitRegister(f: NgForm): void {
    // for (var val of this.arr) {
    //   var a = val['email'];
    //   var b = f.controls.email.value;
    //   if (a == b) {
    //     this.msg = "User already exist with this user name (email)!!";
    //     this.avail = true;
    //     return;
    //   }
    // }
    if (f.controls.p1.value !== f.controls.p2.value) {
      this.msg = 'Password   doesn\'t match';
      this.avail = true;
      return;
    }
    if (!f.valid) {
      this.msg = 'Invalid Form Fields';
      this.avail = true;
      return;
    }
    this.authService.registerTeacher(JSON.stringify(f.value))
      .subscribe(
        data => {
          // tslint:disable-next-line: no-string-literal
          if (data['msg']) {
            // tslint:disable-next-line: no-string-literal
            this.msg = data['msg'];
            this.avail = true;
            return;
          }
          // this.authService.msg = "successfully registered a user!";
          window.location.reload();
          this.router.navigate(['/teacher']);
        },
        error => { this.router.navigate(['/error']); }
      );
  }
  onSubmitLogin(f: NgForm): void {
    if (!f.valid) {
      this.msg = 'Invalid Email or Password';
      this.avail = true;
      return;
    }
    this.authService.login(JSON.stringify(f.value))
      .subscribe(
        data => {
          // console.log(data);
          // tslint:disable-next-line: no-string-literal
          if (data['msg']) {
            // tslint:disable-next-line: no-string-literal
            this.msg = data['msg'];
            this.avail = true;
            return;
          }
          // tslint:disable-next-line: no-string-literal
          if (data['role'] === 'admin') {
            // console.log("admin");
            // tslint:disable-next-line: no-string-literal
            localStorage.setItem('token', data['token']);
            localStorage.setItem('admin', 'yes');
            localStorage.setItem('student', 'no');
            localStorage.setItem('teacher', 'no');
            // this.router.navigate(['/admin']);
            // this.router.navigate(['/']);
            this.router.navigate(['/admin/adminhome']);
          }
          // tslint:disable-next-line: no-string-literal
          else if (data['role'] === 'student') {
            // console.log("student")
            // tslint:disable-next-line: no-string-literal
            if (data['blocked'] === true) {
              this.msg = 'You are blocked by Admin wait until admin unblock you!!!';
              this.avail = true;
              return;
            }
            else {
              // console.log("not blocked");
              // tslint:disable-next-line: no-string-literal
              localStorage.setItem('token', data['token']);
              localStorage.setItem('userid', f.controls.email.value);
              localStorage.setItem('admin', 'no');
              localStorage.setItem('student', 'yes');
              localStorage.setItem('teacher', 'no');
              this.router.navigate(['/student/studenthome']);
            }
            // this.router.navigate(['/']);
          }
          else {
            // console.log("teacher");
            // tslint:disable-next-line: no-string-literal
            if (data['blocked'] === true) {
              this.msg = 'You are blocked by Admin wait until admin unblock you!!!';
              this.avail = true;
              return;
            }
            else {
              // tslint:disable-next-line: no-string-literal
              localStorage.setItem('token', data['token']);
              localStorage.setItem('userid', f.controls.email.value);
              localStorage.setItem('admin', 'no');
              localStorage.setItem('student', 'no');
              localStorage.setItem('teacher', 'yes');
              this.router.navigate(['/teacher/teacherhome']);
            }
          }
        },
        error => { this.router.navigate(['/error']); }
      );
  }
}
