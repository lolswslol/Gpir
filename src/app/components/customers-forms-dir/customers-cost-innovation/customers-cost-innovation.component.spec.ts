import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersCostInnovationComponent } from './customers-cost-innovation.component';

describe('CustomersCostInnovationComponent', () => {
  let component: CustomersCostInnovationComponent;
  let fixture: ComponentFixture<CustomersCostInnovationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersCostInnovationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersCostInnovationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
