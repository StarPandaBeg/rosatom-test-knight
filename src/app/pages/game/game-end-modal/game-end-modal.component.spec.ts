import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameEndModalComponent } from './game-end-modal.component';

describe('GameEndModalComponent', () => {
  let component: GameEndModalComponent;
  let fixture: ComponentFixture<GameEndModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameEndModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameEndModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
