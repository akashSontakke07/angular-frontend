import { Component } from '@angular/core';
import { setLocalStorageJson } from 'src/ts-files/common-utils';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {


constructor(){
    setLocalStorageJson("userDetails", { test: "test" }); // TODO : if you want to local run
  
}
}
