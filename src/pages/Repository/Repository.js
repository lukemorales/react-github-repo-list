import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaStar, FaRegFileAlt } from 'react-icons/fa';
import { GoRepoForked, GoArrowLeft, GoArrowRight } from 'react-icons/go';
import api from '../../services/api';
import {
  Loading,
  Owner,
  IssueList,
  FilterList,
  PageNav,
  OwnerProfile,
  RepoInfo,
  IssueLabel,
} from './RepositoryStyles';
import Container from '../../components/Container';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repo: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repo: {},
    issues: [],
    loading: true,
    filters: [
      { state: 'all', label: 'All Issues', active: true },
      { state: 'open', label: 'Open', active: false },
      { state: 'closed', label: 'Closed', active: false },
    ],
    filterIndex: 0,
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { filters } = this.state;

    const repoName = decodeURIComponent(match.params.repo);

    const [repo, issues] = await Promise.all([
      await api.get(`/repos/${repoName}`),
      await api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filters.find(filter => filter.active).state,
          per_page: 4,
        },
      }),
    ]);

    console.log(issues.data);

    this.setState({
      repo: repo.data,
      issues: issues.data,
      loading: false,
    });
  }

  loadFilters = async () => {
    const { match } = this.props;
    const { filters, filterIndex, page } = this.state;

    const repoName = decodeURIComponent(match.params.repo);

    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filters[filterIndex].state,
        per_page: 4,
        page,
      },
    });

    this.setState({ issues: response.data });
  };

  handleFilters = async filterIndex => {
    await this.setState({ filterIndex });
    this.loadFilters();
  };

  handlePage = async action => {
    const { page } = this.state;
    await this.setState({ page: action === 'back' ? page - 1 : page + 1 });
    this.loadFilters();
  };

  render() {
    const { repo, issues, loading, filters, filterIndex, page } = this.state;

    if (loading) {
      return <Loading> Loading </Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">
            <GoArrowLeft /> Back to Repositories
          </Link>
          <OwnerProfile>
            <a
              href={repo.owner.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={repo.owner.avatar_url} alt={repo.owner.login} />
            </a>
            <h2>{repo.owner.login}</h2>
          </OwnerProfile>
          <RepoInfo>
            <h1>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </h1>
            <div>
              {repo.license && (
                <span>
                  <FaRegFileAlt /> {repo.license.name}
                </span>
              )}
              {repo.stargazers_count && (
                <span>
                  <FaStar />
                  {`${Number(repo.stargazers_count).toLocaleString()} stars`}
                </span>
              )}
              {repo.forks && (
                <span>
                  <GoRepoForked />
                  {`${Number(repo.forks_count).toLocaleString()} forks`}
                </span>
              )}
            </div>
            <p>{repo.description}</p>
          </RepoInfo>
        </Owner>

        <IssueList>
          <FilterList active={filterIndex}>
            {filters.map((filter, index) => (
              <button
                type="button"
                key={filter.state}
                onClick={() => this.handleFilters(index)}
              >
                {filter.label}
              </button>
            ))}
          </FilterList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {issue.title}
                  </a>
                  {issue.labels.map(label => (
                    <IssueLabel key={String(label.id)} color={label.color}>
                      {label.name}
                    </IssueLabel>
                  ))}
                </strong>
                <p> {issue.user.login} </p>
              </div>
            </li>
          ))}
          <PageNav>
            <button
              type="button"
              disabled={page < 2}
              onClick={() => this.handlePage('back')}
            >
              <GoArrowLeft />
              Prev. Page
            </button>
            <button type="button" onClick={() => this.handlePage('next')}>
              Next Page
              <GoArrowRight />
            </button>
          </PageNav>
        </IssueList>
      </Container>
    );
  }
}
