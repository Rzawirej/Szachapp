import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsCoachHttpService } from '../../services/news-coach-http.service';

@Component({
  selector: 'app-player-news',
  templateUrl: './player-news.component.html',
  styleUrls: ['./player-news.component.css']
})
export class PlayerNewsComponent implements OnInit {

  newsList = []

  constructor(
    private newsCoachHttpServive: NewsCoachHttpService,
    private router: Router) { }

  ngOnInit(): void {
    this.newsCoachHttpServive.getCoachNews().subscribe((news) => { this.newsList = news; this.transformListToSharedList()});
  }

  transformListToSharedList(){
    for(let i=0; i<this.newsList.length; i++){
      this.transformItemToSharedListItem(this.newsList[i]);
    }
  }

  transformItemToSharedListItem(item: any){
    item.icon = 'check';
    item.mainInfo = item.name;
    item.secondaryInfo = item.text;
  }

  openDialog() {
    //const dialogRef = this.dialog.open(NewNewsDialog);
    //dialogRef.afterClosed().subscribe(result => {
    //  this.newsCoachHttpServive.addNews(result.name, result.text).subscribe((news) => this.newsList.push(news));
    //});
  }

  goToAssign = (news: any) => {
    const {_id, name} = news;
    console.log(this.router);
    this.router.navigateByUrl('/group-assign', { state: { id: _id, type: 'news', name: name } });
    console.log(1);
  }

  deleteNews = (news: any) => {
    const {_id} = news;
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
