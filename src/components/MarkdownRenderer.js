import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Box,
  Text,
  Heading,
  List,
  ListItem,
  Link,
  Image,
} from '@chakra-ui/react';

const MarkdownRenderer = ({ markdownText }) => {
  const components = {
    p: ({ children }) => (
      <Text fontSize="md" mb={2}>
        {children}
      </Text>
    ),
    h1: ({ children }) => (
      <Heading as="h1" size="xl" my={4}>
        {children}
      </Heading>
    ),
    h2: ({ children }) => (
      <Heading as="h2" size="lg" my={4}>
        {children}
      </Heading>
    ),
    h3: ({ children }) => (
      <Heading as="h3" size="md" my={4}>
        {children}
      </Heading>
    ),
    h4: ({ children }) => (
      <Heading as="h4" size="sm" my={4}>
        {children}
      </Heading>
    ),
    h5: ({ children }) => (
      <Heading as="h5" size="xs" my={4}>
        {children}
      </Heading>
    ),
    h6: ({ children }) => (
      <Heading as="h6" size="xs" my={4}>
        {children}
      </Heading>
    ),
    ul: ({ children }) => (
      <List styleType="disc" ml={4} mb={2}>
        {children}
      </List>
    ),
    ol: ({ children }) => (
      <List styleType="decimal" ml={4} mb={2}>
        {children}
      </List>
    ),
    li: ({ children }) => (
      <ListItem fontSize="md" mb={1}>
        {children}
      </ListItem>
    ),
    a: ({ href, children }) => (
      <Link href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    ),
    img: ({ src, alt }) => <Image src={src} alt={alt} maxW="100%" my={4} />,
    blockquote: ({ children }) => (
      <Box
        borderLeft="4px solid gray"
        pl={4}
        py={2}
        my={4}
        bg="black"
        fontSize="lg"
      >
        {children}
      </Box>
    ),
    hr: () => <hr style={{ borderTop: '1px solid lightgray' }} />,
    code: ({ children }) => (
      <code style={{ backgroundColor: 'black', padding: '2px 4px' }}>
        {children}
      </code>
    ),
    table: ({ children }) => (
      <Box overflowX="auto" my={4}>
        <table>{children}</table>
      </Box>
    ),
    tr: ({ children }) => <tr>{children}</tr>,
    td: ({ children }) => (
      <td style={{ padding: '8px', border: '1px solid lightgray' }}>
        {children}
      </td>
    ),
    th: ({ children }) => (
      <th style={{ padding: '8px', border: '1px solid lightgray' }}>
        {children}
      </th>
    ),
  };

  return (
    <Box>
      <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
        {markdownText}
      </ReactMarkdown>
    </Box>
  );
};

export default MarkdownRenderer;
