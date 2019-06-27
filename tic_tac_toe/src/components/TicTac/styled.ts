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
`

export const Button = styled.button`
  margin: 10px 0;
  width: 200px;
  height: 40px;
  background-color: orangered;
  color: white;
  border: none;
  font-family:sans-serif;
  border-radius: 5px;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.5;
  }
`;
