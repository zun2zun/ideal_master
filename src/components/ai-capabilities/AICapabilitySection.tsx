import React from 'react';
import { Box, Heading, Text, HStack, VStack, Icon, Image, Tag, useBreakpointValue, WrapItem } from '@chakra-ui/react';
import { FaArrowRight, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface AICapabilityContent {
  id: string;
  title: string;
  description: string;
  category: string[];
  technologies: string[];
  thumbnail: {
    url: string;
  };
}

interface AICapabilitySectionProps {
  title: string;
  challenge: string;
  contents: AICapabilityContent[];
}

// カテゴリの内部値と表示名のマッピングを更新
const categoryMapping = {
  'text_creation': '文章作成',
  'image_generation': '画像生成',
  'video_creation': '動画作成',
  'shift_management': 'シフト管理',
  'document_creation': '文書作成・管理',
  'meeting_support': '会議・ミーティング支援',
  'customer_support': 'カスタマーサポート',
  'data_analysis': 'データ分析・レポート',
  'translation': '翻訳・多言語対応',
  'design_support': 'デザイン支援',
  'marketing_analysis': 'マーケティング分析',
  // ... 他のカテゴリも同様に追加
};

// カテゴリの文字列から内部値を取得する関数を追加
const getInternalCategory = (category: string) => {
  // "category_name（表示名）" の形式から category_name を取得
  return category.split('（')[0].trim();
};

// filterByCategory関数を修正
const filterByCategory = (capabilities: AICapabilityContent[], categoryKey: string) => {
  console.log('Filtering for category:', categoryKey);
  console.log('Available capabilities:', capabilities);
  
  return capabilities.filter(cap => {
    if (!cap.category || !Array.isArray(cap.category)) {
      console.log('Invalid category format for:', cap);
      return false;
    }
    
    // カテゴリの内部値を取得して比較
    const matches = cap.category.some(cat => {
      const internalCat = getInternalCategory(cat);
      console.log('Comparing:', internalCat, 'with', categoryKey);
      return internalCat === categoryKey;
    });
    
    console.log('Matches for', cap.title, ':', matches);
    return matches;
  });
};

// カテゴリの表示名マッピング
const categoryDisplayNames: { [key: string]: string } = {
  'text_creation': '文章作成',
  'image_generation': '画像生成',
  'video_creation': '動画作成',
  'shift_management': 'シフト管理'
};

// カテゴリ名を変換する関数
const getCategoryDisplayName = (category: string) => {
  return categoryDisplayNames[category] || category;
};

// カルーセルのカスタムスタイルを修正
const customStyles = `
  .slick-slide {
    padding: 0 0px;
  }
`;

const AICapabilitySection: React.FC<AICapabilitySectionProps> = ({
  title,
  challenge,
  contents
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  console.log(`=== Rendering ${title} ===`);
  console.log('Contents count:', contents.length);
  console.log('Contents:', contents.map(c => c.title));

  // スライダー設定を条件分岐
  const sliderSettings = {
    dots: false,
    infinite: contents.length > 1,  // カードが1枚の場合はinfiniteをfalseに
    autoplay: contents.length > 1,  // カードが1枚の場合はautoplayもfalseに
    pauseOnHover: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          arrows: false,
        }
      }
    ]
  };

  return (
    <Box
      py={isMobile ? 4 : 12}
      px={isMobile ? 4 : 12}
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, rgba(0,184,212,0.05) 0%, rgba(10,10,30,0) 100%)',
        borderRadius: 'xl',
        zIndex: -1,
      }}
    >
      {/* ヘッダー部分 */}
      <Box mb={isMobile ? 4 : 8}>
        <Heading 
          as="h2" 
          size={isMobile ? "md" : "lg"}
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
          mb={2}
        >
          {title}
        </Heading>
        <Text 
          fontSize={isMobile ? "sm" : "md"}
          color="gray.300"
        >
          {challenge}
        </Text>
      </Box>

      {/* カード表示部分 */}
      {contents && contents.length > 0 ? (
        <Box maxW="1200px" mx="auto" overflow="hidden">
          <style>{customStyles}</style>
          <Slider {...sliderSettings}>
            {contents.map((content) => (
              <Box key={content.id} px={2}>
                <Link to={`/tools/${content.id}`}>
                  <Box
                    bg="rgba(0, 184, 212, 0.05)"
                    borderRadius="lg"
                    overflow="hidden"
                    h="0"
                    pb="100%"
                    w="100%"
                    maxW="240px"
                    mx="auto"
                    position="relative"
                  >
                    <Box
                      position="absolute"
                      top="0"
                      left="0"
                      right="0"
                      bottom="0"
                      display="flex"
                      flexDirection="column"
                    >
                      <Box 
                        position="relative"
                        w="100%"
                        h="58%"
                      >
                        <Image
                          src={content.thumbnail?.url}
                          alt={content.title}
                          objectFit="cover"
                          w="100%"
                          h="100%"
                          fallbackSrc="/placeholder-image.png"
                        />
                      </Box>
                      <VStack 
                        align="start" 
                        p="5%"
                        spacing="2%"
                        h="42%"
                      >
                        <Heading 
                          size="sm" 
                          color="white"
                          noOfLines={2}
                          fontSize="clamp(12px, 5.8%, 14px)"
                        >
                          {content.title}
                        </Heading>
                        <Text 
                          fontSize="clamp(11px, 5.4%, 13px)"
                          color="gray.300"
                          noOfLines={2}
                        >
                          {content.description}
                        </Text>
                      </VStack>
                    </Box>
                  </Box>
                </Link>
              </Box>
            ))}
          </Slider>
        </Box>
      ) : (
        <Text color="gray.400" textAlign="center">
          このカテゴリのコンテンツはまだありません
        </Text>
      )}
    </Box>
  );
};

export default AICapabilitySection; 