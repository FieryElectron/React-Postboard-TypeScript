import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';

import Header from '../Header';
import { Provider } from 'react-redux';

import { BrowserRouter as Router} from 'react-router-dom'
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

it('empty test', ()=>{

});

it('renders Header without crashing', () => {
  act(() => {
    render(<Provider store={store}><Router><Header/></Router></Provider>);
  });
});

it('renders Header class correctly', () => {
  act(() => {
    render(<Provider store={store}><Router><Header/></Router></Provider>);
  });

  const headerContainer = document.querySelector('[data-testid=headerContainer]')!;
  const header = document.querySelector('[data-testid=header]')!;

  expect(headerContainer).toHaveAttribute('class', 'headerContainer');
  expect(header).toHaveAttribute('class', 'header');
});

it('renders Header title correctly', () => {
  act(() => {
    render(<Provider store={store}><Router><Header title='PostBoard'/></Router></Provider>);
  });

  const header = document.querySelector('[data-testid=header]')!;

  expect(header).toHaveTextContent('PostBoard');
});

it("matchs snapshot 1", ()=>{
    const tree = renderer.create(<Provider store={store}><Router><Header title='Sign In'/></Router></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
}); 
 
it("matchs snapshot 2", ()=>{
    const tree = renderer.create(<Provider store={store}><Router><Header title='PostBoard'/></Router></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
}); 


