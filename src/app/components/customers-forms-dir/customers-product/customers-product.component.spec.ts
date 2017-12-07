import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersProductComponent } from './customers-product.component';

describe('CustomersProductComponent', () => {
  let component: CustomersProductComponent;
  let fixture: ComponentFixture<CustomersProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
