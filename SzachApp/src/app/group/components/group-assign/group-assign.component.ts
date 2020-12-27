import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { GroupCoachHttpService } from '../../services/group-coach-http.service';

@Component({
  selector: 'app-group-assign',
  templateUrl: './group-assign.component.html',
  styleUrls: ['./group-assign.component.css']
})
export class GroupAssignComponent implements OnInit {

  assignedGroups = [];
  notAssignedGroups = [];
  typeDisplay = '';
  type = '';
  name = '';
  id = '';
  constructor(private groupCoachHttpService: GroupCoachHttpService, private location: Location) { }

  ngOnInit(): void {
    const state: any = this.location.getState();
    this.name = state.name;
    this.id = state.id;
    this.type = state.type;
    this.groupCoachHttpService.getGroupsByAssigned(this.type, this.id).subscribe((groups) => {
      this.assignedGroups = groups.groupsWith;
      this.notAssignedGroups = groups.groupsWithout;
    });
    switch (this.type) {
      case 'news': {
        this.typeDisplay = 'Ogłoszenie';
        break;
      }
      case 'debut': {
        this.typeDisplay = 'Debiut';
        break;
      }
      case 'puzzle': {
        this.typeDisplay = 'Paczka zadań';
        break;
      }
    }

  }

  manageAssigning(unassign: any, assign: any){
    for(let i = 0; i < assign.length; i++){
      this.groupCoachHttpService.assignToGroup(assign[i].value, this.id, this.type).subscribe();
    }
    for (let i = 0; i < unassign.length; i++) {
      this.groupCoachHttpService.unassignFromGroup(unassign[i].value, this.id, this.type).subscribe();
    }
  }

}
