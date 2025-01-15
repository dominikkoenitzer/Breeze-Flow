import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  List,
  ListItem,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { createTest, getAllTests, updateTest, deleteTest } from '../../services/api';

function TestPage() {
  const [tests, setTests] = useState([]);
  const [testName, setTestName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const data = await getAllTests();
      setTests(data);
    } catch (error) {
      toast({
        title: 'Error fetching tests',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!testName.trim()) return;

    try {
      if (editingId) {
        await updateTest(editingId, { name: testName });
        toast({
          title: 'Test updated successfully',
          status: 'success',
          duration: 2000,
        });
        setEditingId(null);
      } else {
        await createTest({ name: testName });
        toast({
          title: 'Test created successfully',
          status: 'success',
          duration: 2000,
        });
      }
      setTestName('');
      fetchTests();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleEdit = (test) => {
    setTestName(test.name);
    setEditingId(test._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTest(id);
      toast({
        title: 'Test deleted successfully',
        status: 'success',
        duration: 2000,
      });
      fetchTests();
    } catch (error) {
      toast({
        title: 'Error deleting test',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <Box maxW="container.md" mx="auto" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading>MongoDB Test Interface</Heading>
        <Text>Create, read, update, and delete test documents in MongoDB.</Text>

        <form onSubmit={handleSubmit}>
          <HStack>
            <Input
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              placeholder="Enter test name"
            />
            <Button type="submit" colorScheme="blue">
              {editingId ? 'Update' : 'Create'}
            </Button>
          </HStack>
        </form>

        <List spacing={3}>
          {tests.map((test) => (
            <ListItem
              key={test._id}
              p={4}
              bg="white"
              shadow="md"
              borderRadius="md"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text>{test.name}</Text>
              <HStack>
                <IconButton
                  icon={<EditIcon />}
                  onClick={() => handleEdit(test)}
                  aria-label="Edit test"
                  size="sm"
                />
                <IconButton
                  icon={<DeleteIcon />}
                  onClick={() => handleDelete(test._id)}
                  aria-label="Delete test"
                  size="sm"
                  colorScheme="red"
                />
              </HStack>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Box>
  );
}

export default TestPage; 