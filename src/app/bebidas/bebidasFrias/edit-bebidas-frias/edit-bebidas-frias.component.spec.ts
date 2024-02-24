import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBebidasFriasComponent } from './edit-bebidas-frias.component';

describe('EditBebidasFriasComponent', () => {
  let component: EditBebidasFriasComponent;
  let fixture: ComponentFixture<EditBebidasFriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBebidasFriasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBebidasFriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
