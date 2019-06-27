import styled from "styled-components";

export const Container = styled.div`
  display: block;
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
  &: > * {
    display: inline-block !important;
  }
`;
