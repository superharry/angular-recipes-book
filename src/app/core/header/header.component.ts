import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { DataService } from "../../shared/data.service";


@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {

  collapsed: boolean = false;

  constructor(public authService: AuthService, public dataService: DataService) {}

  ngOnInit() {}

  onLogout() {
    this.authService.logoutUser();
  }

  onSaveData() {
    this.dataService.saveData();
  }

  onLoadData() {
    this.dataService.loadData();
  }


}