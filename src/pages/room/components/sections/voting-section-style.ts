import styled from "styled-components";

export const SectionText = styled.p`
  font-size: 1.5rem;
  margin-top: 0.5rem;
  color: #6b7280;
  display: flex;
  gap: 1rem;
`;

export const CardsContainer = styled.div`
  display: grid;
  gap: 16px;
  justify-content: center;
  padding: 1rem;

  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  }
`;
