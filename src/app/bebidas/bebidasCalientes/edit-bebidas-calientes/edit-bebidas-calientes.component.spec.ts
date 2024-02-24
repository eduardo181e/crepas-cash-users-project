import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBebidasCalientesComponent } from './edit-bebidas-calientes.component';

describe('EditBebidasCalientesComponent', () => {
  let component: EditBebidasCalientesComponent;
  let fixture: ComponentFixture<EditBebidasCalientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBebidasCalientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBebidasCalientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
