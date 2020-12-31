import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(){
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiJ9.bW1AZ21haWwuY29t.8YH6PMAX597YTIKmKfHlwhVIOaAv66NeSpt8WekTdZo');
    //localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiJ9.a3Jhd2llYy5ncnplZ29yejFAZ21haWwuY29t.QdcdQzx7LV7Ms3pWaz2kzz1rF7e2ed_WUKca-mrnAQQ');
    //localStorage.removeItem('activeGroup');
    //localStorage.removeItem('activeGroupName');
  }
}
