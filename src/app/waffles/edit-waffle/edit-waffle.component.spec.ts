import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWaffleComponent } from './edit-waffle.component';

describe('EditWaffleComponent', () => {
  let component: EditWaffleComponent;
  let fixture: ComponentFixture<EditWaffleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWaffleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWaffleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
