import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCrepasComponent } from './menu-crepas.component';

describe('MenuCrepasComponent', () => {
  let component: MenuCrepasComponent;
  let fixture: ComponentFixture<MenuCrepasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCrepasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCrepasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
