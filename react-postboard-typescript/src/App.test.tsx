import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { createRoot } from 'react-dom/client';

let container: HTMLElement;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container.remove();
});

it("empty test", ()=>{

});

// test('renders without crashing', () => {
//   createRoot(container).render(
//     <Provider store={store}>
//       <App />
//     </Provider>
//   );
// });
