import styled from "styled-components";

export const IndividualVoteContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  gap: 32px;
  flex-wrap: wrap;
`;

export const UserVoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    font-size: 1.5rem;
    font-weight: 600;
  }

  p {
    font-size: 14px;
    font-weight: 400;
    color: red;
  }
`;

export const SectionText = styled.p`
  font-size: 1.5rem;
  margin-top: 0.5rem;
  color: #6b7280;
  display: flex;
  gap: 1rem;
`;

export const ChartContainer = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
