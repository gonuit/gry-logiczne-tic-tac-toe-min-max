import styled from "styled-components";

export const Container = styled.div`
  display: block;
  width: 100%;
`;
export const MainView = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Possibilities = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: 10px;
  padding-top: 10px;
  display: inline-block;
  width: 100%;
  overflow-x: auto;
  text-align: center;
`;

interface PossibilityContainerProps {
  selected: boolean;
  clicked?: boolean;
}

export const PossibilityContainer = styled.div<PossibilityContainerProps>`
  cursor: pointer;
  display: inline-block;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.4);
  margin: 5px;
  ${({ selected, clicked }) =>
    clicked
      ? "background-color: rgba(255,110,50,0.2)"
      : selected
      ? "background-color: rgba(255,255,255,0.2)"
      : ""};
`;
export const Value = styled.p`
  color: tomato;
  font-family: sans-serif;
`;

export const GameState = styled.p`
  font-size: 18px;
  color: white;
`;
interface ButtonProps {
  diableStyle: boolean;
}

export const Button = styled.button<ButtonProps>`
  margin: 10px 0;
  width: 200px;
  height: 40px;
  background-color: ${({ diableStyle }) =>
    diableStyle ? "grey" : "orangered"};
  color: white;
  border: none;
  font-family: sans-serif;
  border-radius: 5px;
  &:active {
    opacity: 0.5;
  }
`;

export const LegendContainer = styled.div`
  display: inline-block;
  width: 100%;
  text-align: center;
  vertical-align: top;
`;

export const LegendItemContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

export const LegendBox = styled.div`
  display: inline-block;
  margin: 0 10px;
  width: 30px;
  height: 30px;
  border: 1px solid rgba(255, 255, 255, 0.4);
`;

export const LegendBoxSelected = styled(LegendBox)`
  background-color: rgba(255, 255, 255, 0.2);
`;
export const LegendBoxClicked = styled(LegendBox)`
  background-color: rgba(255, 110, 50, 0.2);
`;
export const LegendBoxDescription = styled.span`
  display: inline-block;
  vertical-align: middle;
  height: 100%;
  line-height: 26px;
  color: rgb(220,220,220);
  font-size: 11px;
`