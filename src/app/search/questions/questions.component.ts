import { SearchService } from './../../services/search.service';
import { QuestionModel } from './../../Model/question.model';
import { TagDetailModel } from './../../Model/tag-detail.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  @Input('data') data: QuestionModel;
  @Input('tagdetails') tagdetails: TagDetailModel;
  @Output() sendTag = new EventEmitter<string>();
  tagclicked = false;

  constructor(private searchService: SearchService) {}

  tags: string[];
  userName: string;
  creationDate: Date;
  answerCount: number;
  votes: number;
  questionBody: string;
  questionLink: string;
  questionTitle: string;
  isAnswered: boolean;
  ownerLink: string;

  // excerpt: string;
  // tag_name: string;

  ngOnInit(): void {
    this.tags = this.data['tags'];
    this.userName = this.data['userName'];
    this.creationDate = this.data['creationDate'];
    this.answerCount = this.data['answerCount'];
    this.votes = this.data['votes'];
    this.questionBody = this.data['questionBody'];
    this.questionLink = this.data['questionLink'];
    this.questionTitle = this.data['questionTitle'];
    this.isAnswered = this.data['isAnswered'];
    this.ownerLink = this.data['ownerlink'];

    // this.excerpt = this.tagdetails['excerpt'];
    // this.tag_name = this.tagdetails['tag_name'];
  }

  onTagClick($event: any) {
    this.tagclicked = true;
    console.log(this.tagclicked);
    let tag = $event.target.innerText;
    this.sendTag.emit(tag);
  }
}
