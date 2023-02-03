import { Component, OnInit } from '@angular/core';

import { RecommenderService } from '../recommender.service';
import { Suggestion } from '../suggestion';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  results: Suggestion[] = [];
  choices: number[] = [];

  constructor(private rs: RecommenderService) { }

  ngOnInit(): void {
    this.getRecommendations();
  }

  private generateChoices(choices: number, totalResults: number): number[]{
    var arr = [];
    while(arr.length < choices){
        var r = Math.floor(Math.random() * totalResults);
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
  }

  getRecommendations(): void{
    //TODO: Get number of choices from user.
    let numChoices = 5;

    this.rs.getResults().
    subscribe(response => {
      this.choices = this.generateChoices(numChoices, response.results.length);
      console.log(response.results[this.choices[0]]);
      for(let i = 0; i < this.choices.length; i++) {
        this.results!.push(response.results[this.choices[i]]);
        console.log(`This is option ${i+1}: ${response.results[this.choices[i]].title}`);
      }
    });
  }

}
