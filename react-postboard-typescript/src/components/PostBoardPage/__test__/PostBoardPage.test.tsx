import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';

import PostBoardPage from '../PostBoardPage';
import { BrowserRouter as Router} from 'react-router-dom'
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

it('renders PostBoardPage without crashing', () => {
  act(() => {
    render(<Provider store={store}><Router><PostBoardPage /></Router></Provider>);
  });
});


it('matchs snapshot 1', ()=>{
  const tree = renderer.create(<Provider store={store}><Router><PostBoardPage/></Router></Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});
