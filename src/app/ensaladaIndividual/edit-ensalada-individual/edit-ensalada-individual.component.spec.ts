import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEnsaladaIndividualComponent } from './edit-ensalada-individual.component';

describe('EditEnsaladaIndividualComponent', () => {
  let component: EditEnsaladaIndividualComponent;
  let fixture: ComponentFixture<EditEnsaladaIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEnsaladaIndividualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEnsaladaIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
