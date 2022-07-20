import { Component, OnInit } from '@angular/core';

import { RecommenderService } from '../recommender.service';
import { Suggestion } from '../suggestion';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  results?: Suggestion[];

  constructor(private rs: RecommenderService) { }

  ngOnInit(): void {
    this.getRecommendations();
  }

  getRecommendations(): void{
    this.rs.getResults().
    subscribe(response => {
      console.log(response);
      this.results=response.results.slice(0,5);
    });
  }

}
