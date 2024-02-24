import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BebidasCalientesComponent } from './bebidas-calientes.component';

describe('BebidasCalientesComponent', () => {
  let component: BebidasCalientesComponent;
  let fixture: ComponentFixture<BebidasCalientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BebidasCalientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BebidasCalientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
