import { render, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';

import Input from '../Input';

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

it('renders Input without crashing', () => {
  act(() => {
    render(<Input/>);
  });
});

it('renders Input class correctly', () => {
  act(() => {
    render(<Input />);
  });

  const inputContainer = document.querySelector('[data-testid=inputContainer]')!;
  const input = document.querySelector('[data-testid=input]')!;

  expect(inputContainer).toHaveAttribute('class', 'inputContainer');
  expect(input).toHaveAttribute('class', 'input');
});

it('renders Input placeholder correctly', () => {
  act(() => {
    render(<Input placeholder='Input some text' />);
  });

  const input = document.querySelector('[data-testid=input]')!;
  expect(input).toHaveAttribute('placeholder', 'Input some text');
});

it('renders Input type correctly', () => {
  act(() => {
    render(<Input type='password' />);
  });

  const input = document.querySelector('[data-testid=input]')!;
  expect(input).toHaveAttribute('type', 'password');
});

it('should call onChange callback', () => {
  const onChange = jest.fn();
  act(() => {
    render(<Input onChange={onChange} />);
  });
  const input = document.querySelector('[data-testid=input]')!;
  fireEvent.change(input, { target: { value: 'some text' } });
  expect(onChange).toHaveBeenCalled();
});

it('matchs snapshot 1', () => {
  const onChange = jest.fn();
  const tree = renderer.create(<Input placeholder='placeholder' type='password' onChange={onChange} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('matchs snapshot 2', () => {
  const onChange = jest.fn();
  const tree = renderer.create(<Input placeholder='username' onChange={onChange} />).toJSON();
  expect(tree).toMatchSnapshot();
});

