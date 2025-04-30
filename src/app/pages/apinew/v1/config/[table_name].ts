// /pages/api/v1/data/[table_name].ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { UserResponseModel } from '@/app/types/api/UserResponseModel';
import { TableParams } from '@/app/types/api/TableModel';

const BACKEND_API_URL = 'http://127.0.0.1:8000'; // The URL of your backend API

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserResponseModel[] | { error: string }>
) {
  const { table_name } = req.query;

  if (typeof table_name !== 'string') {
    return res.status(400).json({ error: 'Invalid table name' });
  }

  if (req.method === 'POST') {
    try {
      const { search, filters, pagination }: TableParams = req.body;

      const response = await axios.post(`${BACKEND_API_URL}/api/v1/data/${table_name}`, {
        search,
        filters,
        pagination,
      });

      const data = response.data;

      if (!data) {
        return res.status(404).json({ error: 'Data not found' });
      }

      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching table data:', error);
      res.status(500).json({ error: 'Failed to fetch table data' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
