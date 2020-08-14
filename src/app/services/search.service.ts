import { TagDetailModel } from './../Model/tag-detail.model';
import { QuestionModel } from './../Model/question.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  questionArray: QuestionModel[];
  tagdetails: TagDetailModel[];
  baseUrl = 'https://api.stackexchange.com/2.2/';

  getResult(
    value: string,
    Page: number,
    sort: string,
    order: string,
    mytag: string
  ) {
    //console.log('service ' + sort);
    //console.log('service ' + order);
    return this.http
      .get(
        this.baseUrl +
          'search/advanced?Page=' +
          Page +
          '&order=' +
          order +
          '&sort=' +
          sort +
          '&q=' +
          value +
          '&tagged=' +
          mytag +
          '&site=stackoverflow&filter=!9_bDDxJY5'
      )
      .pipe(
        map((responseData) => {
          this.questionArray = [];
          for (let item of responseData['items']) {
            let tags = item['tags'];
            let obj = new QuestionModel(
              tags,
              item['owner'].display_name,
              new Date(item['creation_date'] * 1000),
              item['answer_count'],
              item['score'],
              item['body'],
              item['link'],
              item['title'],
              item['is_answered'],
              item['owner'].link
            );
            this.questionArray.push(obj);
          }
          return {
            questionArray: this.questionArray,
            hasMore: responseData['has_more'],
          };
        })
      );
  }

  getTagDetails(mytag: string) {
    return this.http
      .get(this.baseUrl + 'tags/' + mytag + '/wikis?site=stackoverflow')
      .pipe(
        map((detailsdata) => {
          console.log(detailsdata);
          let obj = new TagDetailModel(
            detailsdata['items']['0'].excerpt,
            detailsdata['items']['0'].tag_name,
            detailsdata['has_more']
          );
          return obj;
        })
      );
  }
}
