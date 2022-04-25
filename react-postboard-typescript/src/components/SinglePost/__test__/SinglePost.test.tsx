import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';

import SinglePost from '../SinglePost';

import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from '../../../app/store';

let container: HTMLElement;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container.remove();
});

it('empty test', () => {

});

it('renders SinglePost without crashing', () => {
  const post = {
    post: {
      username: 'username',
      content: 'content',
      timestamp: 'timestamp',
    }
  }

  act(() => {
    render(<Provider store={store}><Router><SinglePost post={post}/></Router></Provider>);
  });
});

it('renders SinglePost class correctly', () => {
  const post = {
    post: {
      username: 'username',
      content: 'content',
      timestamp: 'timestamp',
    }
  }

  act(() => {
    render(<Provider store={store}><Router><SinglePost post={post}/></Router></Provider>);
  });

  const singlePostContainer = document.querySelector('[data-testid=singlePostContainer]')!;
  const ownerName = document.querySelector('[data-testid=ownerName]')!;
  const postContent = document.querySelector('[data-testid=postContent]')!;
  const timeStampContainer = document.querySelector('[data-testid=timeStampContainer]')!;
  const timeStamp = document.querySelector('[data-testid=timeStamp]')!;



  expect(singlePostContainer).toHaveAttribute('class', 'singlePostContainer');
  expect(ownerName).toHaveAttribute('class', 'ownerName');
  expect(postContent).toHaveAttribute('class', 'postContent');
  expect(timeStampContainer).toHaveAttribute('class', 'timeStampContainer');
  expect(timeStamp).toHaveAttribute('class', 'timeStamp');
});

it('matchs snapshot 1', ()=>{
  const post = {
    post: {
      username: 'username',
      content: 'content',
      timestamp: 'timestamp',
    }
  }

  const tree = renderer.create(<Provider store={store}><Router><SinglePost post={post} /></Router></Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});