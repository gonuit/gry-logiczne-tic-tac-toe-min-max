# Sprawozdanie: „Podstawy gier logicznych” - algorytm min-max na podstawie gry kółko i krzyżyk
## Autor: 
Kamil Klyta 209356


- [Sprawozdanie: „Podstawy gier logicznych” - algorytm min-max na podstawie gry kółko i krzyżyk](#Sprawozdanie-%E2%80%9EPodstawy-gier-logicznych---algorytm-min-max-na-podstawie-gry-k%C3%B3%C5%82ko-i-krzy%C5%BCyk)
  - [Autor:](#Autor)
- [2.	Wstęp](#2-Wst%C4%99p)
  - [2.1 Krótkie wprowadzenie (zastosowanie)](#21-Kr%C3%B3tkie-wprowadzenie-zastosowanie)
  - [2.2. Czym tak na prawdę jest algorytm min-max](#22-Czym-tak-na-prawd%C4%99-jest-algorytm-min-max)
  - [2.3. Algorytm a drzewo przeszukiwań](#23-Algorytm-a-drzewo-przeszukiwa%C5%84)
    - [2.3.1 Wstęp, czym się kierować](#231-Wst%C4%99p-czym-si%C4%99-kierowa%C4%87)
    - [2.3.2. Funckcja kosztu](#232-Funckcja-kosztu)
  - [2.4. Optymalizacja algorytmu](#24-Optymalizacja-algorytmu)
- [3.	Implementacja](#3-Implementacja)
- [4.	Źródła](#4-%C5%B9r%C3%B3d%C5%82a)

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
# 4.	Źródła

