import PropTypes from 'prop-types';

import styled from 'styled-components';

const StatItem = ({ count, icon, color, background, title }) => {
  return (
    <Wrapper color={color} background={background}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5>{title}</h5>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  padding: 2rem;
  background: var(--white);
  border-radius: var(--borderRadius);
  border-bottom: 5px solid ${(props) => props.color};
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .count {
    display: block;
    font-weight: 700;
    font-size: 50px;
    color: ${(props) => props.color};
  }
  .title {
    margin: 0;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: left;
    margin-top: 0.5rem;
  }
  .icon {
    width: 70px;
    height: 60px;
    background: ${(props) => props.background};
    border-radius: var(--borderRadius);
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 2rem;
      color: ${(props) => props.color};
    }
  }
`;

StatItem.propTypes = {
  count: PropTypes.number,
  icon: PropTypes.element,
  color: PropTypes.string,
  background: PropTypes.string,
  title: PropTypes.string,
};

export default StatItem;
