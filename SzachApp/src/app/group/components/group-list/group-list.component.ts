import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GroupCoachHttpService } from '../../services/group-coach-http.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  groups = []

  constructor(
    public dialog: MatDialog,
    private groupCoachHttpService: GroupCoachHttpService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.groupCoachHttpService.getCoachGroups().subscribe((groups) => this.groups = groups);
  }

  openNewDialog(): void {
    const dialogRef = this.dialog.open(NewGroupDialog);
    dialogRef.afterClosed().subscribe(result => {
      this.groupCoachHttpService.getCoachGroups().subscribe((groups) => this.groups = groups);
    });

  }

  goToParticipants(groupId: string): void{
    this.router.navigate(['/participants/'+groupId]);
  }

  openEditDialog(groupId: string): void {
    const dialogRef = this.dialog.open(EditGroupDialog);
    dialogRef.afterClosed().subscribe(result => {
      this.groupCoachHttpService.editGroupName(groupId, result).subscribe((oldGroup) => {
        for(let i = 0; i<this.groups.length; i++){
          if(this.groups[i]._id === oldGroup._id){
            this.groups[i].name = result;
          }
        }
      });
    });
  }

  deleteGroup(id: string){
    this.groupCoachHttpService.deleteGroup(id).subscribe((group) => this.groups = this.groups.filter((value) => group._id !== value._id));
  }

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
