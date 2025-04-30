// /pages/api/v1/config/[table_name].ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { UserResponseModel } from '@/app/types/api/UserResponseModel';

const BACKEND_API_URL = 'http://127.0.0.1:8000'; // The URL of your backend API

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserResponseModel | { error: string }>
) {
  const { table_name } = req.query; // Extract the table_name from the query

  if (typeof table_name !== 'string') {
    return res.status(400).json({ error: 'Invalid table name' });
  }

  try {
    // Fetch table config from backend API
    const response = await axios.get(`${BACKEND_API_URL}/api/v1/config/${table_name}`);
    const config = response.data;

    if (!config) {
      return res.status(404).json({ error: 'Table configuration not found' });
    }
    
    res.status(200).json(config);
  } catch (error) {
    console.error('Error fetching table config:', error);
    res.status(500).json({ error: 'Failed to fetch table config' });
  }
}
