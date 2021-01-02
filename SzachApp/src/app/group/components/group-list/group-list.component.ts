import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GroupCoachHttpService } from '../../services/group-coach-http.service';
import { save, remove } from '../../../shared/store/actions/active-group.action';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  coachGroups = []
  participantGroups = []

  constructor(
    public dialog: MatDialog,
    private groupCoachHttpService: GroupCoachHttpService,
    private router: Router,
    private store: Store<{ activeGroup: any }>
    ) { }

  ngOnInit(): void {
    this.groupCoachHttpService.getCoachGroups().subscribe((groups) => {
      this.coachGroups = groups;
      this.transformCoachGroupsToSzachappList();
    });
    this.groupCoachHttpService.getParticipantGroups().subscribe((groups) => {
      this.participantGroups = groups;
      this.transformParticipantGroupsToSzachappList();
    });
  }

  transformCoachGroupsToSzachappList() {
    for (let i = 0; i < this.coachGroups.length; i++) {
      this.transformCoachGroupsItemToSzachappListItem(this.coachGroups[i]);
    }
  }

  transformCoachGroupsItemToSzachappListItem(item: any) {
    item.icon = 'check';
    item.mainInfo = item.name;
    item.secondaryInfo = item.participants.length;
    return item;
  }

  transformParticipantGroupsToSzachappList() {
    for (let i = 0; i < this.participantGroups.length; i++) {
      this.transformParticipantGroupsItemToSzachappListItem(this.participantGroups[i]);
    }
  }

  transformParticipantGroupsItemToSzachappListItem(item: any) {
    item.icon = 'check';
    item.mainInfo = item.name;
    item.secondaryInfo = item.participants.length;
    return item;
  }

  openNewDialog(): void {
    const dialogRef = this.dialog.open(NewGroupDialog);
    dialogRef.afterClosed().subscribe(result => {
      this.groupCoachHttpService.getCoachGroups().subscribe((groups) => {
        this.coachGroups = groups;
        this.transformCoachGroupsToSzachappList();
      });
    });

  }

  goToParticipants = (group: any) => {
    const { _id } = group;
    this.router.navigate(['/participants/'+_id]);
  }

  openEditDialog = (group: any) => {
    const { _id } = group;
    const dialogRef = this.dialog.open(EditGroupDialog);
    dialogRef.afterClosed().subscribe(result => {
      this.groupCoachHttpService.editGroupName(_id, result).subscribe((oldGroup) => {
        for(let i = 0; i<this.coachGroups.length; i++){
          if(this.coachGroups[i]._id === oldGroup._id){
            this.coachGroups[i].name = result;
          }
        }
        this.transformCoachGroupsToSzachappList();
      });
    });
  }

  deleteGroup = (group: any) => {
    const { _id } = group;
    this.groupCoachHttpService.deleteGroup(_id).subscribe((group) => this.coachGroups = this.coachGroups.filter((value) => group._id !== value._id));
  }

  activateGroup = (group: any) => {
    const { _id, name } = group;
    localStorage.setItem('activeGroup', _id);
    localStorage.setItem('activeGroupName', name);
    this.store.dispatch(save());
  }

  deactivateGroup = (group: any) => {
    localStorage.removeItem('activeGroup');
    localStorage.removeItem('activeGroupName');
    this.store.dispatch(remove());
  }

  leaveGroup = (group: any) => {
    console.log('leave');
  }

  readonly coachMenuItems = [
    {
      description: 'Uczestnicy',
      handler: this.goToParticipants
    },
    {
      description: 'Zmień nazwę',
      handler: this.openEditDialog
    },
    {
      description: 'Usuń',
      handler: this.deleteGroup
    }
  ];

  readonly participantMenuItems = [
    {
      description: 'Aktywuj',
      handler: this.activateGroup
    },
    {
      description: 'Deaktywuj',
      handler: this.deactivateGroup
    },
    {
      description: 'Opuść',
      handler: this.leaveGroup
    }
  ];

  readonly participantActiveMenuItems = [
    {
      description: 'Deaktywuj',
      handler: this.deactivateGroup
    },
    {
      description: 'Opuść',
      handler: this.leaveGroup
    }
  ];
}

@Component({
  selector: 'new-group-dialog',
  templateUrl: 'new-group.dialog.html',
})
export class NewGroupDialog {
  constructor(
    public dialogRef: MatDialogRef<GroupListComponent>,
    private groupCoachHttpService: GroupCoachHttpService) { }
  name = '';

  addGroup(){
    if(this.name){
      this.groupCoachHttpService.addGroup(this.name).subscribe();
    }
  }
}

@Component({
  selector: 'edit-group-dialog',
  templateUrl: 'edit-group.dialog.html',
})
export class EditGroupDialog {
  constructor(public dialogRef: MatDialogRef<GroupListComponent>) { }
  name = '';
}
