import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersTermsComponent } from './customers-terms.component';

describe('CustomersTermsComponent', () => {
  let component: CustomersTermsComponent;
  let fixture: ComponentFixture<CustomersTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
