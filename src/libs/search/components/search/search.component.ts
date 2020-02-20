import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {

  @Output()
  public readonly searchValue = new EventEmitter<string>();

  public searchSign: string;

  constructor() {}

  public ngOnInit(): void {}

  public searchResult(title: string): void {
    this.searchValue.emit(title);
  }

}
