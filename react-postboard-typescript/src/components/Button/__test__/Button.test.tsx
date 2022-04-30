import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';

import Button from '../Button';

describe('Button', () => {
  it('empty test', () => {

  });
  
  it('renders Button without crashing', () => {
      render(<Button />);
  });
  
  it('renders Button color correctly', () => {
    render(<Button color='red' />);
  
    const button = document.querySelector('[data-testid=button]')!;
    expect(button).toHaveStyle({ 'background-color': 'red' });
  });
  
  it('renders Button color correctly', () => {
    render(<Button text='click me please' />);
  
    const button = document.querySelector('[data-testid=button]')!;
    expect(button).toHaveTextContent('click me please');
  });

  it('should call onClick callback', async () => {
    const onClick = jest.fn();

    render(<Button onClick={onClick} />);

    const button = document.querySelector('[data-testid=button]')!;
    userEvent.click(button);

    await waitFor(() => {
      expect(onClick).toHaveBeenCalled();
    });
  });

  it('matchs snapshot 1', () => {
    const onClick = jest.fn();
    const tree = renderer.create(<Button color='blue' text='click' onClick={onClick} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  it('matchs snapshot 2', () => {
    const onClick = jest.fn();
    const tree = renderer.create(<Button color='green' text='save' onClick={onClick} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});



