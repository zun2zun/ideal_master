import { client } from './client';
import { AICapabilityResponse } from '../../types/capability';

export const getCapabilities = async () => {
  try {
    console.log('Fetching capabilities...');
    
    const response = await client.get<AICapabilityResponse>({
      endpoint: 'capabilities',
      queries: { 
        limit: 100,
        orders: '-publishedAt',
        fields: ['id', 'title', 'description', 'category', 'technologies', 'thumbnail', 'detail']
      }
    });
    
    console.log('Full API response:', JSON.stringify(response, null, 2));
    
    if (!response || !response.contents || response.contents.length === 0) {
      console.warn('No contents found in the response');
    }

    return response.contents;
  } catch (error) {
    console.error('Error in getCapabilities:', error);
    throw error;
  }
};

export const getCapabilityById = async (id: string) => {
  try {
    const response = await client.get<AICapabilityResponse>({
      endpoint: 'capabilities',
      contentId: id,
    });
    
    if (!response) {
      throw new Error('No capability found');
    }
    
    return response;
  } catch (error) {
    console.error('Error fetching capability:', error);
    throw new Error(`Failed to fetch capability: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};