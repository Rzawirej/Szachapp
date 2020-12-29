import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewsCoachHttpService } from '../../services/news-coach-http.service';

@Component({
  selector: 'app-coach-news',
  templateUrl: './coach-news.component.html',
  styleUrls: ['./coach-news.component.css']
})
export class CoachNewsComponent implements OnInit {

  newsList = []
  constructor(
    public dialog: MatDialog,
    private newsCoachHttpServive: NewsCoachHttpService,
    private router: Router) { }

  ngOnInit(): void {
    this.newsCoachHttpServive.getCoachNews().subscribe((news) => { this.newsList = news; this.transformListToSharedList() });
  }

  transformListToSharedList() {
    for (let i = 0; i < this.newsList.length; i++) {
      this.transformItemToSharedListItem(this.newsList[i]);
    }
  }

  transformItemToSharedListItem(item: any) {
    item.icon = 'check';
    item.mainInfo = item.name;
    item.secondaryInfo = item.text;
    return item;
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewNewsDialog);
    dialogRef.afterClosed().subscribe(result => {
      this.newsCoachHttpServive.addNews(result.name, result.text).subscribe((news) => this.newsList.push(this.transformItemToSharedListItem(news)));
    });
  }

  goToAssign = (news: any) => {
    const { _id, name } = news;
    console.log(this.router);
    this.router.navigateByUrl('/group-assign', { state: { id: _id, type: 'news', name: name } });
    console.log(1);
  }

  deleteNews = (news: any) => {
    const { _id } = news;
    this.newsCoachHttpServive.deleteNews(_id).subscribe((news) => this.newsList = this.newsList.filter((value) => news._id !== value._id));
  }

  readonly menuItems = [{
    description: 'Przypisz do grupy',
    handler: this.goToAssign
  },
  {
    description: 'Usuń',
    handler: this.deleteNews
  }
  ]
}

@Component({
  selector: 'new-news-dialog',
  templateUrl: 'new-news-dialog.html',
})
export class NewNewsDialog {
  constructor(
    public dialogRef: MatDialogRef<CoachNewsComponent>) { }
  name = '';
  text = '';
}
