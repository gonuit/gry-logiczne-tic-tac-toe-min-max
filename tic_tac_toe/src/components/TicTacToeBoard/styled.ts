import styled from "styled-components";

interface ContainerProps {
  size?: number;
}

export const Container = styled.div<ContainerProps>`
  height: ${({ size }) => size || 300}px;
  width: ${({ size }) => size || 300}px;
  display: inline-block;
  vertical-align: top;
  margin: 10px;
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

export const Row = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  height: ${({ size }) => (typeof size === "number" && size / 3) || 100}px;
`;

export const Box = styled.div<ContainerProps>`
  user-select: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ size }) => (typeof size === "number" && size / 3) || 100}px;
  width: ${({ size }) => (typeof size === "number" && size / 3) || 100}px;
  color: white;
  font-size: ${({ size }) => (typeof size === "number" && size / 5) || 60}px;
  font-family: sans-serif;
`;
