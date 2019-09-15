import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeValidationDetailComponent } from './demande-validation-detail.component';

describe('DemandeValidationDetailComponent', () => {
  let component: DemandeValidationDetailComponent;
  let fixture: ComponentFixture<DemandeValidationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeValidationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeValidationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
