import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css']
})
export class ContactCreateComponent implements OnInit {

  contactForm = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required,
    Validators.pattern('[a-zA-z0-9_\.]+@[a-zA-Z]+\.[a-zA-Z]+')]),
    phone: new FormControl("", [Validators.pattern('[0-9]+')]),
    city: new FormControl(),
    country: new FormControl(),
    title: new FormControl()
  });

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  public onSubmit() {
    console.log(this.contactForm.value);
    this.apiService.createContact(this.contactForm.value).subscribe( res => {
      alert('Success');
      this.contactForm.reset();
    }, err => {
      alert('Error');
      this.contactForm.reset();
    });
  }

  get email() {
    return this.contactForm.get('email');
  }

  get phone() {
    return this.contactForm.get('phone');
  }

}
