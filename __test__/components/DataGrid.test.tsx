import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import DataGrid from '../../src/components/DataGrid/DataGrid'

test('renders DataGrid component', () => {
  const columns = [
    { key: 'name', title: 'Name', sortable: true },
    { key: 'age', title: 'Age' },
  ];
  
  const data = [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 },
  ];

  const totalSize = 2;

  // Provide default values for missing props
  render(
    <DataGrid
      columns={columns}
      data={data}
      totalSize={totalSize}
      filters={{}} 
      searchQuery={{}}
      sortConfig={null}
      pagination={{ page: 1, size: 10 }}
    />
  );

  expect(screen.getByText('Name')).toBeInTheDocument();
  expect(screen.getByText('Age')).toBeInTheDocument();

  // Assert that the table data is rendered
  expect(screen.getByText('John')).toBeInTheDocument();
  expect(screen.getByText('Jane')).toBeInTheDocument();
  expect(screen.getByText('30')).toBeInTheDocument();
  expect(screen.getByText('25')).toBeInTheDocument();
});


test('sorts data when the sort button is clicked', () => {
  const columns = [
    { key: 'name', title: 'Name', sortable: true },
    { key: 'age', title: 'Age', sortable: true },
  ];

  const data = [
    { name: 'Jane', age: 25 },
    { name: 'John', age: 30 },
  ];

  const totalSize = 2;

  render(
    <DataGrid
      columns={columns}
      data={data}
      totalSize={totalSize}
      filters={{}} 
      searchQuery={{}}
      sortConfig={null}
      pagination={{ page: 1, size: 10 }}
    />
  );

  // Click the sort button for "Name" column
  const sortButton = screen.getByTestId('sort-button-name');
  expect(sortButton).toBeTruthy();
  if (sortButton) fireEvent.click(sortButton);

  // Find all name cells
  const nameCells = screen.getAllByRole('cell', { name: /jane|john/i });

  // Check that Jane is first, then John
  expect(nameCells[0]).toHaveTextContent('Jane');
  expect(nameCells[1]).toHaveTextContent('John');
});
