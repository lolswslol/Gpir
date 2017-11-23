import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersFinancingComponent } from './customers-financing.component';

describe('CustomersFinancingComponent', () => {
  let component: CustomersFinancingComponent;
  let fixture: ComponentFixture<CustomersFinancingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersFinancingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersFinancingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
