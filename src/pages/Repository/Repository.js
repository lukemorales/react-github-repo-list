import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';
import { Loading, Owner, IssueList, FilterList } from './RepositoryStyles';
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
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repo: repo.data,
      issues: issues.data,
      loading: false,
    });
  }

  loadFilters = async () => {
    const { match } = this.props;
    const { filters, filterIndex } = this.state;

    const repoName = decodeURIComponent(match.params.repo);

    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filters[filterIndex].state,
        per_page: 5,
      },
    });

    this.setState({ issues: response.data });
  };

  handleFilters = async filterIndex => {
    await this.setState({ filterIndex });
    this.loadFilters();
  };

  render() {
    const { repo, issues, loading, filters, filterIndex } = this.state;

    if (loading) {
      return <Loading> Carregando </Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Back to Repositories</Link>
          <img src={repo.owner.avatar_url} alt={repo.owner.login} />
          <h1>{repo.name}</h1>
          <p>{repo.description}</p>
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
                    <span key={String(label.id)}> {label.name} </span>
                  ))}
                </strong>
                <p> {issue.user.login} </p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}
