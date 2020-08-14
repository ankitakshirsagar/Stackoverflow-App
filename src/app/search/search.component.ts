import { TagDetailModel } from './../Model/tag-detail.model';
import { QuestionModel } from './../Model/question.model';
import { SearchService } from './../services/search.service';
import { Component, OnInit, Input } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  queryData: string;
  resultOfSearch: any[] = [];
  pageOfItems: QuestionModel[] = [];
  pagination: true;
  page: number;
  pageSize: number;
  num1: number;
  pageToGo: number;
  hasMore: boolean;
  sortBy: string = 'relevance';
  allSort: string[] = ['relevance', 'votes', 'activity', 'creation'];
  orderBy: string = 'desc';
  orders: string[] = ['desc', 'asc'];
  mytag: string = '';
  tag_details: TagDetailModel;
  tagExcerpt: string;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.onResetVariables();
  }

  onResetVariables() {
    this.resultOfSearch = [];
    this.page = 1;
    this.pageSize = 10;
    this.num1 = 3;
    this.pageToGo = 1;
  }

  onSubmit(query: HTMLInputElement) {
    this.onResetVariables();
    this.queryData = query.value;
    this.getSearchResults(
      this.queryData,
      1,
      this.allSort[0],
      this.orders[0],
      ''
    );
  }

  getSearchResults(
    searchString,
    pageNo?: number,
    sortBy?: string,
    orderBy?: string,
    mytag?: string
  ) {
    this.searchService
      .getResult(searchString, pageNo, sortBy, orderBy, mytag)
      .subscribe(
        (responseData) => {
          this.setData(responseData);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  setData(responseData) {
    this.hasMore = responseData['hasMore'];
    for (let item of responseData['questionArray']) {
      this.resultOfSearch.push(item);
    }
  }

  onPageChange(event) {
    this.page = event;
    if (this.page + 1 >= this.num1 && this.hasMore) {
      this.pageToGo += 1;
      this.getSearchResults(
        this.queryData,
        this.pageToGo,
        this.sortBy,
        this.orderBy,
        this.mytag
      );
      this.num1 += 3;
    }
  }

  radioSortChange(event: MatRadioChange) {
    this.onResetVariables();
    this.sortBy = event.value;
    this.getSearchResults(
      this.queryData,
      this.pageToGo,
      this.sortBy,
      this.orderBy,
      this.mytag
    );
  }

  radioOrderChange(event: MatRadioChange) {
    this.onResetVariables();
    this.orderBy = event.value;
    this.getSearchResults(
      this.queryData,
      this.pageToGo,
      this.sortBy,
      this.orderBy,
      this.mytag
    );
  }

  receiveTag(event: string) {
    this.onResetVariables();
    this.mytag = event;
    this.receiveTagDetails(this.mytag);
    this.getSearchResults(
      this.queryData,
      this.pageToGo,
      this.sortBy,
      this.orderBy,
      this.mytag
    );
  }

  receiveTagDetails(mytag: string) {
    this.searchService.getTagDetails(mytag).subscribe(
      (detailsData: TagDetailModel) => {
        this.setTagDetails(detailsData);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  setTagDetails(tagdata: TagDetailModel) {
    this.tag_details = tagdata;
    console.log('component: ' + this.tag_details.has_more);
  }
}
