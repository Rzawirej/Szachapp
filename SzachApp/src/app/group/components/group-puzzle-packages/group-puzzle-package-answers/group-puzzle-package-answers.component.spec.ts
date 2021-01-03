import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPuzzlePackageAnswersComponent } from './group-puzzle-package-answers.component';

describe('GroupPuzzlePackageAnswersComponent', () => {
  let component: GroupPuzzlePackageAnswersComponent;
  let fixture: ComponentFixture<GroupPuzzlePackageAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupPuzzlePackageAnswersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPuzzlePackageAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
