import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.reducers";

import * as DataActions from "./data.actions";

@Injectable()
export class DataService {

  constructor(private store: Store<AppState>) {}

  saveData() {
    this.store.dispatch(new DataActions.SaveData());
  }

  loadData() {
    this.store.dispatch(new DataActions.LoadData());
  }

}