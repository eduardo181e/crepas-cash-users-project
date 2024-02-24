import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnsaladaIndividualComponent } from './ensalada-individual.component';

describe('EnsaladaIndividualComponent', () => {
  let component: EnsaladaIndividualComponent;
  let fixture: ComponentFixture<EnsaladaIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnsaladaIndividualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnsaladaIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
