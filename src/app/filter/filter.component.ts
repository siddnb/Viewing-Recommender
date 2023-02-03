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
    MinRating: '',
    MaxRating: '',
    MinRuntime: '',
    MaxRuntime: '',
    MinReleaseDate: '',
    MaxReleaseDate:''
  });

  public genres: Array<any> = [
    {name: 'Action', value: 'action'},
    {name: 'Adventure', value: 'adventure'},
    {name: 'Animation', value: 'animation'},
    {name: 'Comedy', value: 'comedy'},
    {name: 'Crime', value: 'crime'},
    {name: 'Documentary', value: 'documentary'},
    {name: 'Family', value: 'family'},
    {name: 'History', value: 'history'},
    {name: 'Horror', value: 'horror'},
    {name: 'Mystery', value: 'mystery'},
    {name: 'Reality-TV', value: 'reality_tv'},
    {name: 'Sci-Fi', value: 'sci_fi'},
    {name: 'Sport', value: 'sport'},
    {name: 'War', value: 'war'},
    {name: 'Western', value: 'western'},
    {name: 'Thriller', value: 'thriller'},
  ];

  public ratings: string[] = ['10','9','8','7','6','5','4','3','2','1','0'];

  constructor(
    private fb: FormBuilder, 
    private rs: RecommenderService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onCheckChange(event: any) {
    const formArray: FormArray = this.filtersForm.get('Genre') as FormArray;
  
    /* Selected */
    if(event.checked){
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.source.value));
    }
    /* unselected */
    else{
      // find the unselected element
      let i: number = 0;
  
      formArray.controls.forEach((ctrl: any) => {
        if(ctrl.value == event.source.value) {
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
    
    let minRating = this.filtersForm.get('MinRating')?.value;
    let maxRating = this.filtersForm.get('MaxRating')?.value;
    if(minRating !== '' || maxRating !== ''){
      this.rs.filters.user_rating = `${minRating},${maxRating}`;
    } 

    let minRuntime = this.filtersForm.get('MinRuntime')?.value;
    let maxRuntime = this.filtersForm.get('MaxRuntime')?.value;
    if(minRuntime !== '' || maxRuntime !== ''){
      this.rs.filters.runtime = `${minRuntime},${maxRuntime}`;
    }
    
    let minReleaseDate = this.filtersForm.get('MinReleaseDate')?.value;
    let maxReleaseDate = this.filtersForm.get('MaxReleaseDate')?.value;
    if(minReleaseDate !== '' || maxReleaseDate !== ''){
      this.rs.filters.release_date = `${minReleaseDate},${maxReleaseDate}`;
    }
  }

  onSubmit(): void{
    this.fillOptions();
    this.router.navigateByUrl('/results');
    console.log(this.filtersForm.value);
  }

}
