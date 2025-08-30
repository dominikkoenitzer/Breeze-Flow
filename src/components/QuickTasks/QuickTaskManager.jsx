import React, { useState, useEffect } from 'react';
import {
  VStack,
  HStack,
  Box,
  Text,
  IconButton,
  Input,
  useToast,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Checkbox,
  useColorModeValue,
  Collapse,
  Flex,
  Tooltip,
  Progress,
  Heading,
  Divider,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react';
import {
  FaPlus,
  FaEllipsisV,
  FaClock,
  FaTag,
  FaBell,
  FaTrash,
  FaEdit,
  FaCheck,
  FaRegClock,
  FaFilter,
  FaSort,
} from 'react-icons/fa';
import { api } from '../../services/api';

const QuickTaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, today, upcoming
  const [sort, setSort] = useState('dueDate'); // dueDate, priority, created
  const toast = useToast();

  const bgColor = useColorModeValue('lightMode.card', 'darkMode.card');
  const borderColor = useColorModeValue('lightMode.border', 'darkMode.border');
  const hoverBg = useColorModeValue('lightMode.hover', 'darkMode.hover');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await api.getTasks();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      toast({
        title: 'Error fetching tasks',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const task = {
        text: newTask,
        completed: false,
        priority: 'medium',
        dueDate: null,
        tags: [],
        created: new Date().toISOString(),
      };

      const savedTask = await api.createTask(task);
      setTasks([savedTask, ...tasks]);
      setNewTask('');
      toast({
        title: 'Task added',
        status: 'success',
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: 'Error adding task',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const toggleTask = async (id) => {
    try {
      const task = tasks.find((t) => t._id === id);
      const updatedTask = { ...task, completed: !task.completed };
      await api.updateTask(id, updatedTask);
      setTasks(tasks.map((t) => (t._id === id ? updatedTask : t)));
    } catch (error) {
      toast({
        title: 'Error updating task',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.deleteTask(id);
      setTasks(tasks.filter((t) => t._id !== id));
      toast({
        title: 'Task deleted',
        status: 'info',
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: 'Error deleting task',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const task = tasks.find((t) => t._id === id);
      const updatedTask = { ...task, ...updates };
      await api.updateTask(id, updatedTask);
      setTasks(tasks.map((t) => (t._id === id ? updatedTask : t)));
    } catch (error) {
      toast({
        title: 'Error updating task',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const getFilteredAndSortedTasks = () => {
    let filteredTasks = [...tasks];

    // Apply filters
    switch (filter) {
      case 'today':
        filteredTasks = filteredTasks.filter(
          (task) =>
            task.dueDate &&
            new Date(task.dueDate).toDateString() === new Date().toDateString()
        );
        break;
      case 'upcoming':
        filteredTasks = filteredTasks.filter(
          (task) =>
            task.dueDate && new Date(task.dueDate) > new Date()
        );
        break;
      default:
        break;
    }

    // Apply sorting
    switch (sort) {
      case 'dueDate':
        filteredTasks.sort((a, b) => {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        });
        break;
      case 'priority':
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        filteredTasks.sort(
          (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
        );
        break;
      case 'created':
        filteredTasks.sort(
          (a, b) => new Date(b.created) - new Date(a.created)
        );
        break;
      default:
        break;
    }

    return filteredTasks;
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const dueToday = tasks.filter(
      (t) =>
        t.dueDate &&
        new Date(t.dueDate).toDateString() === new Date().toDateString()
    ).length;

    return { total, completed, dueToday };
  };

  const stats = getTaskStats();
  const filteredTasks = getFilteredAndSortedTasks();

  return (
    <VStack spacing={6} width="100%" align="stretch">
      {/* Stats Section */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
        <Box p={4} bg={bgColor} borderRadius="lg" borderWidth="1px">
          <Stat>
            <StatLabel>Total Tasks</StatLabel>
            <StatNumber>{stats.total}</StatNumber>
            <Progress value={(stats.completed / stats.total) * 100} size="sm" colorScheme="green" mt={2} />
          </Stat>
        </Box>
        <Box p={4} bg={bgColor} borderRadius="lg" borderWidth="1px">
          <Stat>
            <StatLabel>Completed</StatLabel>
            <StatNumber>{stats.completed}</StatNumber>
            <StatHelpText>{((stats.completed / stats.total) * 100).toFixed(1)}% complete</StatHelpText>
          </Stat>
        </Box>
        <Box p={4} bg={bgColor} borderRadius="lg" borderWidth="1px">
          <Stat>
            <StatLabel>Due Today</StatLabel>
            <StatNumber>{stats.dueToday}</StatNumber>
            <StatHelpText>Tasks to focus on</StatHelpText>
          </Stat>
        </Box>
      </SimpleGrid>

      {/* Quick Add Form */}
      <form onSubmit={addTask}>
        <HStack>
          <Input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a quick task..."
            size="lg"
            bg={bgColor}
            _hover={{ bg: hoverBg }}
          />
          <Button
            leftIcon={<FaPlus />}
            colorScheme="brand"
            px={8}
            type="submit"
            size="lg"
          >
            Add
          </Button>
        </HStack>
      </form>

      {/* Filters and Sort */}
      <HStack spacing={4}>
        <Menu>
          <MenuButton as={Button} leftIcon={<FaFilter />} variant="ghost">
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setFilter('all')}>All Tasks</MenuItem>
            <MenuItem onClick={() => setFilter('today')}>Due Today</MenuItem>
            <MenuItem onClick={() => setFilter('upcoming')}>Upcoming</MenuItem>
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton as={Button} leftIcon={<FaSort />} variant="ghost">
            Sort By
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setSort('dueDate')}>Due Date</MenuItem>
            <MenuItem onClick={() => setSort('priority')}>Priority</MenuItem>
            <MenuItem onClick={() => setSort('created')}>Created Date</MenuItem>
          </MenuList>
        </Menu>
      </HStack>

      {/* Tasks List */}
      <VStack spacing={2} align="stretch">
        {loading ? (
          <Progress size="xs" isIndeterminate />
        ) : filteredTasks.length === 0 ? (
          <Text textAlign="center" color="gray.500">
            No tasks to show
          </Text>
        ) : (
          filteredTasks.map((task) => (
            <Box
              key={task._id}
              p={4}
              bg={bgColor}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
              _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
              transition="all 0.2s"
            >
              <HStack justify="space-between">
                <HStack flex={1}>
                  <Checkbox
                    isChecked={task.completed}
                    onChange={() => toggleTask(task._id)}
                    size="lg"
                    colorScheme="green"
                  />
                  <Text
                    textDecoration={task.completed ? 'line-through' : 'none'}
                    color={task.completed ? 'gray.500' : 'inherit'}
                  >
                    {task.text}
                  </Text>
                </HStack>

                <HStack spacing={2}>
                  {task.dueDate && (
                    <Tooltip label={new Date(task.dueDate).toLocaleDateString()}>
                      <Badge colorScheme="purple" variant="subtle">
                        <HStack spacing={1}>
                          <FaRegClock />
                          <Text>Due</Text>
                        </HStack>
                      </Badge>
                    </Tooltip>
                  )}
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<FaEllipsisV />}
                      variant="ghost"
                      size="sm"
                    />
                    <MenuList>
                      <MenuItem
                        icon={<FaEdit />}
                        onClick={() => {
                          // Implement edit functionality
                        }}
                      >
                        Edit
                      </MenuItem>
                      <MenuItem
                        icon={<FaBell />}
                        onClick={() => {
                          const tomorrow = new Date();
                          tomorrow.setDate(tomorrow.getDate() + 1);
                          updateTask(task._id, { dueDate: tomorrow.toISOString() });
                        }}
                      >
                        Remind Tomorrow
                      </MenuItem>
                      <MenuItem
                        icon={<FaTrash />}
                        onClick={() => deleteTask(task._id)}
                      >
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </HStack>
              </HStack>
            </Box>
          ))
        )}
      </VStack>
    </VStack>
  );
};

export default QuickTaskManager; 