import styled from "styled-components";

export const Card = styled.div`
  border: 1px solid #e5e7eb;
  background-color: #ffffff;
  color: #111827;
  border-radius: 0.5rem;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-color: hsl(220, 10%, 88%);
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
  padding: 1.5rem;
`;

export const CardTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 2rem;
  letter-spacing: -0.025rem;
`;

export const InputsWrappers = styled.div`
  display: flex;
  flex-direction: column;

  label {
    text-align: start;
    font-weight: 500;
    font-size: 0.875rem;
    color: #333841;
    line-height: 1;
    margin-bottom: 4px;
  }

  input {
    padding: 0.5rem 0.75rem;
    background-color: #fff;
    border-color: #eaecef;
    font-size: 0.875rem;
    line-height: 1.25rem;
    border-radius: 4px;
    outline: none;
  }
`;

export const CardDescription = styled.div`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #6b7280;
`;

export const CardContent = styled.div`
  padding: 1.5rem;
  padding-top: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  padding-top: 0;
  gap: 8px;
  flex-wrap: wrap;
`;

export const Button = styled.button`
  box-shadow: inset 0px 1px 0px 0px #ffffff;
  background: linear-gradient(to bottom, #ffffff 5%, #f6f6f6 100%);
  background-color: #ffffff;
  border-radius: 6px;
  border: 1px solid #dcdcdc;
  display: inline-block;
  cursor: pointer;
  color: #666666;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  padding: 6px 24px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #ffffff;
  width: 100%;
  flex: 1;

  &:hover {
    background: linear-gradient(to bottom, #f6f6f6 5%, #ffffff 100%);
    background-color: #f6f6f6;
  }
  &:active {
    position: relative;
    top: 1px;
  }
`;
