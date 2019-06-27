import styled from "styled-components";

export const Container = styled.div`
  display: block;
  width: 100%;
`;
export const MainView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Possibilities = styled.div`
  margin-top: 20px;
  display: inline-block;
  width: 100%;
  overflow-x: auto;
  text-align:center;
`;

interface PossibilityContainerProps {
  selected: boolean
}

export const PossibilityContainer = styled.div<PossibilityContainerProps>`
  cursor: pointer;
  display:inline-block;
  text-align:center;
  border: 1px solid rgba(255,255,255,0.4);
  margin: 5px;
  ${({ selected }) => selected ? 'background-color: rgba(255,255,255,0.2)' : ''};
`;
export const Value = styled.p`
  color: tomato;
  font-family: sans-serif;
`;
