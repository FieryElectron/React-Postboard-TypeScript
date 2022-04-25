import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';
import PageSelector from '../PageSelector';
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

it('empty test', () => {

});

it('renders PageSelector without crashing', () => {
  act(() => {
    render(<Provider store={store}><Router><PageSelector /></Router></Provider>);
  });
});

it('renders PageSelector class correctly', () => {
  act(() => {
    render(<Provider store={store}><Router><PageSelector /></Router></Provider>);
  });

  const pageSelectorContainer = document.querySelector('[data-testid=pageSelectorContainer]')!;
  const pageSelectorTitle = document.querySelector('[data-testid=pageSelectorTitle]')!;
  const pageSelectorSelect = document.querySelector('[data-testid=pageSelectorSelect]')!;

  expect(pageSelectorContainer).toHaveAttribute('class', 'pageSelectorContainer');
  expect(pageSelectorTitle).toHaveAttribute('class', 'pageSelectorTitle');
  expect(pageSelectorSelect).toHaveAttribute('class', 'pageSelectorSelect');
});


it('matchs snapshot 1', ()=>{
    const tree = renderer.create(<Provider store={store}><Router><PageSelector/></Router></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
}); 
 



