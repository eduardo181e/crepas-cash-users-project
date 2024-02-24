import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WafflesMenuComponent } from './waffles-menu.component';

describe('WafflesMenuComponent', () => {
  let component: WafflesMenuComponent;
  let fixture: ComponentFixture<WafflesMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WafflesMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WafflesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
