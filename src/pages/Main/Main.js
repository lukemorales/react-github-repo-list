import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaPlus, FaSpinner, FaTrash } from 'react-icons/fa';
import api from '../../services/api';

import { Form, SubmitButton, List, ErrorMessage } from './MainStyles';
import Container, { Icon } from '../../components/Container';

class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: false,
    errorMessage: '',
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    repositories && this.setState({ repositories: JSON.parse(repositories) });
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    prevState.repositories !== repositories &&
      localStorage.setItem('repositories', JSON.stringify(repositories));
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true, error: false });

    try {
      const { newRepo, repositories } = this.state;

      if (newRepo === '') throw new Error('You need to inform one repository');

      const hasRepo = repositories.find(repo => repo.name === newRepo);

      if (hasRepo) throw new Error('Duplicated Repository');

      const response = await api.get(`/repos/${newRepo}`);

      // const data = {
      //   name: response.data.full_name,
      // };
      const { data } = response;

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        errorMessage: '',
      });
    } catch (Error) {
      this.setState({
        error: true,
        errorMessage:
          Error.message === 'Request failed with status code 404'
            ? 'Repository not found'
            : Error.message,
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { newRepo, loading, repositories, error, errorMessage } = this.state;

    return (
      <Container>
        <Icon>
          <FaGithubAlt />
        </Icon>

        <h1>GitHub Repositories</h1>

        <Form onSubmit={this.handleSubmit} error={error ? 1 : 0}>
          <input
            type="text"
            placeholder="Add Repository"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading ? 1 : 0} empty={!newRepo}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <List>
          {repositories.map(repo => (
            <li key={repo.name}>
              <div>
                <Link to={`/repository/${encodeURIComponent(repo.full_name)}`}>
                  <img src={repo.owner.avatar_url} alt={repo.owner.name} />
                  <span>{repo.full_name}</span>
                </Link>
              </div>
              <button type="button" onClick={() => {}}>
                <FaTrash />
              </button>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}

export default Main;
