import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersProductionComponent } from './customers-production.component';

describe('CustomersProductionComponent', () => {
  let component: CustomersProductionComponent;
  let fixture: ComponentFixture<CustomersProductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersProductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
