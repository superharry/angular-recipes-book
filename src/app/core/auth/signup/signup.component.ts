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
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.signupForm = this.fb.group({
      username: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)
      ])
    });
  }

  get username(): AbstractControl {
    return this.signupForm.get("username");
  }

  get password(): AbstractControl {
    return this.signupForm.get("password");
  }

  onSignup() {
    if (this.signupForm.valid) {
      this.authService.signupUser(
        this.signupForm.value.username,
        this.signupForm.value.password
      );
    }
    this.signupForm.reset();
  }
}