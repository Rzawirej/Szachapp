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
    this.newsCoachHttpServive.getCoachNews().subscribe((news) => this.newsList = news);
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewNewsDialog);
    dialogRef.afterClosed().subscribe(result => {
      this.newsCoachHttpServive.addNews(result.name, result.text).subscribe((news) => this.newsList.push(news));
    });
  }

  goToAssign(id: string, name: string){
    this.router.navigateByUrl('/group-assign', { state: { id: id, type: 'news', name: name } });
  }

  deleteNews(id: string) {
    this.newsCoachHttpServive.deleteNews(id).subscribe((news) => this.newsList = this.newsList.filter((value) => news._id !== value._id));
  }
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
