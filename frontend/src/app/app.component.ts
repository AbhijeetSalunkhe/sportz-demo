import { Component, OnInit } from '@angular/core';
import { CountryService } from './../services/country.service';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'frontend';
  countries: any;
  country: any;
  addCountryForm: FormGroup;
  submitted = false;
  selectedFile: File = null;
  item: Array<any>;
  public imageURL:any;
  public continents = [
    'Asia',
    'Oceania',
    'Europe',
    'Africa'
  ]

  constructor(
    private countryService: CountryService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getCountries();
    this.addCountryForm = this.formBuilder.group({
      continent: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]{3,20}')]],
      rank: ['', [Validators.required ,Validators.pattern('[0-9]*')]],
      flag: ['', [Validators.required]],
    });
  }

  get f() { return this.addCountryForm.controls; }

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    if(this.selectedFile.type == 'image/png' || this.selectedFile.type == 'image/jpg'){
      if(this.selectedFile.size <= 4194304){
        const reader = new FileReader();
        reader.readAsDataURL(this.selectedFile)
        reader.onload = (event:any) => {
          this.imageURL = event.target.result as string;
        }
      } else {
        this.toastr.error('Image file must be less than 4 MB');
      }
    } else {
        this.toastr.error('Incorrect file type only accept jpg,png');
    }
    // File Preview
  }
  

  getCountries(){
    this.countryService.getCountries()
    .subscribe((data:any)=>{
      if(data.flag == true){
        this.countries=data.data;
      }
    });
  }

  getCountry(id):void{
    this.countryService.getCountry(id).subscribe((res:any)=>{  
      if(res.flag == true){
        this.country=res.data;
      }
    });
  }

  addCountry() {
    this.submitted = true;
    if (this.addCountryForm.invalid) {
      return false;
    }
     else {
      const req = new FormData();
      req.append('continent',this.addCountryForm.value.continent);
      req.append('name',this.addCountryForm.value.name);
      req.append('rank',this.addCountryForm.value.rank);
      req.append('flag',this.selectedFile,this.selectedFile.name);
      this.countryService.addCountry(req)
      .subscribe((res:any)=>{
        if(res.flag == true){
          this.toastr.success(res.message)
        }  else {       
          if(res.status == 500){
            this.toastr.error(res.errors);debugger
          } else {
            this.toastr.error(res.message);
          }
        }
      });
    }
  }

}
