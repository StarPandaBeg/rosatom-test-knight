import { TestBed } from '@angular/core/testing';

import { GameBoardService, Point } from './game-board.service';

const loseStrategy = [
  [1, 2],
  [2, 0],
  [3, 2],
  [1, 1],
  [2, 3],
  [3, 1],
  [1, 0],
  [2, 2],
  [0, 3],
  [2, 4],
  [4, 3],
] as Point[];

describe('GameBoardService', () => {
  let service: GameBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial size at 5x5', () => {
    expect(service.size).toEqual([5, 5]);
  });

  it('should resize', () => {
    service.initialize({ width: 10, height: 10 });
    expect(service.size).toEqual([10, 10]);
  });

  it('should have knight at start position', () => {
    expect(service.knight()).toEqual([0, 0]);
  });

  it('should have two L turns on start', () => {
    service.initialize({ width: 10, height: 10 });
    const turns = service.possibleTurns();

    expect(turns.length).toBe(2);
    expect(turns).toContain(jasmine.arrayContaining([2, 1]));
    expect(turns).toContain(jasmine.arrayContaining([1, 2]));
  });

  it('should move', () => {
    service.initialize({ width: 10, height: 10 });
    expect(service.knight()).toEqual([0, 0]);
    service.move([2, 1]);
    expect(service.knight()).toEqual([2, 1]);
  });

  it('should move only on valid', () => {
    service.initialize({ width: 10, height: 10 });
    expect(service.knight()).toEqual([0, 0]);
    service.move([2, 1]);
    expect(service.knight()).toEqual([2, 1]);
    expect(() => service.move([5, 3])).toThrow();
    expect(service.knight()).toEqual([2, 1]);
  });

  it('should visit cells only once', () => {
    service.initialize({ width: 10, height: 10 });
    expect(service.knight()).toEqual([0, 0]);
    service.move([2, 1]);
    expect(service.knight()).toEqual([2, 1]);
    expect(() => service.move([0, 0])).toThrow();
  });

  it('should store visited cells', () => {
    service.initialize({ width: 10, height: 10 });
    service.move([2, 1]);
    expect(service.visited.length).toBe(1);
    expect(service.visited).toContain(jasmine.arrayContaining([0, 0]));
  });

  it('should have initial state on start', () => {
    service.initialize({ width: 5, height: 5 });
    expect(service.gameState()).toBe('initial');
  });

  it('should gameover when no turns left', () => {
    service.initialize({ width: 5, height: 5 });
    for (const step of loseStrategy) {
      service.move(step);
    }
    expect(service.gameState()).toBe('gameover');
  });
});
