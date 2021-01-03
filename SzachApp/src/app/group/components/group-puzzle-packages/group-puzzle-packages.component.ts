import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupCoachHttpService } from '../../services/group-coach-http.service';

@Component({
  selector: 'app-group-puzzle-packages',
  templateUrl: './group-puzzle-packages.component.html',
  styleUrls: ['./group-puzzle-packages.component.css']
})
export class GroupPuzzlePackagesComponent implements OnInit {

  groupName: string;
  puzzlePackages = [];
  groupId: string;
  constructor(
    private groupCoachHttpServive: GroupCoachHttpService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.groupId = params['groupId'];
      this.groupCoachHttpServive.getGroupPuzzlePackages(params['groupId']).subscribe((response) => {
        this.puzzlePackages = response.puzzlePackages;
        this.groupName = response.groupName;
        this.transformListToSharedList();
      });;
    });
  }

  transformListToSharedList() {
    for (let i = 0; i < this.puzzlePackages.length; i++) {
      this.transformItemToSharedListItem(this.puzzlePackages[i]);
    }
  }

  goToAnswers = (puzzlePackage: any) => {
    const { _id } = puzzlePackage;
    this.router.navigate(['group/' + this.groupId + '/puzzlePackages/'+_id]);
  }

  transformItemToSharedListItem(item: any) {

    item.icon = 'error';
    item.mainInfo = item.name;
    item.secondaryInfo = item.puzzles.length;
    return item;
  }

  readonly menuItems = [
    {
      description: 'Rozwiązania',
      handler: this.goToAnswers
    }
  ];

}
