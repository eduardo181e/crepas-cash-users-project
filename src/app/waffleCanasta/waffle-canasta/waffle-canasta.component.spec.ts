import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaffleCanastaComponent } from './waffle-canasta.component';

describe('WaffleCanastaComponent', () => {
  let component: WaffleCanastaComponent;
  let fixture: ComponentFixture<WaffleCanastaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaffleCanastaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaffleCanastaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
