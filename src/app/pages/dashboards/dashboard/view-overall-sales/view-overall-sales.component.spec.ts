import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOverallSalesComponent } from './view-overall-sales.component';

describe('ViewOverallSalesComponent', () => {
  let component: ViewOverallSalesComponent;
  let fixture: ComponentFixture<ViewOverallSalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewOverallSalesComponent]
    });
    fixture = TestBed.createComponent(ViewOverallSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
