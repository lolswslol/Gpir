import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersPlannedDateComponent } from './customers-planned-date.component';

describe('CustomersPlannedDateComponent', () => {
  let component: CustomersPlannedDateComponent;
  let fixture: ComponentFixture<CustomersPlannedDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersPlannedDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersPlannedDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
