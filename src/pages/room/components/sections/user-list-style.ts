import styled from "styled-components";

export const UserListStyle = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  justify-content: center;
`;

export const UserItemStyle = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 4px 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1.5rem;
  font-weight: 500;

  img {
    width: 38px;
    height: 38px;
    object-fit: cover;
  }
`;

export const CircleStyle = styled.div<{
  color: string;
}>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(props: { color: string }) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
`;
