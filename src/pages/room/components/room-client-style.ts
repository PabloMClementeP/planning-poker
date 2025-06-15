import styled from "styled-components";

export const RoomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 80rem;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  gap: 1rem;
`;

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const FirstGridItem = styled.div`
  grid-column: span 2 / span 2;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 1024px) {
    grid-column: span 1 / span 1;
  }
`;

export const SecondGridItem = styled.div`
  grid-column: span 1 / span 1;

  @media (max-width: 1024px) {
    grid-column: span 1 / span 1;
  }
`;

export const Section = styled.section`
  background-color: #fff;
  border-width: 1px;
  border-radius: 8px;
  color: #000;
  border-color: #e0e3e7;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
`;
