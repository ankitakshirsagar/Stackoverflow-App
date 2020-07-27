import { QuestionModel } from './../Model/question.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  @Input('data') data: QuestionModel;
  constructor() {}

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
  }
}
