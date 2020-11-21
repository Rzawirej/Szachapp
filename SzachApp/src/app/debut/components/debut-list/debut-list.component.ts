import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-debut-list',
  templateUrl: './debut-list.component.html',
  styleUrls: ['./debut-list.component.css']
})
export class DebutListComponent implements OnInit {

  debuts = [{name: 'francuska', firstMoves: '1.e4 e6 2. d4 d5 3. Bd3 dxe4 4. Bxe4 Nf6 5.Bf3 c6'},
    { name: 'francuska', firstMoves: '1.e4 e6 2. d4 d5 3. Bd3 dxe4 4. Bxe4 Nf6 5.Bf3 c6' },
    { name: 'francuska', firstMoves: '1.e4 e6 2. d4 d5 3. Bd3 dxe4 4. Bxe4 Nf6 5.Bf3 c6' },
    { name: 'francuska', firstMoves: '1.e4 e6 2. d4 d5 3. Bd3 dxe4 4. Bxe4 Nf6 5.Bf3 c6' }]
  constructor() { }

  ngOnInit(): void {
  }

}
