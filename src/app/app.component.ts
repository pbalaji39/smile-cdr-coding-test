import { Component } from '@angular/core';

import { QuestionService } from './components/questionnaire/question.service';
import { QuestionBase } from './components/questionnaire/question-base';
import { Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers:  [QuestionService]
})
export class AppComponent {
  public url: any;
  public isShow: Boolean=false;
  questions$: Observable<QuestionBase<any>[]>;

  constructor(service: QuestionService,private router: Router) {
    this.questions$ = service.getQuestions();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
        if(this.url=='/questionnaire'){this.isShow=true}else{this.isShow=false}
      }
    })
  }
}
