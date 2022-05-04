import { TestBed } from '@angular/core/testing';

import {GameplayService, Tile} from './gameplay.service';
import {Line} from "./model/pieces/line";

describe('GameplayService', () => {
  let service: GameplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start', () => {
    let spySpawnNewPiece = spyOn((<any>service), "spawnNewPiece").and.callFake(() => {});
    let spyDrawPiece = spyOn((<any>service), "drawPiece").and.callFake(() => {});
    let spyupdate = spyOn((<any>service), "update").and.callFake(() => {});

    service.start();
    expect((<any>service).gridSize).toEqual({height: 20, width: 10});
    expect((<any>service).gameSpeed).toEqual(300);
    expect((<any>service).isLose).toBeFalse();
    expect((<any>service).locked).toBeFalse();
    expect((<any>service).grid.length).toEqual(10 * 20);
    service.grid.forEach(tile => {
      expect(tile.solid).toBeFalse();
      expect(tile.color).toEqual("transparent");
    });
    expect((<any>service).isRun).toBeTrue();
    expect(spySpawnNewPiece);
    expect(spyDrawPiece);
    expect(spyupdate);
    expect((<any>service).spawnNewPiece).toHaveBeenCalled();
    expect((<any>service).drawPiece).toHaveBeenCalled();
    expect((<any>service).interval).toBeDefined();
    (<any>service).stop();
  });

  it('should stop', () => {
    let spySpawnNewPiece = spyOn((<any>service), "spawnNewPiece").and.callFake(() => {});
    let spyDrawPiece = spyOn((<any>service), "drawPiece").and.callFake(() => {});
    let spyupdate = spyOn((<any>service), "update").and.callFake(() => {});

    service.start();
    service.stop();
    expect((<any>service).interval).toEqual(undefined);
    expect((<any>service).isRun).toBeFalse();
  });

  it('should move left when game is run and not lock', () => {
    let spySpawnNewPiece = spyOn((<any>service), "spawnNewPiece").and.callFake(() => {});
    let spyStartInterval = spyOn((<any>service), "startInterval").and.callFake(() => {});
    let spyupdate = spyOn((<any>service), "update").and.callFake(() => {});

    const cellsCount = 10 * 20;
    let gridTest1: Array<Tile | undefined> = Array.apply(null, Array(cellsCount))
      .map(() => ({solid: false, color: "transparent"}));
    gridTest1[84] = {solid: false, color: "aqua"};
    gridTest1[85] = {solid: false, color: "aqua"};
    gridTest1[86] = {solid: false, color: "aqua"};
    gridTest1[87] = {solid: false, color: "aqua"};
    let gridTest2: Array<Tile | undefined> = Array.apply(null, Array(cellsCount))
      .map(() => ({solid: false, color: "transparent"}));
    gridTest2[83] = {solid: false, color: "aqua"};
    gridTest2[84] = {solid: false, color: "aqua"};
    gridTest2[85] = {solid: false, color: "aqua"};
    gridTest2[86] = {solid: false, color: "aqua"};
    (<any>service).currentPiece = new Line(4, 5, (<any>service).gridSize);
    service.start();
    expect((<any>service).grid).toEqual(gridTest1);
    service.moveLeft();
    expect((<any>service).grid).toEqual(gridTest2);
  });

  it('should not move left when game is run and lock', () => {
    let spySpawnNewPiece = spyOn((<any>service), "spawnNewPiece").and.callFake(() => {});
    let spyStartInterval = spyOn((<any>service), "startInterval").and.callFake(() => {});
    let spyupdate = spyOn((<any>service), "update").and.callFake(() => {});

    const cellsCount = 10 * 20;
    let gridTest1: Array<Tile | undefined> = Array.apply(null, Array(cellsCount))
      .map(() => ({solid: false, color: "transparent"}));
    gridTest1[84] = {solid: false, color: "aqua"};
    gridTest1[85] = {solid: false, color: "aqua"};
    gridTest1[86] = {solid: false, color: "aqua"};
    gridTest1[87] = {solid: false, color: "aqua"};
    (<any>service).currentPiece = new Line(4, 5, (<any>service).gridSize);
    service.start();
    (<any>service).locked = true;
    expect((<any>service).grid).toEqual(gridTest1);
    service.moveLeft();
    expect((<any>service).grid).toEqual(gridTest1);
  });

  it('should not move left when game is not run and not lock', () => {
    let spySpawnNewPiece = spyOn((<any>service), "spawnNewPiece").and.callFake(() => {});
    let spyStartInterval = spyOn((<any>service), "startInterval").and.callFake(() => {});
    let spyupdate = spyOn((<any>service), "update").and.callFake(() => {});

    const cellsCount = 10 * 20;
    let gridTest1: Array<Tile | undefined> = Array.apply(null, Array(cellsCount))
      .map(() => ({solid: false, color: "transparent"}));
    gridTest1[84] = {solid: false, color: "aqua"};
    gridTest1[85] = {solid: false, color: "aqua"};
    gridTest1[86] = {solid: false, color: "aqua"};
    gridTest1[87] = {solid: false, color: "aqua"};
    (<any>service).currentPiece = new Line(4, 5, (<any>service).gridSize);
    service.start();
    service.stop();
    expect((<any>service).grid).toEqual(gridTest1);
    service.moveLeft();
    expect((<any>service).grid).toEqual(gridTest1);
  });

  // MOVE RIGHT

  it('should move right when game is run and not lock', () => {
    let spySpawnNewPiece = spyOn((<any>service), "spawnNewPiece").and.callFake(() => {});
    let spyStartInterval = spyOn((<any>service), "startInterval").and.callFake(() => {});
    let spyupdate = spyOn((<any>service), "update").and.callFake(() => {});

    const cellsCount = 10 * 20;
    let gridTest1: Array<Tile | undefined> = Array.apply(null, Array(cellsCount))
      .map(() => ({solid: false, color: "transparent"}));
    gridTest1[84] = {solid: false, color: "aqua"};
    gridTest1[85] = {solid: false, color: "aqua"};
    gridTest1[86] = {solid: false, color: "aqua"};
    gridTest1[87] = {solid: false, color: "aqua"};
    let gridTest2: Array<Tile | undefined> = Array.apply(null, Array(cellsCount))
      .map(() => ({solid: false, color: "transparent"}));
    gridTest2[85] = {solid: false, color: "aqua"};
    gridTest2[86] = {solid: false, color: "aqua"};
    gridTest2[87] = {solid: false, color: "aqua"};
    gridTest2[88] = {solid: false, color: "aqua"};
    (<any>service).currentPiece = new Line(4, 5, (<any>service).gridSize);
    service.start();
    expect((<any>service).grid).toEqual(gridTest1);
    service.moveRight();
    expect((<any>service).grid).toEqual(gridTest2);
  });

  it('should not move right when game is run and lock', () => {
    let spySpawnNewPiece = spyOn((<any>service), "spawnNewPiece").and.callFake(() => {});
    let spyStartInterval = spyOn((<any>service), "startInterval").and.callFake(() => {});
    let spyupdate = spyOn((<any>service), "update").and.callFake(() => {});

    const cellsCount = 10 * 20;
    let gridTest1: Array<Tile | undefined> = Array.apply(null, Array(cellsCount))
      .map(() => ({solid: false, color: "transparent"}));
    gridTest1[84] = {solid: false, color: "aqua"};
    gridTest1[85] = {solid: false, color: "aqua"};
    gridTest1[86] = {solid: false, color: "aqua"};
    gridTest1[87] = {solid: false, color: "aqua"};
    (<any>service).currentPiece = new Line(4, 5, (<any>service).gridSize);
    service.start();
    (<any>service).locked = true;
    expect((<any>service).grid).toEqual(gridTest1);
    service.moveLeft();
    expect((<any>service).grid).toEqual(gridTest1);
  });

  it('should not move right when game is not run and not lock', () => {
    let spySpawnNewPiece = spyOn((<any>service), "spawnNewPiece").and.callFake(() => {});
    let spyStartInterval = spyOn((<any>service), "startInterval").and.callFake(() => {});
    let spyupdate = spyOn((<any>service), "update").and.callFake(() => {});

    const cellsCount = 10 * 20;
    let gridTest1: Array<Tile | undefined> = Array.apply(null, Array(cellsCount))
      .map(() => ({solid: false, color: "transparent"}));
    gridTest1[84] = {solid: false, color: "aqua"};
    gridTest1[85] = {solid: false, color: "aqua"};
    gridTest1[86] = {solid: false, color: "aqua"};
    gridTest1[87] = {solid: false, color: "aqua"};
    (<any>service).currentPiece = new Line(4, 5, (<any>service).gridSize);
    service.start();
    service.stop();
    expect((<any>service).grid).toEqual(gridTest1);
    service.moveLeft();
    expect((<any>service).grid).toEqual(gridTest1);
  });

  // ROTATE

  it('should rotate when game is run and not lock', () => {
    let spySpawnNewPiece = spyOn((<any>service), "spawnNewPiece").and.callFake(() => {});
    let spyStartInterval = spyOn((<any>service), "startInterval").and.callFake(() => {});
    let spyupdate = spyOn((<any>service), "update").and.callFake(() => {});

    const cellsCount = 10 * 20;
    let gridTest1: Array<Tile | undefined> = Array.apply(null, Array(cellsCount))
      .map(() => ({solid: false, color: "transparent"}));
    gridTest1[84] = {solid: false, color: "aqua"};
    gridTest1[85] = {solid: false, color: "aqua"};
    gridTest1[86] = {solid: false, color: "aqua"};
    gridTest1[87] = {solid: false, color: "aqua"};
    let gridTest2: Array<Tile | undefined> = Array.apply(null, Array(cellsCount))
      .map(() => ({solid: false, color: "transparent"}));
    gridTest2[54] = {solid: false, color: "aqua"};
    gridTest2[64] = {solid: false, color: "aqua"};
    gridTest2[74] = {solid: false, color: "aqua"};
    gridTest2[84] = {solid: false, color: "aqua"};
    (<any>service).currentPiece = new Line(4, 5, (<any>service).gridSize);
    service.start();
    expect((<any>service).grid).toEqual(gridTest1);
    service.rotate();
    expect((<any>service).grid).toEqual(gridTest2);
  });

  it('should not rotate when game is run and lock', () => {
    let spySpawnNewPiece = spyOn((<any>service), "spawnNewPiece").and.callFake(() => {});
    let spyStartInterval = spyOn((<any>service), "startInterval").and.callFake(() => {});
    let spyupdate = spyOn((<any>service), "update").and.callFake(() => {});

    const cellsCount = 10 * 20;
    let gridTest1: Array<Tile | undefined> = Array.apply(null, Array(cellsCount))
      .map(() => ({solid: false, color: "transparent"}));
    gridTest1[84] = {solid: false, color: "aqua"};
    gridTest1[85] = {solid: false, color: "aqua"};
    gridTest1[86] = {solid: false, color: "aqua"};
    gridTest1[87] = {solid: false, color: "aqua"};
    (<any>service).currentPiece = new Line(4, 5, (<any>service).gridSize);
    service.start();
    (<any>service).locked = true;
    expect((<any>service).grid).toEqual(gridTest1);
    service.rotate();
    expect((<any>service).grid).toEqual(gridTest1);
  });

  it('should not rotate when game is not run and not lock', () => {
    let spySpawnNewPiece = spyOn((<any>service), "spawnNewPiece").and.callFake(() => {});
    let spyStartInterval = spyOn((<any>service), "startInterval").and.callFake(() => {});
    let spyupdate = spyOn((<any>service), "update").and.callFake(() => {});

    const cellsCount = 10 * 20;
    let gridTest1: Array<Tile | undefined> = Array.apply(null, Array(cellsCount))
      .map(() => ({solid: false, color: "transparent"}));
    gridTest1[84] = {solid: false, color: "aqua"};
    gridTest1[85] = {solid: false, color: "aqua"};
    gridTest1[86] = {solid: false, color: "aqua"};
    gridTest1[87] = {solid: false, color: "aqua"};
    (<any>service).currentPiece = new Line(4, 5, (<any>service).gridSize);
    service.start();
    service.stop();
    expect((<any>service).grid).toEqual(gridTest1);
    service.rotate();
    expect((<any>service).grid).toEqual(gridTest1);
  });

  // CLEAR FULL LINE

  it("should not change grid when lines is not full", () => {
    let spySpawnNewPiece = spyOn((<any>service), "spawnNewPiece").and.callFake(() => {});
    let spyStartInterval = spyOn((<any>service), "startInterval").and.callFake(() => {});
    let spyDrawPiece = spyOn((<any>service), "drawPiece").and.callFake(() => {});
    let spyupdate = spyOn((<any>service), "update").and.callFake(() => {});

    const cellsCount = 10 * 20;
    let gridTest: Array<Tile | undefined> = Array.apply(null, Array(cellsCount))
      .map(() => ({solid: false, color: "transparent"}));
    gridTest[180] = {solid: true, color: "aqua"};
    gridTest[181] = {solid: true, color: "aqua"};
    gridTest[182] = {solid: true, color: "aqua"};
    gridTest[184] = {solid: true, color: "aqua"};
    gridTest[186] = {solid: true, color: "aqua"};
    gridTest[187] = {solid: true, color: "aqua"};
    gridTest[188] = {solid: true, color: "aqua"};
    gridTest[189] = {solid: true, color: "aqua"};
    gridTest[190] = {solid: true, color: "aqua"};
    gridTest[191] = {solid: true, color: "aqua"};
    gridTest[193] = {solid: true, color: "aqua"};
    gridTest[194] = {solid: true, color: "aqua"};
    gridTest[196] = {solid: true, color: "aqua"};
    gridTest[197] = {solid: true, color: "aqua"};
    gridTest[198] = {solid: true, color: "aqua"};
    gridTest[199] = {solid: true, color: "aqua"};

    service.start();
    (<any>service).grid = Object.assign([], gridTest);
    (<any>service).clearFullLines();

    expect((<any>service).grid).toEqual(gridTest);
  });

  it("should change grid when lines is full", () => {
    let spySpawnNewPiece = spyOn((<any>service), "spawnNewPiece").and.callFake(() => {});
    let spyStartInterval = spyOn((<any>service), "startInterval").and.callFake(() => {});
    let spyDrawPiece = spyOn((<any>service), "drawPiece").and.callFake(() => {});
    let spyupdate = spyOn((<any>service), "update").and.callFake(() => {});
    let spyClearLines = spyOn((<any>service).gameService, "clearLine").and.callFake((value: number) => {});

    const cellsCount = 10 * 20;
    let gridTest1: Array<Tile | undefined> = Array.apply(null, Array(cellsCount))
      .map(() => ({solid: false, color: "transparent"}));
    gridTest1[180] = {solid: true, color: "red"};
    gridTest1[181] = {solid: true, color: "red"};
    gridTest1[182] = {solid: true, color: "red"};
    gridTest1[183] = {solid: true, color: "red"};
    gridTest1[184] = {solid: true, color: "red"};
    gridTest1[185] = {solid: true, color: "red"};
    gridTest1[186] = {solid: true, color: "red"};
    gridTest1[187] = {solid: true, color: "red"};
    gridTest1[188] = {solid: true, color: "red"};
    gridTest1[189] = {solid: true, color: "red"};
    gridTest1[190] = {solid: true, color: "red"};
    gridTest1[191] = {solid: true, color: "red"};
    gridTest1[192] = {solid: true, color: "red"};
    gridTest1[193] = {solid: true, color: "red"};
    gridTest1[194] = {solid: true, color: "red"};
    gridTest1[195] = {solid: true, color: "red"};
    gridTest1[196] = {solid: true, color: "red"};
    gridTest1[197] = {solid: true, color: "red"};
    gridTest1[198] = {solid: true, color: "red"};
    gridTest1[199] = {solid: true, color: "red"};

    let gridTest2: Array<Tile | undefined> = Array.apply(null, Array(cellsCount))
      .map(() => ({solid: false, color: "transparent"}));
    service.start();
    (<any>service).grid = Object.assign([], gridTest1);
    (<any>service).clearFullLines();

    expect(spyClearLines);
    expect(spyClearLines).toHaveBeenCalledWith((<any>service).game, 1);
    expect((<any>service).grid).toEqual(gridTest2);
  });
});
