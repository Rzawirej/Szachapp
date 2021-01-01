import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleSolveComponent } from './puzzle-solve.component';

describe('PuzzleSolveComponent', () => {
  let component: PuzzleSolveComponent;
  let fixture: ComponentFixture<PuzzleSolveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuzzleSolveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleSolveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
