export enum Player {
  X,
  O
}

export enum FieldType {
  X,
  O,
  EMPTY
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

export interface PositionWithCost extends Position {
  cost: number;
}

export type BestMoveConfig = {
  depth?: number;
  maximizing?: boolean;
  board?: TicTacBoard;
  position?: Position;
};

export class TicTacBoard {
  private static BOARD_SIZE = 3;
  private static MIN_MAX_RESULT_VALUE = 100;
  private static MIN_MAX_DRAW_RESULT = 0;
  private static MIN_MAX_DEPTH_INCREMENT_VALUE = 1;

  constructor(private values: TicTacBoardData) {}

  private isEmptyField = () =>
    this.values.flat().some(elem => elem === FieldType.EMPTY);

  public isEnd = (): WinnerType => {
    const centerValue = this.values[1][1];
    if (centerValue !== FieldType.EMPTY) {
      if (
        (this.values[0][0] === centerValue &&
          this.values[2][2] === centerValue) ||
        (this.values[0][2] === centerValue && this.values[2][0] === centerValue)
      ) {
        return centerValue === FieldType.X ? WinnerType.X : WinnerType.O;
      }
    }

    for (let index = 0; index < TicTacBoard.BOARD_SIZE; index++) {
      if (
        this.values[index].every(
          elem => elem !== FieldType.EMPTY && elem === this.values[index][0]
        )
      ) {
        return this.values[index][0] === FieldType.X
          ? WinnerType.X
          : WinnerType.O;
      }
      const firstValue = this.values[0][index];
      if (firstValue === FieldType.EMPTY) continue;
      if (
        this.values[0][index] === firstValue &&
        this.values[1][index] === firstValue &&
        this.values[2][index] === firstValue
      ) {
        return firstValue === FieldType.X ? WinnerType.X : WinnerType.O;
      }
    }
    return this.isEmptyField() ? WinnerType.NONE : WinnerType.REMIS;
  };

  put = (position: Position, player: Player): TicTacBoard => {
    const values: TicTacBoardData = JSON.parse(JSON.stringify(this.values)); // prevent shallow copy
    values[position.row][position.column] =
      player === Player.O ? FieldType.O : FieldType.X;
    return new TicTacBoard(values);
  };

  getPossiblePositions = (): Array<Position> => {
    const possiblePositions: Array<Position> = [];
    const { BOARD_SIZE } = TicTacBoard;
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let column = 0; column < BOARD_SIZE; column++) {
        if (this.values[row][column] === FieldType.EMPTY)
          possiblePositions.push({ row, column });
      }
    }
    return possiblePositions;
  };

  getBestMove = ({
    maximizing = false,
    depth = 0,
    position = { column: -1, row: -1 }
  }: BestMoveConfig = {}): PositionWithCost => {
    const {
      MIN_MAX_DRAW_RESULT,
      MIN_MAX_RESULT_VALUE,
      MIN_MAX_DEPTH_INCREMENT_VALUE
    } = TicTacBoard;
    // Jeśli gra zakończona zwróć wartość
    const isEnd = this.isEnd();
    if (isEnd !== WinnerType.NONE) {
      switch (isEnd) {
        case WinnerType.X:
          return { ...position, cost: MIN_MAX_RESULT_VALUE - depth };
        case WinnerType.O:
          return { ...position, cost: -MIN_MAX_RESULT_VALUE + depth };
        case WinnerType.REMIS:
          return { ...position, cost: MIN_MAX_DRAW_RESULT };
      }
    }
    // Pobierz możliwe pozycje
    const possiblePositions: Array<Position> = this.getPossiblePositions();
    const positionsWithCost: Array<PositionWithCost> = possiblePositions.map<
      PositionWithCost
    >(
      (position: Position): PositionWithCost => {
        const newBoard: TicTacBoard = this.put(
          position,
          maximizing ? Player.X : Player.O
        );
        const elem = newBoard.getBestMove({
          maximizing: !maximizing,
          depth: depth + MIN_MAX_DEPTH_INCREMENT_VALUE,
          position
        });
        const { cost } = elem;
        return { ...position, cost };
      }
    );
    // Sortuj rosnąco/malejaco na podstawie kosztu i pobierz najwiekszy/najmniejszy koszt
    const [minMaxElem] = positionsWithCost.sort(
      maximizing
        ? this.descPositonWithCostArraySort
        : this.ascPositonWithCostArraySort
    );
    // pobierz tablicę najwiekszych/najmniejszych elementow
    const minMaxElemsPositions: Array<
      PositionWithCost
    > = positionsWithCost.filter(({ cost }) => cost === minMaxElem.cost);
    return this.getRandomItemFromArray(minMaxElemsPositions);
  };

  private getRandomItemFromArray = <T>(items: Array<T>): T =>
    items[Math.floor(Math.random() * items.length)];

  private descPositonWithCostArraySort = (
    { cost: costA }: PositionWithCost,
    { cost: costB }: PositionWithCost
  ): number => costB - costA;

  private ascPositonWithCostArraySort = (
    { cost: costA }: PositionWithCost,
    { cost: costB }: PositionWithCost
  ): number => costA - costB;
}
