import styled from "styled-components";

export const Container = styled.div`
  height: 300px;
  width: 300px;
  display: flex;
  flex-direction: column;
`;
export const Line = styled.div`
  height: 1px;
  background-color: white;
  width: 100%;
`;

export const VertLine = styled.div`
  width: 1px;
  background-color: white;
  height: 100%;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  height: 100px;
`;

export const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100px;
  color: white;
  font-size: 60px;
  font-family: sans-serif;
`;
