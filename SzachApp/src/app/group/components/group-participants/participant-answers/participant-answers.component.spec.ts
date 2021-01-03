import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantAnswersComponent } from './participant-answers.component';

describe('ParticipantAnswersComponent', () => {
  let component: ParticipantAnswersComponent;
  let fixture: ComponentFixture<ParticipantAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantAnswersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
