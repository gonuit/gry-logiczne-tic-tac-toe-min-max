

export enum Player {
  X,
  O,
}

export enum FieldType {
  X,
  O,
  NONE,
}

export enum WinnerType {
  X = "X",
  O = "O",
  REMIS = "REMIS",
  NONE = "NONE"
}

export type TicTacBoardData = [
  [FieldType, FieldType, FieldType],
  [FieldType, FieldType, FieldType],
  [FieldType, FieldType, FieldType]
];

export type Position = {
  row: number;
  column: number;
};

export type BestMoveConfig = {
  depth?: number
  maximizing: boolean
  board?: TicTacBoard
}

export class TicTacBoard {
  private static BOARD_SIZE = 3;
  private static MIN_MAX_RESULT_VALUE = 10
  private static MIN_MAX_DRAW_RESULT = 0

  constructor(private values: TicTacBoardData) {}

  public isEnd = (): WinnerType => {
    const centerValue = this.values[1][1];
    if (centerValue === null) return WinnerType.NONE;
    if (
      (this.values[0][0] === centerValue &&
        this.values[2][2] === centerValue) ||
      (this.values[0][2] === centerValue && this.values[2][0] === centerValue)
    ) {
      return centerValue === FieldType.X ? WinnerType.X : WinnerType.O;
    }

    for (let index = 0; index < TicTacBoard.BOARD_SIZE; index++) {
      if (
        this.values[index].every(
          elem => typeof elem === "boolean" && elem === this.values[index][0]
        )
      ) {
        return this.values[index][0] === FieldType.X ? WinnerType.X : WinnerType.O;
      }
      const firstValue = this.values[0][index];
      if (firstValue === null) continue;
      if (
        this.values[0][index] === firstValue &&
        this.values[1][index] === firstValue &&
        this.values[2][index] === firstValue
      ) {
        return firstValue === FieldType.X ? WinnerType.X : WinnerType.O;
      }
    }
    return WinnerType.NONE;
  }
  put = (position: Position, player: Player): TicTacBoard => {
    const values = JSON.parse(JSON.stringify(this.values)) // prevent shallow copy
    values[position.row][position.column] = Player.O ? false : true
    return new TicTacBoard(values[position.row][position.column])
  };

  getPossiblePositions = (): Array<Position> => {
    const possiblePositions: Array<Position> = []
      const { BOARD_SIZE } = TicTacBoard 
      for(let row = 0; row < BOARD_SIZE; row++) {
        for(let column = 0; column < BOARD_SIZE; column++) {
          if(this.values[row][column] === FieldType.NONE) possiblePositions.push({ row, column })
        }
      }
      return possiblePositions;
  }


  getBestMove = ({ board = this, maximizing = true, depth = 0}: BestMoveConfig): number | undefined => {

    // Jeśli gra zakończona zwróć wartość
    const isEnd = board.isEnd()
		if(isEnd !== WinnerType.NONE) {
      const { MIN_MAX_DRAW_RESULT, MIN_MAX_RESULT_VALUE } = TicTacBoard 
      switch(isEnd) {
        case WinnerType.X: return MIN_MAX_RESULT_VALUE - depth;
        case WinnerType.O: return -MIN_MAX_RESULT_VALUE + depth;
        case WinnerType.REMIS: return MIN_MAX_DRAW_RESULT
      }
    }
    if(maximizing) this.maximize()
  }

  private maximize = () => {

  }
}
