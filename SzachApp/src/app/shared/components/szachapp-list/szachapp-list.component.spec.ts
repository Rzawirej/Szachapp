import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SzachappListComponent } from './szachapp-list.component';

describe('SzachappListComponent', () => {
  let component: SzachappListComponent;
  let fixture: ComponentFixture<SzachappListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SzachappListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SzachappListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
