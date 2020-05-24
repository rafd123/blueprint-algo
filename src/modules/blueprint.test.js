import { CellValueEnum, paintFloor } from "./blueprint";

test("Split floor plan", () => {
  expect(
    paintFloor({
      startCellRowIndex: 0,
      startCellColumnIndex: 0,
      // prettier-ignore
      blueprint:
      [[CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.WALL, CellValueEnum.BARE_FLOOR ],
       [CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.WALL, CellValueEnum.BARE_FLOOR ],
       [CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.WALL, CellValueEnum.BARE_FLOOR ],
       [CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.WALL, CellValueEnum.BARE_FLOOR ]]
    })
  ).toEqual(
    // prettier-ignore
    [[CellValueEnum.PAINTED_FLOOR, CellValueEnum.PAINTED_FLOOR, CellValueEnum.WALL, CellValueEnum.BARE_FLOOR ],
     [CellValueEnum.PAINTED_FLOOR, CellValueEnum.PAINTED_FLOOR, CellValueEnum.WALL, CellValueEnum.BARE_FLOOR ],
     [CellValueEnum.PAINTED_FLOOR, CellValueEnum.PAINTED_FLOOR, CellValueEnum.WALL, CellValueEnum.BARE_FLOOR ],
     [CellValueEnum.PAINTED_FLOOR, CellValueEnum.PAINTED_FLOOR, CellValueEnum.WALL, CellValueEnum.BARE_FLOOR ]]
  );
});

test("Opening in wall", () => {
  expect(
    paintFloor({
      startCellRowIndex: 0,
      startCellColumnIndex: 0,
      // prettier-ignore
      blueprint:
      [[CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.WALL,       CellValueEnum.BARE_FLOOR ],
       [CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR ],
       [CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.WALL,       CellValueEnum.BARE_FLOOR ],
       [CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.WALL,       CellValueEnum.BARE_FLOOR ]]
    })
  ).toEqual(
    // prettier-ignore
    [[CellValueEnum.PAINTED_FLOOR, CellValueEnum.PAINTED_FLOOR, CellValueEnum.WALL,          CellValueEnum.PAINTED_FLOOR ],
     [CellValueEnum.PAINTED_FLOOR, CellValueEnum.PAINTED_FLOOR, CellValueEnum.PAINTED_FLOOR, CellValueEnum.PAINTED_FLOOR ],
     [CellValueEnum.PAINTED_FLOOR, CellValueEnum.PAINTED_FLOOR, CellValueEnum.WALL,          CellValueEnum.PAINTED_FLOOR ],
     [CellValueEnum.PAINTED_FLOOR, CellValueEnum.PAINTED_FLOOR, CellValueEnum.WALL,          CellValueEnum.PAINTED_FLOOR ]]
  );
});

test('Outside square "elevator shaft"', () => {
  expect(
    paintFloor({
      startCellRowIndex: 4,
      startCellColumnIndex: 2,
      // prettier-ignore
      blueprint:
      [[CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR ],
       [CellValueEnum.BARE_FLOOR, CellValueEnum.WALL,       CellValueEnum.WALL,       CellValueEnum.WALL,       CellValueEnum.BARE_FLOOR ],
       [CellValueEnum.BARE_FLOOR, CellValueEnum.WALL,       CellValueEnum.BARE_FLOOR, CellValueEnum.WALL,       CellValueEnum.BARE_FLOOR ],
       [CellValueEnum.BARE_FLOOR, CellValueEnum.WALL,       CellValueEnum.WALL,       CellValueEnum.WALL,       CellValueEnum.BARE_FLOOR ],
       [CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR ]]
    })
  ).toEqual(
    // prettier-ignore
    [[CellValueEnum.PAINTED_FLOOR, CellValueEnum.PAINTED_FLOOR, CellValueEnum.PAINTED_FLOOR, CellValueEnum.PAINTED_FLOOR, CellValueEnum.PAINTED_FLOOR ],
     [CellValueEnum.PAINTED_FLOOR, CellValueEnum.WALL,          CellValueEnum.WALL,          CellValueEnum.WALL,          CellValueEnum.PAINTED_FLOOR ],
     [CellValueEnum.PAINTED_FLOOR, CellValueEnum.WALL,          CellValueEnum.BARE_FLOOR,    CellValueEnum.WALL,          CellValueEnum.PAINTED_FLOOR ],
     [CellValueEnum.PAINTED_FLOOR, CellValueEnum.WALL,          CellValueEnum.WALL,          CellValueEnum.WALL,          CellValueEnum.PAINTED_FLOOR ],
     [CellValueEnum.PAINTED_FLOOR, CellValueEnum.PAINTED_FLOOR, CellValueEnum.PAINTED_FLOOR, CellValueEnum.PAINTED_FLOOR, CellValueEnum.PAINTED_FLOOR ]]
  );
});

test('Inside square "elevator shaft"', () => {
  expect(
    paintFloor({
      startCellRowIndex: 2,
      startCellColumnIndex: 2,
      // prettier-ignore
      blueprint:
      [[CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR ],
       [CellValueEnum.BARE_FLOOR, CellValueEnum.WALL,       CellValueEnum.WALL,       CellValueEnum.WALL,       CellValueEnum.BARE_FLOOR ],
       [CellValueEnum.BARE_FLOOR, CellValueEnum.WALL,       CellValueEnum.BARE_FLOOR, CellValueEnum.WALL,       CellValueEnum.BARE_FLOOR ],
       [CellValueEnum.BARE_FLOOR, CellValueEnum.WALL,       CellValueEnum.WALL,       CellValueEnum.WALL,       CellValueEnum.BARE_FLOOR ],
       [CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR ]]
    })
  ).toEqual(
    // prettier-ignore
    [[CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR,     CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR ],
     [CellValueEnum.BARE_FLOOR, CellValueEnum.WALL,       CellValueEnum.WALL,           CellValueEnum.WALL,       CellValueEnum.BARE_FLOOR ],
     [CellValueEnum.BARE_FLOOR, CellValueEnum.WALL,       CellValueEnum.PAINTED_FLOOR,  CellValueEnum.WALL,       CellValueEnum.BARE_FLOOR ],
     [CellValueEnum.BARE_FLOOR, CellValueEnum.WALL,       CellValueEnum.WALL,           CellValueEnum.WALL,       CellValueEnum.BARE_FLOOR ],
     [CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR,     CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR ]]
  );
});

test('Inside diamond-shaped "elevator shaft"', () => {
  expect(
    paintFloor({
      startCellRowIndex: 2,
      startCellColumnIndex: 2,
      // prettier-ignore
      blueprint:
      [[CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR ],
       [CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.WALL,       CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR ],
       [CellValueEnum.BARE_FLOOR, CellValueEnum.WALL,       CellValueEnum.BARE_FLOOR, CellValueEnum.WALL,       CellValueEnum.BARE_FLOOR ],
       [CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.WALL,       CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR ],
       [CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR ]]
    })
  ).toEqual(
    // prettier-ignore
    [[CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR,     CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR ],
    [CellValueEnum.BARE_FLOOR,  CellValueEnum.BARE_FLOOR, CellValueEnum.WALL,           CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR ],
     [CellValueEnum.BARE_FLOOR, CellValueEnum.WALL,       CellValueEnum.PAINTED_FLOOR,  CellValueEnum.WALL,       CellValueEnum.BARE_FLOOR ],
     [CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.WALL,           CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR ],
     [CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR,     CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR ]]
  );
});

test("Start cell outside of blueprint 1", () => {
  expect(() =>
    paintFloor({
      startCellRowIndex: 100,
      startCellColumnIndex: 100,
      // prettier-ignore
      blueprint:
      [[CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.WALL, CellValueEnum.BARE_FLOOR ],
       [CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.WALL, CellValueEnum.BARE_FLOOR ],
       [CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.WALL, CellValueEnum.BARE_FLOOR ],
       [CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.WALL, CellValueEnum.BARE_FLOOR ]]
    })
  ).toThrow(RangeError);
});

test("Start cell outside of blueprint 2", () => {
  expect(() =>
    paintFloor({
      startCellRowIndex: -100,
      startCellColumnIndex: 100,
      // prettier-ignore
      blueprint:
      [[CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.WALL, CellValueEnum.BARE_FLOOR ],
       [CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.WALL, CellValueEnum.BARE_FLOOR ],
       [CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.WALL, CellValueEnum.BARE_FLOOR ],
       [CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.WALL, CellValueEnum.BARE_FLOOR ]]
    })
  ).toThrow(RangeError);
});

test("Start cell outside of blueprint 3", () => {
  expect(() =>
    paintFloor({
      startCellRowIndex: -100,
      startCellColumnIndex: -100,
      // prettier-ignore
      blueprint:
      [[CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.WALL, CellValueEnum.BARE_FLOOR ],
       [CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.WALL, CellValueEnum.BARE_FLOOR ],
       [CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.WALL, CellValueEnum.BARE_FLOOR ],
       [CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.WALL, CellValueEnum.BARE_FLOOR ]]
    })
  ).toThrow(RangeError);
});

test("Start cell outside of blueprint 4", () => {
  expect(() =>
    paintFloor({
      startCellRowIndex: 100,
      startCellColumnIndex: -100,
      // prettier-ignore
      blueprint:
      [[CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.WALL, CellValueEnum.BARE_FLOOR ],
       [CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.WALL, CellValueEnum.BARE_FLOOR ],
       [CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.WALL, CellValueEnum.BARE_FLOOR ],
       [CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.WALL, CellValueEnum.BARE_FLOOR ]]
    })
  ).toThrow(RangeError);
});

test("Start cell is wall", () => {
  expect(() =>
    paintFloor({
      startCellRowIndex: 2,
      startCellColumnIndex: 2,
      // prettier-ignore
      blueprint:
      [[CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.WALL, CellValueEnum.BARE_FLOOR ],
       [CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.WALL, CellValueEnum.BARE_FLOOR ],
       [CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.WALL, CellValueEnum.BARE_FLOOR ],
       [CellValueEnum.BARE_FLOOR, CellValueEnum.BARE_FLOOR, CellValueEnum.WALL, CellValueEnum.BARE_FLOOR ]]
    })
  ).toThrow(RangeError);
});
