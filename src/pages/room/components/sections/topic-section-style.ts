import styled from "styled-components";

export const TitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
  h2 {
    font-size: 1.8rem;
    font-weight: 600;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
`;

export const Paragraph = styled.p`
  font-size: 1.25rem;
  margin-top: 0.5rem;
  color: #6b7280;
`;

export const InputsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0;

    button {
      grid-column: span 2 / span 2;
      margin-top: 1rem;
    }
  }

  input {
    padding: 0.5rem 0.75rem;
    background-color: #fff;
    border-color: #eaecef;
    font-size: 0.875rem;
    line-height: 1.25rem;
    border-radius: 4px;
    outline: none;
    grid-column: span 3 / span 3;
  }
`;

export const CurrentTopic = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background-color: #d8dce3;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  h2 {
    font-size: 1.8rem;
    font-weight: 600;
    margin: 0;
  }
`;
