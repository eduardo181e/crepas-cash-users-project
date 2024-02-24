import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrepaSaladaComponent } from './crepa-salada.component';

describe('CrepaSaladaComponent', () => {
  let component: CrepaSaladaComponent;
  let fixture: ComponentFixture<CrepaSaladaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrepaSaladaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrepaSaladaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
