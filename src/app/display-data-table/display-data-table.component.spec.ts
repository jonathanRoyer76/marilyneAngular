import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDataTableComponent } from './display-data-table.component';

describe('DisplayDataTableComponent', () => {
  let component: DisplayDataTableComponent;
  let fixture: ComponentFixture<DisplayDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
