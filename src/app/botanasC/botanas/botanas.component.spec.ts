import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotanasComponent } from './botanas.component';

describe('BotanasComponent', () => {
  let component: BotanasComponent;
  let fixture: ComponentFixture<BotanasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotanasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotanasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
