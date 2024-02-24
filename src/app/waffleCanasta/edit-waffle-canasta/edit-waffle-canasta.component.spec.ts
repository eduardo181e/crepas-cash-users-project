import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWaffleCanastaComponent } from './edit-waffle-canasta.component';

describe('EditWaffleCanastaComponent', () => {
  let component: EditWaffleCanastaComponent;
  let fixture: ComponentFixture<EditWaffleCanastaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWaffleCanastaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWaffleCanastaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
