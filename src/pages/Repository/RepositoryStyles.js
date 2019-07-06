import styled from 'styled-components';
import colorContrast from '../../helpers/colorContrast';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  & > a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
    align-self: flex-start;
    flex: 1 1 100%;
    margin-bottom: 40px;

    &:hover {
      text-decoration: underline;
    }

    & svg {
      vertical-align: top;
      margin-right: 4px;
    }
  }
`;

export const OwnerProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 40px;
  align-self: flex-start;

  h2 {
    font-size: 20px;
  }

  img {
    width: 80px;
    border-radius: 50%;
    margin-bottom: 5px;
  }
`;

export const RepoInfo = styled.div`
  align-self: flex-start;
  h1 {
    font-size: 24px;

    & > a {
      color: inherit;
      text-decoration: none;

      &:hover {
        color: #7159c1;
      }
    }
  }

  & div {
    margin: 8px 0 16px;

    & span {
      font-size: 12px;
      background: #7564aa;
      color: #fff;
      padding: 4px 8px;
      border-radius: 3px;
      margin-right: 8px;

      & svg {
        vertical-align: text-top;
        margin-right: 4px;
      }
    }
  }

  p {
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    max-width: 400px;
  }
`;

export const FilterList = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 30px;

  button {
    border-radius: 3px;
    border: 0;
    padding: 12px 20px;
    margin: 0 0.5rem;

    &:nth-child(${props => props.active + 1}) {
      background: #7159c1;
      color: white;
    }

    &:hover {
      background: #7159c1;
      color: #fff;
    }
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;
          line-height: 21px;

          &:hover {
            color: #7159c1;
            text-decoration: none;
          }
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const IssueLabel = styled.span`
  background: ${props => `#${props.color}`};
  color: ${({ color }) => colorContrast(color)}};
  border-radius: 2px;
  font-size: 12px;
  font-weight: 600;
  height: 20px;
  padding: 3px 8px;
  margin-left: 10px;
`;

export const PageNav = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 0 0;

  button {
    border-radius: 3px;
    border: 0;
    padding: 12px 20px;
    margin: 0;

    &:hover {
      background: #7159c1;
      color: #fff;
    }

    &[disabled] {
      background: rgba(0, 0, 0, 0.1);
      color: rgba(0, 0, 0, 0.3);
    }

    svg {
      vertical-align: middle;
      font-size: 20px;
    }

    &:nth-child(1) svg {
      margin-right: 4px;
    }

    &:nth-child(2) svg {
      margin-left: 4px;
    }
  }
`;
