import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';

import TimeSelector from '../TimeSelector';

import { BrowserRouter as Router } from 'react-router-dom';
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

it('renders TimeSelector without crashing', () => {
  act(() => {
    render(<Provider store={store}><Router><TimeSelector /></Router></Provider>);
  });
});

it('renders TimeSelector class correctly', () => {
  act(() => {
    render(<Provider store={store}><Router><TimeSelector /></Router></Provider>);
  });

  const timeSelectorContainer = document.querySelector('[data-testid=timeSelectorContainer]')!;
  const timeSelectorTitle1 = document.querySelector('[data-testid=timeSelectorTitle1]')!;
  const timeSelectorDate1 = document.querySelector('[data-testid=timeSelectorDate1]')!;
  const timeSelectorTitle2 = document.querySelector('[data-testid=timeSelectorTitle2]')!;
  const timeSelectorDate2 = document.querySelector('[data-testid=timeSelectorDate2]')!;


  expect(timeSelectorContainer).toHaveAttribute('class', 'timeSelectorContainer');
  expect(timeSelectorTitle1).toHaveAttribute('class', 'timeSelectorTitle');
  expect(timeSelectorDate1).toHaveAttribute('class', 'timeSelectorDate');
  expect(timeSelectorTitle2).toHaveAttribute('class', 'timeSelectorTitle');
  expect(timeSelectorDate2).toHaveAttribute('class', 'timeSelectorDate');

});


 
it('matchs snapshot 1', ()=>{
    const tree = renderer.create(<Provider store={store}><Router><TimeSelector/></Router></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });