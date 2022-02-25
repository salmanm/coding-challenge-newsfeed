import styled from 'styled-components';

const Card = styled.div`
  padding: 1.5rem;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  margin-bottom: ${({ theme }) => theme.space[1]};
`;

export default Card;
