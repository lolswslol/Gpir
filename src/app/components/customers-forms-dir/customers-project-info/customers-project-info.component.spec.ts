import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersProjectInfoComponent } from './customers-project-info.component';

describe('CustomersProjectInfoComponent', () => {
  let component: CustomersProjectInfoComponent;
  let fixture: ComponentFixture<CustomersProjectInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersProjectInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersProjectInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
