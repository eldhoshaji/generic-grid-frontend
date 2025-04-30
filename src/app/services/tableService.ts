// services/tableService.ts
import apiClient from '@/app/services/apiClient'; // wherever you placed it
import { PaginatedResponse, TableParams, TableConfigResponseModel} from '@/app/types/api/TableModel';

export async function fetchTableData<T>(
  tableName: string,
  params: TableParams
): Promise<PaginatedResponse<T>> {
  const response = await apiClient.post<PaginatedResponse<T>>(
    `/api/v1/data/${tableName}`,
    params
  );
  return response.data;
}

export async function fetchTableConfig<T>(
    tableName: string,
  ): Promise<TableConfigResponseModel> {
    const response = await apiClient.get<TableConfigResponseModel>(`/api/v1/config/${tableName}`);
    return response.data;
  }
  