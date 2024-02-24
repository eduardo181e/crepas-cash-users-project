import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCrepaSaladaComponent } from './edit-crepa-salada.component';

describe('EditCrepaSaladaComponent', () => {
  let component: EditCrepaSaladaComponent;
  let fixture: ComponentFixture<EditCrepaSaladaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCrepaSaladaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCrepaSaladaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
