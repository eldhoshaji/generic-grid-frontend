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
  { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'User' }
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

export default function UsersStaticPage() {

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
        rowClass={(record) => getRowClassFromRules(record, rowStyleRules)}
      />
    </main>
  );
}
