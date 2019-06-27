export type TicTacBoardData = [
  [boolean | null, boolean | null, boolean | null],
  [boolean | null, boolean | null, boolean | null],
  [boolean | null, boolean | null, boolean | null]
];

export enum WinnerType {
  X = "X",
  O = "O",
  NONE = "NONE"
}

export class TicTacBoard {
  private static BOARD_SIZE = 3;

  public static isEnd(values: TicTacBoardData): WinnerType {
      const centerValue = values[1][1];
      if(centerValue === null) return WinnerType.NONE 
      if (
        (values[0][0] === centerValue &&
        values[2][2] === centerValue) ||
        (values[0][2] === centerValue &&
          values[2][0] === centerValue)
      ) {
        return centerValue === true ? WinnerType.X : WinnerType.O;

      }

    for (let index = 0; index < TicTacBoard.BOARD_SIZE; index++) {
      if (
        values[index].every(
          elem => typeof elem === "boolean" && elem === values[index][0]
        )
      ) {
        return values[index][0] === true ? WinnerType.X : WinnerType.O;
      }
      const firstValue = values[0][index];
      if(firstValue === null) continue
      if (
        values[0][index] === firstValue &&
        values[1][index] === firstValue &&
        values[2][index] === firstValue
      ) {
        return firstValue === true ? WinnerType.X : WinnerType.O;
      }
    }
    return WinnerType.NONE;
  }
}
