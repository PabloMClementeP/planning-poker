import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.05);
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
  background: #f8f9fa;
  box-sizing: border-box;
`;

export const StyledDices = styled.img<{
  $animate?: boolean;
  $width?: string;
  $height?: string;
}>`
  width: ${(props) => props.$width || "4rem"};
  height: ${(props) => props.$height || "4rem"};
  margin-bottom: 1rem;
  animation: ${(props) => (props.$animate ? "${pulse} 2s infinite" : "none")};
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-family: sans-serif;
  font-weight: bold;
  color: rgb(156, 1, 1);
  animation: ${pulse} 2s infinite;
  text-align: center;
`;

export const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-top: 0.5rem;
  color: #6b7280;
`;

export const Header = styled.header`
  margin-bottom: 3rem;
  text-align: center;
`;

export const HeaderTitle = styled.h1`
  font-size: 3rem;
  font-family: "Inter", sans-serif;
  font-weight: bold;
  color: rgb(156, 1, 1);
  margin: 0;
  padding: 0;
`;

export const Footer = styled.footer`
  margin-top: 3rem;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;

  strong {
    color: rgb(156, 1, 1);
  }
`;

export const Label = styled.label`
  font-weight: bold;
  text-align: left;
`;

export const AvatarPicker = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 500px;
`;

export const AvatarOption = styled.div<{
  $isSelected: boolean;
}>`
  border-radius: 50%;
  cursor: pointer;
  padding: 8px;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${({ $isSelected }) =>
    $isSelected ? "1px solid #d12e2e" : "1px solid transparent"};
  background-color: ${({ $isSelected }) =>
    $isSelected ? "#D8DCE3" : "transparent"};
`;
