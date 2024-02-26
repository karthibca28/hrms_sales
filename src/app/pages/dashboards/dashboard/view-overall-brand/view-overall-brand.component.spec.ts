import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOverallBrandComponent } from './view-overall-brand.component';

describe('ViewOverallBrandComponent', () => {
  let component: ViewOverallBrandComponent;
  let fixture: ComponentFixture<ViewOverallBrandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewOverallBrandComponent]
    });
    fixture = TestBed.createComponent(ViewOverallBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
