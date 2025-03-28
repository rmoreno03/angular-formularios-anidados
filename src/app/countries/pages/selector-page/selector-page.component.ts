import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesServiceService } from '../../services/CountriesService.service';
import { Region, SmallCountry } from '../../interfaces/country.interface';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  standalone: false,
  templateUrl: './selector-page.component.html',
  styleUrl: './selector-page.component.css'
})

export class SelectorPageComponent implements OnInit {
  public myForm!: FormGroup;

  public countriesByRegion: SmallCountry[] = [];

  constructor(
    private fb: FormBuilder,
    private countryService: CountriesServiceService
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      region:  ['', Validators.required],
      country: ['', Validators.required],
      borders: ['', Validators.required],
    });

    this.onRegionChanged();

  }

  get regions():Region[] {
    return this.countryService.regions;
  }

  onRegionChanged(): void {
    this.myForm.get('region')!.valueChanges
      .pipe(
        tap( () => this.myForm.get('country')!.setValue('') ),
        //tap( () => this.borders = [] ),
        switchMap( (region) => this.countryService.getCountriesByRegion(region) ),
      )
      .subscribe( countries => {
        this.countriesByRegion = countries;
      });
  }

}
