import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachNewsComponent } from './coach-news.component';

describe('CoachNewsComponent', () => {
  let component: CoachNewsComponent;
  let fixture: ComponentFixture<CoachNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
