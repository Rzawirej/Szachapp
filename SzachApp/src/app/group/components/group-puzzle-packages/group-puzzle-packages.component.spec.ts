import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPuzzlePackagesComponent } from './group-puzzle-packages.component';

describe('GroupPuzzlePackagesComponent', () => {
  let component: GroupPuzzlePackagesComponent;
  let fixture: ComponentFixture<GroupPuzzlePackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupPuzzlePackagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPuzzlePackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
