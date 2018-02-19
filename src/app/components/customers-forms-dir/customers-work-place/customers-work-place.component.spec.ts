import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersWorkPlaceComponent } from './customers-work-place.component';

describe('CustomersWorkPlaceComponent', () => {
  let component: CustomersWorkPlaceComponent;
  let fixture: ComponentFixture<CustomersWorkPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersWorkPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersWorkPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
