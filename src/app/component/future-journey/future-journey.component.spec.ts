import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureJourneyComponent } from './future-journey.component';

describe('FutureJourneyComponent', () => {
  let component: FutureJourneyComponent;
  let fixture: ComponentFixture<FutureJourneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FutureJourneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureJourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
