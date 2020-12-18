import { Component, OnInit } from '@angular/core';
import { DebutCoachHttpService } from '../../services/debut-coach-http.service';

@Component({
  selector: 'app-debut-list',
  templateUrl: './debut-list.component.html',
  styleUrls: ['./debut-list.component.css']
})
export class DebutListComponent implements OnInit {

  debuts = [];
  constructor(private debutCoachHttpService: DebutCoachHttpService) { }

  ngOnInit(): void {
    this.debutCoachHttpService.getDebuts().subscribe((debuts) => this.debuts = debuts);
  }

}
