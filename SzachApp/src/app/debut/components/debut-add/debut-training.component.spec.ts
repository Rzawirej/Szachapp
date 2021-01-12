import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebutTrainingComponent } from './debut-training.component';

describe('DebutTrainingComponent', () => {
  let component: DebutTrainingComponent;
  let fixture: ComponentFixture<DebutTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebutTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebutTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
