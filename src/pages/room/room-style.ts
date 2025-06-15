import styled from "styled-components";

export const RoomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  box-sizing: border-box;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px 40px;
  background-color: #f8f8f8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;

  p {
    text-decoration: none;
    color: rgb(156, 1, 1);
    margin: 0;
    padding: 0 1rem;
    font-size: 2rem;
  }
`;
