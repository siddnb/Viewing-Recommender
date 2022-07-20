import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  filtersForm = this.fb.group({
    TVorMovie: [''],
    Genre: [''],
    Rating: [''],
    Runtime: [''],
    ReleaseDate: ['']
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(): void{
    console.log(this.filtersForm.value);
    console.log(this.filtersForm.get('TVorMovie')?.value);
  }

}
