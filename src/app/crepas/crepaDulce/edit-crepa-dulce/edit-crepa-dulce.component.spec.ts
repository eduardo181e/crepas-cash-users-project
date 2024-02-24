import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCrepaDulceComponent } from './edit-crepa-dulce.component';

describe('EditCrepaDulceComponent', () => {
  let component: EditCrepaDulceComponent;
  let fixture: ComponentFixture<EditCrepaDulceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCrepaDulceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCrepaDulceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
