import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Box, 
  Text, 
  Heading, 
  Container, 
  VStack,
  HStack,
  Tag,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Icon,
  ChakraProvider,
  Grid,
  useBreakpointValue,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import { MdBusinessCenter, MdWork, MdTrendingUp } from 'react-icons/md';
import { getCapabilityById } from '@/lib/api/capabilities';
import { AICapability } from '@/types/capability';
import theme from '@/lib/theme';
import { FaStar } from 'react-icons/fa';

interface Capability {
  id: string;
  title: string;
  description: string;
  category: string[];
  technologies: string[];
  thumbnail: {
    url: string;
  };
  // detail: string;  // 古い形式は一時的に残しつつ、新しい形式を追加
  detail01?: string;  // 開発難易度
  detail02?: string;  // 概要
  detail03?: string;  // 関連情報 左
  detail04?: string;  // 関連情報 右
  detail05?: string;  // 解決できる課題
  detail06?: string;  // 課題の詳細解説
  detail07?: string;  // 活用シーン
  detail08?: string;  // 期待できる効果
  detail09?: string;  // おすすめツール
  detail10?: string;  // 導入ステップ
  detail11?: string;  // 注意点・制限事項
  detail12?: string;  // 主要検討項目
  detail13?: string;  // まとめ
  gallery?: GalleryImage[];
  relatedCapabilities?: RelatedCapability[];
  relatedCases?: any[];
}

const RelatedInfoSection = ({ capability }: { capability: AICapability }) => {
  return (
    <Box mb={12}>
      <Heading as="h2" size="xl" mb={8} textAlign="center">👥 関連情報</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        <Card variant="outline" bg="whiteAlpha.50">
          <CardHeader>
            <HStack>
              <Icon as={MdBusinessCenter} color="orange.400" boxSize={6} />
              <Heading size="md" color="orange.400">関連業種</Heading>
            </HStack>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              {capability.category?.map((cat, index) => (
                <Box key={index}>
                  <Text fontWeight="bold" color="orange.200">{cat}</Text>
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>

        <Card variant="outline" bg="whiteAlpha.50">
          <CardHeader>
            <HStack>
              <Icon as={MdWork} color="cyan.400" boxSize={6} />
              <Heading size="md" color="cyan.400">関連技術</Heading>
            </HStack>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              {capability.technologies?.map((tech, index) => (
                <Box key={index}>
                  <Text fontWeight="bold" color="cyan.200">{tech}</Text>
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

// 開発難易度と概要セクションのコンポーネント
const DifficultyAndOverviewSection = ({ capability }: { capability: AICapability }) => {
  // 難易度レベルに応じた★の生成
  const renderStars = (level: number, max: number = 5) => {
    return Array(max).fill('').map((_, i) => (
      <Text as="span" key={i} color={i < level ? "yellow.400" : "gray.600"} fontSize="xl">
        ★
      </Text>
    ));
  };

  return (
    <Box mb={12}>
      <Heading as="h2" size="xl" mb={8} textAlign="center">⭐ 開発難易度と概要</Heading>
      <SimpleGrid columns={{ base: 1, md: 5 }} spacing={8}>
        {/* 開発難易度 (1列分) */}
        <Card variant="outline" bg="whiteAlpha.50" gridColumn={{ base: "1", md: "1 / span 1" }}>
          <CardHeader>
            <VStack align="stretch" spacing={2}>
              <HStack>
                <Icon as={MdTrendingUp} color="yellow.400" boxSize={6} />
                <Heading size="md" color="yellow.400">開発難易度</Heading>
              </HStack>
              <HStack justify="center" mt={2}>
                {renderStars(3)}
              </HStack>
            </VStack>
          </CardHeader>
          <CardBody>
            <VStack spacing={6} align="stretch">
              <Box>
                <Text color="gray.300" fontSize="sm" mb={4}>
                  基本的なプログラミングスキルと機械学習の基礎知識があれば実装可能です。
                </Text>
                <Heading size="sm" color="cyan.400" mb={2}>実装のポイント</Heading>
                <Text color="gray.300" fontSize="sm">
                  • APIキーの設定
                  • プロンプトの最適化
                  • レスポンス処理の実装
                </Text>
              </Box>
            </VStack>
          </CardBody>
        </Card>

        {/* 概要説明 (4列分) */}
        <Box gridColumn={{ base: "1", md: "2 / span 4" }}>
          <Box 
            className="overview-content"
            dangerouslySetInnerHTML={{ __html: capability.detail }}
            sx={{
              'p': {
                color: 'gray.300',
                fontSize: 'lg',
                lineHeight: 'tall',
                mb: 4
              },
              'a': {
                color: 'cyan.400',
                _hover: {
                  textDecoration: 'underline'
                }
              }
            }}
          />
        </Box>
      </SimpleGrid>
    </Box>
  );
};

interface DetailContentProps {
  capability: AICapability;
}

// RichTextContentコンポーネント
const RichTextContent: React.FC<{ html: string }> = ({ html }) => {
  return (
    <Box
      dangerouslySetInnerHTML={{ __html: html }}
      sx={{
        'h2': { 
          fontSize: ['xl', '2xl'], 
          fontWeight: 'bold', 
          mb: 6,
          color: 'cyan.400'
        },
        'p': { 
          mb: 4,
          color: 'gray.100',
          lineHeight: 1.8
        },
        'ul': { 
          pl: 8, 
          mb: 6,
          color: 'gray.100'
        },
        'li': { 
          mb: 3
        }
      }}
    />
  );
};

const DetailContent: React.FC<DetailContentProps> = ({ capability }) => {
  return (
    <VStack spacing={8} align="stretch" w="full">
      {/* 開発難易度と概要のセクション */}
      <Grid templateColumns={{ base: "1fr", md: "350px 1fr" }} gap={6}>
        <Box p={6} bg="whiteAlpha.50" rounded="lg" borderWidth="1px" borderColor="whiteAlpha.200">
          <VStack align="start" spacing={4}>
            <Heading size="md" color="cyan.400">開発難易度</Heading>
            <HStack spacing={1}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon 
                  key={star} 
                  as={FaStar} 
                  color={star <= 3 ? "yellow.400" : "gray.600"} 
                />
              ))}
            </HStack>
            <RichTextContent html={capability.detail01 || ""} />
          </VStack>
        </Box>
        <Box p={6} bg="whiteAlpha.50" rounded="lg" borderWidth="1px" borderColor="whiteAlpha.200">
          <Heading size="md" color="cyan.400" mb={4}>概要</Heading>
          <RichTextContent html={capability.detail02 || ""} />
        </Box>
      </Grid>

      {/* 関連情報と課題のセクション（3カラム） */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        <Box p={6} bg="whiteAlpha.50" rounded="lg" borderWidth="1px" borderColor="whiteAlpha.200">
          <Heading size="md" color="cyan.400" mb={4}>関連業種</Heading>
          <RichTextContent html={capability.detail03 || ""} />
        </Box>
        <Box p={6} bg="whiteAlpha.50" rounded="lg" borderWidth="1px" borderColor="whiteAlpha.200">
          <Heading size="md" color="cyan.400" mb={4}>関連職種</Heading>
          <RichTextContent html={capability.detail04 || ""} />
        </Box>
        <Box p={6} bg="whiteAlpha.50" rounded="lg" borderWidth="1px" borderColor="whiteAlpha.200">
          <Heading size="md" color="cyan.400" mb={4}>解決できる課題</Heading>
          <RichTextContent html={capability.detail05 || ""} />
        </Box>
      </SimpleGrid>

      {/* 課題の詳細解説（1カラム） */}
      <Box p={6} bg="whiteAlpha.50" rounded="lg" borderWidth="1px" borderColor="whiteAlpha.200">
        <Heading size="md" color="cyan.400" mb={4}>課題の詳細解説</Heading>
        <RichTextContent html={capability.detail06 || ""} />
      </Box>

      {/* 活用と効果のセクション */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <Box p={6} bg="whiteAlpha.50" rounded="lg" borderWidth="1px" borderColor="whiteAlpha.200">
          <Heading size="md" color="cyan.400" mb={4}>活用シーン</Heading>
          <RichTextContent html={capability.detail07 || ""} />
        </Box>
        <Box p={6} bg="whiteAlpha.50" rounded="lg" borderWidth="1px" borderColor="whiteAlpha.200">
          <Heading size="md" color="cyan.400" mb={4}>期待できる効果</Heading>
          <RichTextContent html={capability.detail08 || ""} />
        </Box>
      </SimpleGrid>

      {/* ツールと導入のセクション */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <Box p={6} bg="whiteAlpha.50" rounded="lg" borderWidth="1px" borderColor="whiteAlpha.200">
          <Heading size="md" color="cyan.400" mb={4}>おすすめツール</Heading>
          <RichTextContent html={capability.detail09 || ""} />
        </Box>
        <Box p={6} bg="whiteAlpha.50" rounded="lg" borderWidth="1px" borderColor="whiteAlpha.200">
          <Heading size="md" color="cyan.400" mb={4}>導入ステップ</Heading>
          <RichTextContent html={capability.detail10 || ""} />
        </Box>
      </SimpleGrid>

      {/* 注意点と検討項目のセクション */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <Box p={6} bg="whiteAlpha.50" rounded="lg" borderWidth="1px" borderColor="whiteAlpha.200">
          <Heading size="md" color="cyan.400" mb={4}>注意点・制限事項</Heading>
          <RichTextContent html={capability.detail11 || ""} />
        </Box>
        <Box p={6} bg="whiteAlpha.50" rounded="lg" borderWidth="1px" borderColor="whiteAlpha.200">
          <Heading size="md" color="cyan.400" mb={4}>主要検討項目</Heading>
          <RichTextContent html={capability.detail12 || ""} />
        </Box>
      </SimpleGrid>

      {/* まとめのセクション */}
      <Box p={6} bg="whiteAlpha.50" rounded="lg" borderWidth="1px" borderColor="whiteAlpha.200">
        <Heading size="md" color="cyan.400" mb={4}>まとめ</Heading>
        <RichTextContent html={capability.detail13 || ""} />
      </Box>
    </VStack>
  );
};

// メインコンポーネント
export default function ToolDetail() {
  const { id } = useParams();
  const [capability, setCapability] = useState<AICapability | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCapability = async () => {
      if (id) {
        try {
          setIsLoading(true);
          const data = await getCapabilityById(id);
          setCapability(data);
        } catch (err) {
          console.error('Error fetching capability:', err);
          setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchCapability();
  }, [id]);

  if (isLoading) return <Box p={4}>読み込み中...</Box>;
  if (error) return <Box p={4}>エラー: {error}</Box>;
  if (!capability) return <Box p={4}>データが見つかりません</Box>;

  return (
    <ChakraProvider theme={theme}>
      <Container maxW="1200px" py={12}>
        {/* ヘッダー */}
        <Box mb={16} textAlign="center">
          <Heading 
            size="2xl"
            mb={6}
            bgGradient="linear(to-r, cyan.400, blue.500)"
            bgClip="text"
          >
            {capability.title}
          </Heading>

          {/* カテゴリ */}
          <Wrap spacing={2} mb={4} justify="center">
            {capability.category?.map((cat) => (
              <WrapItem key={cat}>
                <Tag 
                  size="md"
                  bg="rgba(255, 146, 3, 0.7)"
                  color="white"
                  fontWeight="bold"
                >
                  {cat}
                </Tag>
              </WrapItem>
            ))}
          </Wrap>

          {/* 使用AI */}
          <Wrap spacing={2} mb={6} justify="center">
            {capability.technologies?.map((tech) => (
              <WrapItem key={tech}>
                <Tag 
                  size="md"
                  bg="rgba(0, 184, 212, 0.15)"
                  color="cyan.300"
                  fontWeight="medium"
                >
                  {tech}
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        </Box>

        {/* 詳細コンテンツ */}
        <DetailContent capability={capability} />
      </Container>
    </ChakraProvider>
  );
} 