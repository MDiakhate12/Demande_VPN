import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeFormDetailComponent } from './demande-form-detail.component';

describe('DemandeFormDetailComponent', () => {
  let component: DemandeFormDetailComponent;
  let fixture: ComponentFixture<DemandeFormDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeFormDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeFormDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
