import { client } from './client';
import { AICapabilityResponse } from '../../types/capability';

export const getCapabilities = async () => {
  try {
    console.log('Fetching capabilities...');
    
    const response = await client.get<AICapabilityResponse>({
      endpoint: 'capabilities',
      queries: { 
        limit: 100,
        orders: '-publishedAt'
      }
    });
    
    console.log('Full API response:', JSON.stringify(response, null, 2));
    
    if (!response || !response.contents || response.contents.length === 0) {
      console.warn('No contents found in the response');
    }

    console.log('Sample capability ID:', response.contents[0]?.id);

    return response.contents;
  } catch (error) {
    console.error('Error in getCapabilities:', error);
    throw error;
  }
};

export const getCapabilityById = async (id: string) => {
  try {
    console.log('Making API request for ID:', id);
    console.log('Endpoint:', 'capabilities');
    
    const response = await client.get<AICapabilityResponse>({
      endpoint: 'capabilities',
      contentId: id,
    });
    
    console.log('Raw API Response:', response);
    
    if (!response) {
      console.log('No response received');
      throw new Error('No capability found');
    }
    
    return response;
  } catch (error) {
    console.error('Detailed error in getCapabilityById:', {
      error,
      id,
      endpoint: 'capabilities'
    });
    throw error;
  }
};