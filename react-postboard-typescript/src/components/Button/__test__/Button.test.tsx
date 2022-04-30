import { render, fireEvent  } from '@testing-library/react';// userevent
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';

import Button from '../Button';

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

//desc{}

it('renders Button without crashing', () => {
  act(() => {
    render(<Button/>);
  });
});

it('renders Button color correctly', () => {
  act(() => {
    render(<Button color='red'/>);
  });

  const button = document.querySelector('[data-testid=button]')!;
  expect(button).toHaveStyle({'background-color': 'red'});
});

it('renders Button color correctly', () => {
  act(() => {
    render(<Button text='click me please'/>);
  });

  const button = document.querySelector('[data-testid=button]')!;
  expect(button).toHaveTextContent('click me please');
});

it('should call onClick callback', ()=>{
    const onClick = jest.fn();
    act(() => {
      render(<Button onClick={onClick}/>);
    });
    const button = document.querySelector('[data-testid=button]')!;
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
});
 
it('matchs snapshot 1', ()=>{
    const onClick = jest.fn();
    const tree = renderer.create(<Button color='blue' text='click' onClick={onClick}/>).toJSON();
    expect(tree).toMatchSnapshot();
});

it('matchs snapshot 2', ()=>{
    const onClick = jest.fn();
    const tree = renderer.create(<Button color='green' text='save' onClick={onClick}/>).toJSON();
    expect(tree).toMatchSnapshot();
});