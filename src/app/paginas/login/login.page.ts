import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  myFormulario: FormGroup;

  constructor(private Ruta:Router, private formBuilder: FormBuilder) {

    this.myFormulario = this.formBuilder.group({
      email: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ]))
    });
   }

  ngOnInit() {
  }


  menu(){
    console.log("hiciste click")
    this.Ruta.navigate(['/tabs']);
  }

}
