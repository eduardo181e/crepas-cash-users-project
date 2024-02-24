import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBebidasComponent } from './menu-bebidas.component';

describe('MenuBebidasComponent', () => {
  let component: MenuBebidasComponent;
  let fixture: ComponentFixture<MenuBebidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuBebidasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuBebidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
