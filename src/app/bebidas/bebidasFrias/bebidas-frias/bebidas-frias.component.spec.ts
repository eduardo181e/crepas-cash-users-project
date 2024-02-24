import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BebidasFriasComponent } from './bebidas-frias.component';

describe('BebidasFriasComponent', () => {
  let component: BebidasFriasComponent;
  let fixture: ComponentFixture<BebidasFriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BebidasFriasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BebidasFriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
