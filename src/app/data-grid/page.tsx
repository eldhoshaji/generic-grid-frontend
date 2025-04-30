'use client';
import DataGrid from '@/components/DataGrid/DataGrid';
import { ColumnType } from '@/types/table';
import { RowStyleRule } from '@/app/types/api/TableModel';
import { getRowClassFromRules } from '@/app/utils/getRowClassFromRules';

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const initialUsers: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'User' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'User' },
  { id: 4, name: 'David', email: 'david@example.com', role: 'Admin' },
  { id: 5, name: 'Eve', email: 'eve@example.com', role: 'User' },
  { id: 6, name: 'Frank', email: 'frank@example.com', role: 'Admin' },
  { id: 7, name: 'Grace', email: 'grace@example.com', role: 'User' },
  { id: 8, name: 'Hank', email: 'hank@example.com', role: 'Admin' },
  { id: 9, name: 'Ivy', email: 'ivy@example.com', role: 'User' },
  { id: 10, name: 'Jack', email: 'jack@example.com', role: 'Admin' },
  { id: 11, name: 'Karen', email: 'karen@example.com', role: 'User' },
  { id: 12, name: 'Leo', email: 'leo@example.com', role: 'Admin' },
  { id: 13, name: 'Mona', email: 'mona@example.com', role: 'User' },
  { id: 14, name: 'Nate', email: 'nate@example.com', role: 'Admin' },
  { id: 15, name: 'Olivia', email: 'olivia@example.com', role: 'User' },
  { id: 16, name: 'Paul', email: 'paul@example.com', role: 'Admin' },
  { id: 17, name: 'Quinn', email: 'quinn@example.com', role: 'User' },
  { id: 18, name: 'Rachel', email: 'rachel@example.com', role: 'Admin' },
  { id: 19, name: 'Steve', email: 'steve@example.com', role: 'User' },
  { id: 20, name: 'Tina', email: 'tina@example.com', role: 'Admin' },
];

const columnConfigs: ColumnType<User>[] = [
  {
    key: 'id',
    title: 'ID',
    sortable: true,
    filterable: false,
    sorter: (a, b) => a.id - b.id,
  },
  {
    key: 'name',
    title: 'Name',
    sortable: true,
    filterable: false,
    searchable: true,
    sorter: (a, b) => a.name.localeCompare(b.name),
    onSearch: (value, record) =>
      record.name.toLowerCase().includes(value.toLowerCase()),
  },
  {
    key: 'email',
    title: 'Email',
    sortable: false,
    filterable: false,
  },
  {
    key: 'role',
    title: 'Role',
    sortable: true,
    filterable: true,
    filters: [
        { text: 'Admin',  value: 'Admin' },
        { text: 'User',  value: 'User' }
    ],
    onFilter: (value, record) => record.role === value,
    sorter: (a, b) => a.role.localeCompare(b.role),
  },
];

const rowStyleRules: RowStyleRule[] = [
  {
    field: 'role',
    value: 'Admin',
    operator: 'equals',
    class_name: 'bg-yellow-100 font-semibold',
  },
];

export default function DataGridStaticPage() {

  return (
    <main className="p-8">
      <DataGrid
        columns={columnConfigs}
        data={initialUsers}
        totalSize={initialUsers.length}
        filters={[]}
        searchQuery={null}
        pagination={{page: 1, size: 10}}
        sortConfig={null}
        enablePagination={true}
        rowClass={(record) => getRowClassFromRules(record, rowStyleRules)}
      />
    </main>
  );
}
