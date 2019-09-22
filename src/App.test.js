import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ReposContainer from './components/github/ReposContainer'
import ReposList from './components/github/ReposList'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const divRepo = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders Repos without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ReposContainer />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders ReposList without crashing', () => {
  const array = [{ 'id': 1, 'name': 'repo1' }];
  const div = document.createElement('div');
  ReactDOM.render(<ReposList repos={array} />, div);
  ReactDOM.unmountComponentAtNode(div);
});