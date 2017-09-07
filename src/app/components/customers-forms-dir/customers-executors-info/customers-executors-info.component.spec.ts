import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersExecutorsInfoComponent } from './customers-executors-info.component';

describe('CustomersExecutorsInfoComponent', () => {
  let component: CustomersExecutorsInfoComponent;
  let fixture: ComponentFixture<CustomersExecutorsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersExecutorsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersExecutorsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
