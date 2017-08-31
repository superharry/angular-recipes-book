import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms";

@Component({
  selector: "app-signup",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"]
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.signinForm = this.fb.group({
      username: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)
      ])
    });
  }

  get username(): AbstractControl {
    return this.signinForm.get("username");
  }

  get password(): AbstractControl {
    return this.signinForm.get("password");
  }

  onSignin() {

    if (this.signinForm.valid) {
      this.authService.signinUser(
        this.signinForm.value.username,
        this.signinForm.value.password
      );
    }
    this.signinForm.reset();
  }
}