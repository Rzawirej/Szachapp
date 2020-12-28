import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DebutCoachHttpService } from '../../services/debut-coach-http.service';

@Component({
  selector: 'app-debut-list',
  templateUrl: './debut-list.component.html',
  styleUrls: ['./debut-list.component.css']
})
export class DebutListComponent implements OnInit {

  debuts = [];
  constructor(private debutCoachHttpService: DebutCoachHttpService, private router: Router) { }

  ngOnInit(): void {
    this.debutCoachHttpService.getDebuts().subscribe((debuts) => this.debuts = debuts);
  }

  goToAssign(id: string, name: string) {
    this.router.navigateByUrl('/group-assign', { state: { id: id, type: 'debut', name: name } });
  }

  deleteDebut(id: string) {
    this.debutCoachHttpService.deleteDebut(id).subscribe((debut) => this.debuts = this.debuts.filter((value) => debut._id !== value._id));
  }
}
