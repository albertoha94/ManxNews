import { LanguageService } from './../language.service';
import { Language } from './../language.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'language-table',
  templateUrl: './language-table.component.html',
  styleUrls: ['./language-table.component.css']
})
export class LanguageTableComponent implements OnInit {

  //-- Variables ---------------------------------------------------------------------------------/
  _languageList: Language[];

  //-- Constructor -------------------------------------------------------------------------------/
  constructor(
    private oLanguageService: LanguageService
  ) { }

  //-- Overrided methods -------------------------------------------------------------------------/
  ngOnInit() {
    this.oLanguageService.getLanguages().subscribe(
      (oLanguagesList: Language[]) => { 
        //console.log(oLanguagesList);
        this._languageList = oLanguagesList;
      }
      );
  }
}