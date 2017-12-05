import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersCountryYearsComponent } from './customers-country-years.component';

describe('CustomersCountryYearsComponent', () => {
  let component: CustomersCountryYearsComponent;
  let fixture: ComponentFixture<CustomersCountryYearsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersCountryYearsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersCountryYearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
