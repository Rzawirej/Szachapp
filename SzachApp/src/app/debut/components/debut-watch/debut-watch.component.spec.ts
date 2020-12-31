import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebutWatchComponent } from './debut-watch.component';

describe('DebutWatchComponent', () => {
  let component: DebutWatchComponent;
  let fixture: ComponentFixture<DebutWatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebutWatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebutWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
