# Sprawozdanie: „Podstawy gier logicznych” - algorytm min-max na podstawie gry kółko i krzyżyk
## Autor: 
Kamil Klyta 209356
***
![Ikona projektu](./tic_tac_toe/public/favicon.ico)  
[tic-tac-toe.klyta.it](http://tic-tac-toe.klyta.it/)  

  
***  
  
# 1. Nawigacja
- [Sprawozdanie: „Podstawy gier logicznych” - algorytm min-max na podstawie gry kółko i krzyżyk](#Sprawozdanie-%E2%80%9EPodstawy-gier-logicznych---algorytm-min-max-na-podstawie-gry-k%C3%B3%C5%82ko-i-krzy%C5%BCyk)
  - [Autor:](#Autor)
- [1. Nawigacja](#1-Nawigacja)
- [2.	Wstęp](#2-Wst%C4%99p)
  - [2.1 Krótkie wprowadzenie (zastosowanie)](#21-Kr%C3%B3tkie-wprowadzenie-zastosowanie)
  - [2.2. Czym tak na prawdę jest algorytm min-max](#22-Czym-tak-na-prawd%C4%99-jest-algorytm-min-max)
  - [2.3. Algorytm a drzewo przeszukiwań](#23-Algorytm-a-drzewo-przeszukiwa%C5%84)
    - [2.3.1 Wstęp, czym się kierować](#231-Wst%C4%99p-czym-si%C4%99-kierowa%C4%87)
    - [2.3.2. Funckcja kosztu](#232-Funckcja-kosztu)
  - [2.4. Optymalizacja algorytmu](#24-Optymalizacja-algorytmu)
- [3.	Implementacja](#3-Implementacja)
  - [3.1. Wprowadzenie](#31-Wprowadzenie)
  - [3.2 Omówienie](#32-Om%C3%B3wienie)
    - [3.2.1 Przygotowana przeze mnie implementacja algorytmu w pełni:](#321-Przygotowana-przeze-mnie-implementacja-algorytmu-w-pe%C5%82ni)
    - [3.2.2. Krok po kroku](#322-Krok-po-kroku)
- [4. Gotowa aplikacja](#4-Gotowa-aplikacja)
- [5.	Bibliografia](#5-Bibliografia)

  
***  
  
# 2.	Wstęp
## 2.1 Krótkie wprowadzenie (zastosowanie)
Algorytm min-max (ang. Minimax, MM or saddle point) - jest to algorytm / zasada mówiąca nam o tym jak powinniśmy podejmować decyzje. Algorytm ten jest używany w wielu różnych dziedzinach nauk (nie tylko matematycznych). Znalazł szerokie zastosowanie w sztucznej inteligencji, teorii podejmowania decyzji, statystyce, ekonomi, grach logicznych, filozofi i wielu, wielu innych miejscach.
## 2.2. Czym tak na prawdę jest algorytm min-max
Algorytm swoje początki zawdzięcza właśnie teorii gier a dokładnie speficznej dziedzinie gier logicznych w której to gracze wykonują ruchy na zmianę. Głównym zadaniem algorytmu jest znalezienie najlepszego możliwego ruchu w kązdym momencie gry przy założeniu, iż gracz dąży do wygranej (**maksymalizacja** szansy na wygraną, **minimalizacja** szansy na przegraną). Przy grach z bardzo dużą liczbą możliwośći algorytm min-max czasem staje się algorytmem zbyt złożonym, wówczas należy poszukać lepszego, wydajniejszego rozwiązania o lepszej złożoności, często są to indywidualne rozwiązania dla poszczególnych problemów ([2.4](#24-Optymalizacja-algorytmu)).
## 2.3. Algorytm a drzewo przeszukiwań
### 2.3.1 Wstęp, czym się kierować
Jednym z lepszych sposobów na zobrazowanie działania algorytmu jest przedstawienie jego działania na podstawie grafu a dokładniej drzewa przeszukiwań. Zależnie od implementacji algorytmu i gry (problemu) do którego algorytm został zastosowany jest możliwość aby algorytm miał wiele ścieżek, przegrywających i wygrywających bądź nawet w przpydku niektórych gier (w tym poruszanej gry w kółko i krzyżyk) również ścieżek remisujących.  
Przy takim założeniu stosując ten algorytm powinniśmy przeanalizować i dokonać wyboru ścieżki / ścieżek ze:
- **zmaksymalizowaną** liczbą (zawierającą w sobie dużo) ścieżek prowadzących do wygranej
- **zminimalizowaną** liczbą ścieżek prowadzących do przegranej
- ewentualnie gdy wygrana nie jest możliwa natomiast możliwe jest zremisowanie to wybrać ścieżki które dają największą gwarancje remisu  
  
Rozważając założenia algorytmu, rozsądnym wydaje się wybór ścieżek w których:
- nie istnieje szansa na porażkę
- nie zawiera ścieżki `dead end` (ślepej uliczki) - ktora prowadzi do pewnej przegranej z której nie możemy się wycofać
- istnieje **zmaksymalizowana** szansa na przegraną przeciwnika (w niektórych grach przegrana przeciwnika nie gwarantuje naszej wygranej, lecz na przykład przez niespełnione warunki może przynieść nam remis, co czasem jest bezpieczniejszą opcją niż doprowadzić do naszej przegranej usiłując doprowadzić do wygranej)

### 2.3.2. Funckcja kosztu
Funkcja kosztu definiuje ruchy przeprowadzane w grze. Na podstawie przyjętych przez nas założeń wybiera najlepsze dla nas ścieżki i przypisuje im odpowiednie wagi. Jej poprawne zdefiniowanie jest kluczowym elementem algorytmu min-max.
## 2.4. Optymalizacja algorytmu
Istnieją różne metody optymalizacji drzewa przeszukiwań, jedną z nich jest zmniejszanie zbioru przeszukiwanych danych (obcinanie drzewa). Jedną z metod obcinania jest metoda `alpha-beta pruning`. Metoda ta zakłada ustalenie jak sama nazwa mówi wartości `α` i `β` które pełnią rolę pewnego rodzaju ogranicznika rozważanych danch. Stanowią one bowie odpowiednio najmniejszą i największą rozważaną wartość węzła nadaną przez funkcje kosztu ([2.3.2](#232-Funckcja-kosztu))
# 3.	Implementacja
## 3.1. Wprowadzenie
W celu przedstawienia działania algorythmu min-max w praktyce zaimplementowałem go do tytułowej gry w kółko i krzyżyk (ang. Tic-Tac-Toe). Zdecydowałem się na użycie technologi webowej a dokładnie języka [`TypeScript`](https://www.typescriptlang.org/) i frameworka [`React`](https://reactjs.org/).
## 3.2 Omówienie
Na samym początku postanowiłem stworzyć plansze i ogólny design strony który jednak nie będzie przeze mnie omawiany w tym sprawozdaniu, jako że chcę się głównie skupić na samym kodzie algorytmu min-max. 

### 3.2.1 Przygotowana przeze mnie implementacja algorytmu w pełni:
```ts
const getBestMove = ({
    maximizing = false,
    depth = 0,
    position = { column: -1, row: -1 },
    positionsWithCostsCallback,
    currentValues
  }: BestMoveConfig = {}): PositionWithCost => {
    const {
      MIN_MAX_DRAW_RESULT,
      MIN_MAX_RESULT_VALUE,
      MIN_MAX_DEPTH_INCREMENT_VALUE
    } = TicTacBoard;
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
    const typeOfPlayer: Player = maximizing ? Player.X : Player.O;
    const possiblePositions: Array<Position> = this.getPossiblePositions();
    const positionsWithCost: Array<PositionWithCost> = possiblePositions.map<
      PositionWithCost
    >(
      (position: Position): PositionWithCost => {
        const newBoard: TicTacBoard = this.put(position, typeOfPlayer);
        const { cost } = newBoard.getBestMove({
          maximizing: !maximizing,
          depth: depth + MIN_MAX_DEPTH_INCREMENT_VALUE,
          position
        });
        return { ...position, cost };
      }
    );

    const [minMaxElem] = positionsWithCost.sort(
      maximizing
        ? this.descPositonWithCostArraySort
        : this.ascPositonWithCostArraySort
    );
    const minMaxElemsPositions: Array<
      PositionWithCost
    > = positionsWithCost.filter(({ cost }) => cost === minMaxElem.cost);
    const selectedRandomPosition = this.getRandomItemFromArray(
      minMaxElemsPositions
    );
    if (typeof positionsWithCostsCallback === "function")
      positionsWithCostsCallback(
        positionsWithCost.map(({ column, row, cost }) => ({
          column,
          row,
          cost,
          typeOfPlayer,
          seleced:
            selectedRandomPosition.column === column &&
            selectedRandomPosition.row === row
        })),
        currentValues
      );
    return selectedRandomPosition;
  };
```
### 3.2.2. Krok po kroku
Na samym pocztku przyrzyjmy się deklaracji (argumentą) funkcji której zadaniem jest jak sama nazwa mówi zwrócić najlepszy ruch
```ts
const getBestMove = ({
    maximizing = false,
    depth = 0,
    position = { column: -1, row: -1 },
    positionsWithCostsCallback,
  }: BestMoveConfig = {}): PositionWithCost => {
```
funkcja przyjmuje dość sporą liczbę argumentów, jednak większość jest używana do odpowiedniego przedstawainia informacji w aplikacji webowej. Argumenty które z punktu widzenia algorytmu mają największe znaczenie to `maximizing`, `depth`, i `position`. Cała struktura danych jest zdefiniowana w następujący sposób:
```ts
export type BestMoveConfig = {
  depth?: number;
  maximizing?: boolean;
  position?: Position;
  positionsWithCostsCallback?: (
    positionsWithCost: Array<PositionInfo>,
    prevValues: TicTacBoardData | undefined
  ) => void;
};
```
Omówienie argumentów algorytmu:
- **`depth`** - Jest to numer oznaczający głębokość naszego rekurencyjnego przeszukiwania. Dla pierwszego uruchomienia naszej funkcji wartość głębokości powinna wynosić `0` ( - tyle również wynosi jej domyślna wartość). Wartość ta jest inkrementowana dla każdego kolejnego rekurencyjnego wywołania funkcji
- **`maximizing`** - Zmienna przyjmująca wartości logiczne `true` lub `false`. W zależności od przyjętej wartości algorytm będzie odpowiednio szukał wartości maksymalnej bądź minimalnej.
- **`position`** - Pozycja której wybór rozważamy (ma znaczenie dla rekurencyjnych wywołań funkcji)
- **`positionsWithCostsCallback`** - wywołanie wsteczne zawierające wszystkie rozważane pozycje wraz z ich kosztem jak i aktualne wartości planszy (zmienna pomocnicza do poprawnego rysowania UI)
  
Omówienie wartości zwracanej
- Algorytm zwraca pozycje wraz z kosztem `{ column: number, row: number, cost: number }`  

***

Następnie wykonywane jest sprawdzenie planszy w poszukiwaniu informacji czy gra została skończona po czym zostaje zwrócona odpowiednia wartość, jeśli podczas tego wywołania funkcji gra jest zakończona z funkcji zostanie zwrócony koszt (**zmaksymalizowany**/powiększony o 100 dla wygranej gracza `X` bądź **zminimalizowany**/zmniejszony dla wygranej gracza `O` dodatkowo odpowiednio dodana lub odjęta wartość głębokości (ma znaczenie w przypadku poszukiwania najszybszego rozwiązania gry). W przypadku remisu zwrócona zostanie wartość neutralna `0`).
```ts
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
```
  
***  
  
1. Następnie jeśli gra nie została zakończona określany jest typ gracza dla którego szukamy możliwej ścieżki ruchu (jeśli szukamy wartości maksymalizowanych to szukamy gracza `X` w przeciwnym przypadku `O`).
2. Po ustaleniu gracza, wyszukujemy wszystkie możliwe (wolne) pozycje na planszy
3. Dla każdej pobranej pozycji obliczamy koszt tej ścieżki rozpoczynając rekurencje.
4. Podczas wywołania rekurencyjnego algorytmu negujemy wartość zmiennej `maximizing` gdyż w kolejnym ruchu wyszukujemy wartości najlepszej ścieżki dla przeciwnika
5. Zwiększamy wartość zmiennej `depth` o wcześniej przyjętą wartość (w moim przypadku jest to `1`)
6. Przekazujemy aktualnie wybraną pozycje
7. Otrzymujemy obiekt z kosztem i pozycją
8. Zwracamy otrzymaną wartość pozycji z kosztem

```ts
const typeOfPlayer: Player = maximizing ? Player.X : Player.O; // 1.
    const possiblePositions: Array<Position> = this.getPossiblePositions(); // 2. 
    const positionsWithCost: Array<PositionWithCost> = possiblePositions.map< // 3.
      PositionWithCost
    >(
      (position: Position): PositionWithCost => { // 7.
        const newBoard: TicTacBoard = this.put(position, typeOfPlayer);
        const { cost } = newBoard.getBestMove({
          maximizing: !maximizing, // 4.
          depth: depth + MIN_MAX_DEPTH_INCREMENT_VALUE, // 5.
          position // 6.
        });
        return { ...position, cost }; // 8.
      }
    );
```
  
***
  
1. Z wcześniej otrzymanych kosztów wybieramy największy bądź najmniejszy w zależności od przyjętej wartości zmiennej `maximizing`
2. Z otrzymanych wyników wybieramy tylko te **maksymalne** bądź **minimalne**
3. Wybieramy losowy element (pozycję) o **minimalnej** bądź **maksymalnej** wartości kosztu
4. Zwracamy wybraną wartość
```ts
const [minMaxElem] = positionsWithCost.sort(
      maximizing
        ? this.descPositonWithCostArraySort
        : this.ascPositonWithCostArraySort
    ); // 1.
    const minMaxElemsPositions: Array<
      PositionWithCost
    > = positionsWithCost.filter(({ cost }) => cost === minMaxElem.cost); // 2.
    const selectedRandomPosition = this.getRandomItemFromArray(
      minMaxElemsPositions
    ); // 3.

    // ***
    // callback w celu zaktualizowania widoku aplikacji
    // ***

    return selectedRandomPosition; // 4.
```
# 4. Gotowa aplikacja
Finalna wersja aplikacji jest dostępna pod tym adresem [tic-tac-toe.klyta.it](http://tic-tac-toe.klyta.it/)
Kod aplikacji jest dostępny w repozytorium: [link do kodów aplikacji](https://github.com/gonuit/gry-logiczne-tic-tac-toe-min-max)

# 5.	Bibliografia
- [Wikipedia.org - Minimax](https://en.wikipedia.org/wiki/Minimax)
- [Medium.com - Tic-Tac-Toe with Javascript ES2015: AI Player with Minimax Algorithm](https://medium.com/@alialaa/tic-tac-toe-with-javascript-es2015-ai-player-with-minimax-algorithm-59f069f46efa)
- [Youtube.com - Minimax Tic Tac Toe Example](https://www.youtube.com/watch?v=0SxPMl5AuiM)
- [Youtube.com - Algorithms Explained – minimax and alpha-beta pruning](https://youtu.be/l-hh51ncgDI)

