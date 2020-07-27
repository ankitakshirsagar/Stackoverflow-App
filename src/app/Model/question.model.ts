export class QuestionModel {
  constructor(
    private tags: string[],
    private userName: string,
    private creationDate: Date,
    private answerCount: number,
    private votes: number,
    private questionBody: string,
    private questionLink: string,
    private questionTitle: string,
    private isAnswered: boolean,
    private ownerlink: string
  ) {}
}
