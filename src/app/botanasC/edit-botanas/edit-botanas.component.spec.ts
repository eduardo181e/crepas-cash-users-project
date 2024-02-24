import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBotanasComponent } from './edit-botanas.component';

describe('EditBotanasComponent', () => {
  let component: EditBotanasComponent;
  let fixture: ComponentFixture<EditBotanasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBotanasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBotanasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
