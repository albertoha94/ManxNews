import { PlatformService } from './../platform.service';
import { Platform } from './../platform.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'platform-table',
  templateUrl: './platform-table.component.html',
  styleUrls: ['./platform-table.component.css']
})
export class PlatformTableComponent implements OnInit {

  //-- Variables ---------------------------------------------------------------------------------/
  _platformList: Platform[];

  //-- Constructor -------------------------------------------------------------------------------/
  constructor(
    private oPlatformService: PlatformService
  ) { }

  //-- Overrided methods -------------------------------------------------------------------------/
  ngOnInit() {
    this.oPlatformService.getPlatforms().subscribe(
      (oLanguagesList: Platform[]) => { 
        this._platformList = oLanguagesList;
      }
    );
  }
}