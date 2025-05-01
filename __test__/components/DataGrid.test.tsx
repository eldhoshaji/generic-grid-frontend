'use client';

import { render, screen, fireEvent, within } from '@testing-library/react';
import DataGridStaticPage from '../../src/app/sample-grid/page';
import '@testing-library/jest-dom';

describe('UsersStaticPage DataGrid tests', () => {

  beforeEach(() => {
    render(<DataGridStaticPage />);
  });

  test('renders all users', () => {
    expect(screen.getByTestId('cell-0-name')).toHaveTextContent('Alice');
    expect(screen.getByTestId('cell-1-name')).toHaveTextContent('Bob');
    expect(screen.getByTestId('cell-2-name')).toHaveTextContent('Charlie');
  });

  test('sorts by name ascending', () => {
    fireEvent.click(screen.getByTestId('sort-button-name'));

    const firstRowName = screen.getByTestId('cell-0-name');
    expect(firstRowName).toHaveTextContent('Alice'); // assuming sorted order
  });

  test('sorts by name descending', () => {
    fireEvent.click(screen.getByTestId('sort-button-name')); // Ascending
    fireEvent.click(screen.getByTestId('sort-button-name')); // Descending

    const firstRowName = screen.getByTestId('cell-0-name');
    expect(firstRowName).toHaveTextContent('Tina');
  });

  test('filters by role: Admin', () => {
    fireEvent.click(screen.getByTestId('filter-button-role'));
  
    const popover = screen.getByTestId('filter-popover');
    const select = within(popover).getByTestId('filter-select-role');
  
    fireEvent.change(select, { target: { value: 'Admin' } });
  
    const applyButton = within(popover).getByTestId('filter-popover-apply');
    fireEvent.click(applyButton);
  
    expect(screen.getByTestId('cell-0-name')).toHaveTextContent('Alice');
    expect(screen.queryByTestId('cell-1-name')).not.toHaveTextContent('Bob');
  });

  test('searches by name', () => {
    fireEvent.click(screen.getByTestId('search-button-name'));
  
    const popover = screen.getByTestId('search-popover');
    const searchInput = within(popover).getByTestId('search-popover-input');
    fireEvent.change(searchInput, { target: { value: 'ali' } });
  
    const applyButton = within(popover).getByTestId('search-popover-apply');
    fireEvent.click(applyButton);
  
    expect(screen.getByTestId('cell-0-name')).toHaveTextContent('Alice');
    expect(screen.queryByTestId('cell-1-name')).not.toBeInTheDocument();
    expect(screen.queryByTestId('cell-2-name')).not.toBeInTheDocument();
  });

  test('pagination works correctly', () => {
    const pagination = screen.getByTestId('pagination');
    const paginationNext = within(pagination).getByTestId('pagination-next');

    fireEvent.click(paginationNext);
  
    // Example: assuming second page contains user "David"
    expect(screen.getByTestId('cell-0-name')).toHaveTextContent('Karen');
  });  

});
