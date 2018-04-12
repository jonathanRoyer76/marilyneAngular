import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilNounouComponent } from './profil-nounou.component';

describe('ProfilNounouComponent', () => {
  let component: ProfilNounouComponent;
  let fixture: ComponentFixture<ProfilNounouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilNounouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilNounouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
