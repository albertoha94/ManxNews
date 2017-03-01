import { AppService } from './../app.service';
import { App } from './../app.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css']
})
export class AppListComponent implements OnInit {

  //-- Variables ---------------------------------------------------------------------------------/
  _appList : App [];

  //-- Constructor -------------------------------------------------------------------------------/
  constructor(
    private oAppService : AppService
  ) { }

  //-- Overrided methods -------------------------------------------------------------------------/
  ngOnInit() {

    //-- Llenando la lista de lenguajes.
    this.oAppService.getApps().subscribe(
      (oAppList: App[]) => {
        this._appList = oAppList;
      }
    );
  }

  //-- Methods -----------------------------------------------------------------------------------/

}