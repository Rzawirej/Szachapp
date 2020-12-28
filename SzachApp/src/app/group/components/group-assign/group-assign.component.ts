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
  returnUrl = '/'
  constructor(private groupCoachHttpService: GroupCoachHttpService, private location: Location, private router: Router) { }

  ngOnInit(): void {
    const state: any = this.location.getState();
    if(!state.name || !state.id || !state.type){
      this.router.navigateByUrl('/');
    }
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
        this.returnUrl = '/news';
        break;
      }
      case 'debut': {
        this.typeDisplay = 'Debiut';
        this.returnUrl = '/debut'
        break;
      }
      case 'puzzle': {
        this.typeDisplay = 'Paczka zadań';
        this.returnUrl = '/puzzles'
        break;
      }
    }

  }

  manageAssigning(assignedArray: any, unassignedArray: any){
    let toUnassignArray = this.getUnselected(this.materialSelectArrayToValuesArray(assignedArray));
    let toAssignArray = this.materialSelectArrayToValuesArray(unassignedArray);
    console.log(toUnassignArray, toAssignArray);
    for (let i = 0; i < toAssignArray.length; i++){
      this.groupCoachHttpService.assignToGroup(toAssignArray[i], this.id, this.type).subscribe();
    }
    for (let i = 0; i < toUnassignArray.length; i++) {
      this.groupCoachHttpService.unassignFromGroup(toUnassignArray[i], this.id, this.type).subscribe();
    }
    this.router.navigateByUrl(this.returnUrl);
  }

  getUnselected(selected: any){
    const unselected = [];
    for (let i = 0; i < this.assignedGroups.length; i++){
      if( selected.indexOf(this.assignedGroups[i]._id) === -1 ){
        unselected.push(this.assignedGroups[i]._id);
      }
    }

    return unselected;
  }

  materialSelectArrayToValuesArray(materialSelectArray: any){
    return materialSelectArray.map(option => option.value);
  }
}
