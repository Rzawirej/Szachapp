import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupCoachHttpService } from 'src/app/group/services/group-coach-http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-participants-list',
  templateUrl: './participants-list.component.html',
  styleUrls: ['./participants-list.component.css']
})
export class ParticipantsListComponent implements OnInit {

  groupName: string;
  participants = [];
  groupId: string;
  constructor(
    public dialog: MatDialog,
    private groupCoachHttpServive: GroupCoachHttpService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.groupId = params['groupId'];
      this.groupCoachHttpServive.getParticipants(this.groupId).subscribe((group) => {
        this.groupName = group.name;
        this.participants = group.participants;
      });
    });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      groupId: this.groupId,
    };

    const dialogRef = this.dialog.open(AddParticipantDialog, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.groupCoachHttpServive.getParticipants(this.groupId).subscribe((group) => {
        this.groupName = group.name;
        this.participants = group.participants;
      });
    });
  }

  deleteParticipant(participantEmail: string, participantId: string) {
    this.groupCoachHttpServive.deleteParticipant(this.groupId, participantEmail).subscribe((participants) => this.participants = this.participants.filter((value) => participantId !== value._id));
  }

}

@Component({
  selector: 'add-participant-dialog',
  templateUrl: 'add-participant-dialog.html',
})
export class AddParticipantDialog {
  constructor(
    public dialogRef: MatDialogRef<ParticipantsListComponent>,
    private groupCoachHttpServive: GroupCoachHttpService,
    @Inject(MAT_DIALOG_DATA) data) {
      this.groupId = data.groupId;
    }
  email: string;
  groupId: string;

  addParticipant(){
    this.groupCoachHttpServive.addParticipant(this.groupId, this.email).subscribe((participants) => {
      this.dialogRef.close(participants);
    });
  }
}