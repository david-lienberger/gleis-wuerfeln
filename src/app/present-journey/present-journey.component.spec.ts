import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentJourneyComponent } from './present-journey.component';

describe('PresentJourneyComponent', () => {
  let component: PresentJourneyComponent;
  let fixture: ComponentFixture<PresentJourneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentJourneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentJourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
