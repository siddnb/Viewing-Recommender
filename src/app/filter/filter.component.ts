import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { RecommenderService } from '../recommender.service';



@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  filtersForm = this.fb.group({
    TVorMovie: '',
    Genre: this.fb.array([]),
    Rating: '',
    Runtime: '',
    ReleaseDate: ''
  });

  public genres: Array<any> = [
    {name: 'Action', value: 'action'},
    {name: "Comedy", value: 'comedy'},
    {name: "Thriller", value: 'thriller'}
  ];

  constructor(
    private fb: FormBuilder, 
    private rs: RecommenderService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onCheckChange(event: any) {
    const formArray: FormArray = this.filtersForm.get('Genre') as FormArray;
  
    /* Selected */
    if(event.target.checked){
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    }
    /* unselected */
    else{
      // find the unselected element
      let i: number = 0;
  
      formArray.controls.forEach((ctrl: any) => {
        if(ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }
  
        i++;
      });
    }
  }

  private fillOptions(): void{
    //TODO: error handling/assertions?
    this.rs.filters.title_type = this.filtersForm.get('TVorMovie')?.value!;
    this.rs.filters.genres = this.filtersForm.get('Genre')?.value! as string[];
    this.rs.filters.user_rating = this.filtersForm.get('Rating')?.value!;
    this.rs.filters.moviemeter = this.filtersForm.get('Runtime')?.value!;
    this.rs.filters.release_date = this.filtersForm.get('ReleaseDate')?.value!;
  }

  onSubmit(): void{
    this.fillOptions();
    this.router.navigateByUrl('/results');
    console.log(this.filtersForm.value);
  }

}
