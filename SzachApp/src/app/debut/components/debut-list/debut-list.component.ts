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
  activeGroup = '';
  menuItems = [];

  constructor(private debutCoachHttpService: DebutCoachHttpService, private router: Router) { }

  ngOnInit(): void {
    this.activeGroup = localStorage.getItem('activeGroup');
    if(this.activeGroup){
      this.debutCoachHttpService.getGroupDebuts(this.activeGroup).subscribe((debuts) => { this.debuts = debuts; this.transformListToSharedList(); });
      this.menuItems = this.groupMenuItems;
    }else{
      this.debutCoachHttpService.getDebuts().subscribe((debuts) => { this.debuts = debuts; this.transformListToSharedList(); });
      this.menuItems = this.coachMenuItems;
    }
  }

  transformListToSharedList() {
    for (let i = 0; i < this.debuts.length; i++) {
      this.transformItemToSharedListItem(this.debuts[i]);
    }
  }

  transformItemToSharedListItem(item: any) {
    item.icon = 'check';
    item.mainInfo = item.name;
    item.secondaryInfo = item.color;
    return item;
  }

  goToAssign = (debut: any) => {
    const {_id, name} = debut;
    this.router.navigateByUrl('/group-assign', { state: { id: _id, type: 'debut', name: name } });
  }

  deleteDebut = (debut: any) => {
    const {_id} = debut
    this.debutCoachHttpService.deleteDebut(_id).subscribe((debut) => this.debuts = this.debuts.filter((value) => debut._id !== value._id));
  }

  goToDebut = (debut: any) => {
    const { _id } = debut;
    this.router.navigate(['debut', _id]);
  }

  readonly coachMenuItems = [
    {
      description: 'Przypisz do grupy',
      handler: this.goToAssign
    },
    {
      description: 'Usuń',
      handler: this.deleteDebut
    }
  ];

  readonly groupMenuItems = [
    {
      description: 'Przeglądaj',
      handler: this.goToDebut
    }
  ];
}
