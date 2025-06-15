import styled, { css } from "styled-components";

interface CardWrapperProps {
  isSelected: boolean;
  $width?: number;
}

export const CardWrapper = styled.div<CardWrapperProps>`
  width: ${(props) => `${props.$width}px` || "100%"};
  min-height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px dashed #d1d5db; /* Gris claro */
  background-color: white;
  color: #6b7280; /* text-muted */
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  ${(props) =>
    props.isSelected &&
    css`
      background-color: #3b82f6; /* primary color */
      color: white;
      border: 2px solid #3b82f6;
    `}

  &:hover {
    transform: scale(1.02);
  }
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
  padding: 8px;
`;

export const CardValue = styled.span`
  font-size: 1.5rem;
  font-weight: bold;

  @media (min-width: 640px) {
    font-size: 1.875rem;
  }
`;

export const SelectedLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 4px;
`;

export const SmallText = styled.span`
  font-size: 0.75rem;
  margin-top: 4px;
`;
