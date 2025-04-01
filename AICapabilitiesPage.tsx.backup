import React, { useEffect, useState } from 'react';
import { Box, Container, Heading, Text } from '@chakra-ui/react';
import { getCapabilities } from '../lib/api/capabilities';
import { AICapability } from '../types/capability';
import AICapabilitySection from '../components/ai-capabilities/AICapabilitySection';

// 全カテゴリリスト
const ALL_CATEGORIES = [
  'text_creation',
  'image_generation',
  'video_creation',
  'shift_management',
  'document_creation',
  'meeting_support',
  'customer_support',
  'data_analysis',
  'translation',
  'design_support',
  'code_generation',
  'marketing_analysis',
  'content_planning',
  'sales_support',
  'social_media',
  'market_research',
  'recruitment',
  'training_support',
  'performance_evaluation',
  'workflow_optimization',
  'automation',
  'knowledge_management',
  'communication',
  'life_planning',
  'health_care',
  'learning_support',
  'entertainment',
  'personal_finance',
  'esearch_support',
  'legal_support',
  'risk_management'
];

// カテゴリの日本語表示名とチャレンジ文を管理
const CATEGORY_INFO = {
  text_creation: { display: '文章作成', challenge: '文章の作成が効率的に行える' },
  image_generation: { display: '画像生成', challenge: 'プロ品質の画像を簡単に作成できる' },
  video_creation: { display: '動画作成', challenge: '動画作成が自分でできる' },
  shift_management: { display: 'シフト管理', challenge: '自社に適したシフト管理システムを作れる' },
  // ... 他のカテゴリも同様に追加
};

interface AICapabilityContent extends Omit<AICapability, 'contents'> {
  technologies: string[];
  thumbnail: {
    url: string;
  };
  detail: string;
  gallery?: {
    url: string;
  }[];
  relatedCases?: {
    id: string;
    title: string;
    thumbnail: {
      url: string;
    };
  }[];
}

export default function AICapabilitiesPage() {
  const [capabilities, setCapabilities] = useState<AICapabilityContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCapabilities = async () => {
      try {
        const data = await getCapabilities();
        if (Array.isArray(data)) {
          setCapabilities(data as AICapabilityContent[]);
        } else {
          setError('データの形式が不正です');
        }
      } catch (error) {
        setError('データの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchCapabilities();
  }, []);

  if (loading) return <Box p={8}>Loading...</Box>;
  if (error) return <Box p={8} color="red.500">{error}</Box>;

  const filterByCategory = (category: string) => {
    return capabilities.filter(cap => {
      if (!cap.category || !Array.isArray(cap.category)) return false;
      return cap.category.some(cat => cat.startsWith(category));
    });
  };

  return (
    <Container maxW="1200px" py={12}>
      {/* ヘッダー */}
      <Box mb={16} textAlign="center">
        <Heading 
          size="2xl" 
          mb={6}
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
        >
          AIでできること
        </Heading>
        <Text 
          fontSize="xl" 
          color="gray.300"
          maxW="800px"
          mx="auto"
        >
          AIの可能性を最大限に活かし、ビジネスの効率化と革新を実現します
        </Text>
      </Box>

      {/* すべてのカテゴリを表示 */}
      {ALL_CATEGORIES.map(category => {
        const categoryInfo = CATEGORY_INFO[category] || {
          display: category,
          challenge: 'AIを活用した効率化と革新'
        };
        
        return (
          <AICapabilitySection
            key={category}
            title={`${category}（${categoryInfo.display}）`}
            challenge={categoryInfo.challenge}
            contents={filterByCategory(category)}
          />
        );
      })}
    </Container>
  );
}