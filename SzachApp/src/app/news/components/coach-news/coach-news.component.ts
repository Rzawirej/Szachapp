import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-coach-news',
  templateUrl: './coach-news.component.html',
  styleUrls: ['./coach-news.component.css']
})
export class CoachNewsComponent implements OnInit {

  newsList = [{ name: 'Odwołane', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna mi, volutpat et convallis vulputate, sodales nec arcu. Donec ac tellus sodales, mattis dui a, pellentesque odio. Mauris eu odio a odio rutrum sagittis. Etiam non purus lectus. Pellentesque nec neque est. Praesent non lorem et arcu tempor efficitur vitae sit amet massa. Integer vulputate quis tortor ac sollicitudin. Nunc lectus nibh, varius non tellus ac, egestas rutrum tortor. Donec commodo dolor vel euismod aliquam. Integer ac dui auctor, auctor justo a, tempus ante. Vivamus gravida eget sem malesuada pharetra. Suspendisse at mi fermentum, ultricies lorem eu, tristique neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pharetra rhoncus dapibus. ' },
    { name: 'Turniej', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna mi, volutpat et convallis vulputate, sodales nec arcu. Donec ac tellus sodales, mattis dui a, pellentesque odio. Mauris eu odio a odio rutrum sagittis. Etiam non purus lectus. Pellentesque nec neque est. Praesent non lorem et arcu tempor efficitur vitae sit amet massa. Integer vulputate quis tortor ac sollicitudin. Nunc lectus nibh, varius non tellus ac, egestas rutrum tortor. Donec commodo dolor vel euismod aliquam. Integer ac dui auctor, auctor justo a, tempus ante. Vivamus gravida eget sem malesuada pharetra. Suspendisse at mi fermentum, ultricies lorem eu, tristique neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pharetra rhoncus dapibus. ' },
    { name: 'Inna sala', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna mi, volutpat et convallis vulputate, sodales nec arcu. Donec ac tellus sodales, mattis dui a, pellentesque odio. Mauris eu odio a odio rutrum sagittis. Etiam non purus lectus. Pellentesque nec neque est. Praesent non lorem et arcu tempor efficitur vitae sit amet massa. Integer vulputate quis tortor ac sollicitudin. Nunc lectus nibh, varius non tellus ac, egestas rutrum tortor. Donec commodo dolor vel euismod aliquam. Integer ac dui auctor, auctor justo a, tempus ante. Vivamus gravida eget sem malesuada pharetra. Suspendisse at mi fermentum, ultricies lorem eu, tristique neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pharetra rhoncus dapibus. ' },
    { name: 'Przypomnienie', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna mi, volutpat et convallis vulputate, sodales nec arcu. Donec ac tellus sodales, mattis dui a, pellentesque odio. Mauris eu odio a odio rutrum sagittis. Etiam non purus lectus. Pellentesque nec neque est. Praesent non lorem et arcu tempor efficitur vitae sit amet massa. Integer vulputate quis tortor ac sollicitudin. Nunc lectus nibh, varius non tellus ac, egestas rutrum tortor. Donec commodo dolor vel euismod aliquam. Integer ac dui auctor, auctor justo a, tempus ante. Vivamus gravida eget sem malesuada pharetra. Suspendisse at mi fermentum, ultricies lorem eu, tristique neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pharetra rhoncus dapibus. ' }]
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(NewNewsDialog);
  }
}

@Component({
  selector: 'new-news-dialog',
  templateUrl: 'new-news-dialog.html',
})
export class NewNewsDialog {
  constructor(
    public dialogRef: MatDialogRef<CoachNewsComponent>) { }

  animal = {};
  onNoClick(): void {
    this.dialogRef.close();
  }
}
