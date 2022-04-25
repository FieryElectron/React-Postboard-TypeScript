import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';

import CreatePostField from '../CreatePostField';
import { Provider } from 'react-redux';

import { BrowserRouter as Router } from 'react-router-dom';
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

it('renders CreatePostField without crashing', () => {
  act(() => {
    render(<Provider store={store}><Router><CreatePostField /></Router></Provider>);
  });
});

it('renders CreatePostField class correctly', () => {
  act(() => {
    render(<Provider store={store}><Router><CreatePostField /></Router></Provider>);
  });

  const createPostFieldContainer = document.querySelector('[data-testid=createPostFieldContainer]')!;
  expect(createPostFieldContainer).toHaveAttribute('class', 'createPostFieldContainer');
});

it('matchs snapshot 1', ()=>{
    const tree = renderer.create(<Provider store={store}><Router><CreatePostField/></Router></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
}); 




