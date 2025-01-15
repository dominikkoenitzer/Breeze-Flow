import React, { useState } from 'react';
import {
  VStack,
  HStack,
  Box,
  Text,
  IconButton,
  Input,
  Checkbox,
  useToast,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react';
import { FaTrash, FaEdit, FaEllipsisV, FaClock, FaTag } from 'react-icons/fa';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const toast = useToast();

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: newTask,
        completed: false,
        priority: 'medium',
        dueDate: null,
        tags: [],
      },
    ]);
    setNewTask('');
    toast({
      title: 'Task added',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast({
      title: 'Task deleted',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const updateTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
    setEditingId(null);
  };

  const setPriority = (id, priority) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, priority } : task
      )
    );
  };

  const setDueDate = (id, dueDate) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, dueDate } : task
      )
    );
  };

  const addTag = (id, tag) => {
    setTasks(
      tasks.map((task) =>
        task.id === id && !task.tags.includes(tag)
          ? { ...task, tags: [...task.tags, tag] }
          : task
      )
    );
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'green',
      medium: 'yellow',
      high: 'red',
    };
    return colors[priority] || 'gray';
  };

  return (
    <VStack spacing={4} width="100%" align="stretch">
      <form onSubmit={addTask}>
        <HStack>
          <Input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            size="lg"
          />
          <Button colorScheme="blue" px={8} type="submit">
            Add
          </Button>
        </HStack>
      </form>

      <VStack spacing={2} align="stretch">
        {tasks.map((task) => (
          <Box
            key={task.id}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            borderColor={task.completed ? 'gray.200' : 'blue.200'}
            bg={task.completed ? 'gray.50' : 'white'}
            _hover={{ shadow: 'md' }}
            transition="all 0.2s"
          >
            <HStack justify="space-between">
              <HStack flex={1}>
                <Checkbox
                  isChecked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  size="lg"
                />
                {editingId === task.id ? (
                  <Input
                    defaultValue={task.text}
                    onBlur={(e) => updateTask(task.id, e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        updateTask(task.id, e.target.value);
                      }
                    }}
                    autoFocus
                  />
                ) : (
                  <Text
                    textDecoration={task.completed ? 'line-through' : 'none'}
                    color={task.completed ? 'gray.500' : 'black'}
                  >
                    {task.text}
                  </Text>
                )}
              </HStack>

              <HStack spacing={2}>
                {task.dueDate && (
                  <Badge colorScheme="purple" variant="subtle">
                    <HStack spacing={1}>
                      <FaClock />
                      <Text>{new Date(task.dueDate).toLocaleDateString()}</Text>
                    </HStack>
                  </Badge>
                )}
                <Badge colorScheme={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
                {task.tags.map((tag) => (
                  <Badge key={tag} colorScheme="cyan" variant="subtle">
                    <HStack spacing={1}>
                      <FaTag />
                      <Text>{tag}</Text>
                    </HStack>
                  </Badge>
                ))}
                <Menu>
                  <MenuButton
                    as={IconButton}
                    icon={<FaEllipsisV />}
                    variant="ghost"
                    size="sm"
                  />
                  <MenuList>
                    <MenuItem onClick={() => setEditingId(task.id)}>
                      <HStack>
                        <FaEdit />
                        <Text>Edit</Text>
                      </HStack>
                    </MenuItem>
                    <MenuItem onClick={() => deleteTask(task.id)}>
                      <HStack>
                        <FaTrash />
                        <Text>Delete</Text>
                      </HStack>
                    </MenuItem>
                    <MenuItem onClick={() => setPriority(task.id, 'high')}>
                      Set High Priority
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        setDueDate(task.id, new Date().toISOString())
                      }
                    >
                      Set Due Date
                    </MenuItem>
                    <MenuItem onClick={() => addTag(task.id, 'important')}>
                      Add Tag
                    </MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </VStack>
  );
};

export default TaskList; 