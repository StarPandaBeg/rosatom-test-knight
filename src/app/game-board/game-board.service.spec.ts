import { TestBed } from '@angular/core/testing';

import { GameBoardService } from './game-board.service';

describe('GameBoardService', () => {
  let service: GameBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have knight at start', () => {
    expect(service.knight).toBe([0, 0]);
  });

  it('should resize', () => {
    service.initialize({ width: 10, height: 10 });
    expect(service.size).toBe([10, 10]);
  });
});
