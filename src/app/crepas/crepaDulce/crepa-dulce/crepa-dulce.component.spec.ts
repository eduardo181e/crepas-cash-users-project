import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrepaDulceComponent } from './crepa-dulce.component';

describe('CrepaDulceComponent', () => {
  let component: CrepaDulceComponent;
  let fixture: ComponentFixture<CrepaDulceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrepaDulceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrepaDulceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
