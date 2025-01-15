import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useColorModeValue,
  Container,
  SimpleGrid,
  FormErrorMessage,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (isLogin) {
        await api.login({
          email: formData.email,
          password: formData.password,
        });
        toast({
          title: 'Welcome back!',
          status: 'success',
          duration: 3000,
        });
      } else {
        await api.signup({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        toast({
          title: 'Account created successfully!',
          description: 'Welcome to Breeze Flow',
          status: 'success',
          duration: 3000,
        });
      }
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'An error occurred',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  return (
    <Container maxW="container.xl" py={20}>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={16} alignItems="center">
        <Box>
          <Heading
            as="h1"
            size="2xl"
            mb={6}
            bgGradient="linear(to-r, brand.500, brand.600)"
            bgClip="text"
          >
            Breeze Flow
          </Heading>
          <Text fontSize="xl" color="gray.500" mb={8}>
            Your all-in-one productivity companion. Stay organized, focused, and
            balanced with our intuitive tools and features.
          </Text>
          <SimpleGrid columns={2} spacing={8}>
            <Feature
              title="Task Management"
              description="Organize and track your tasks efficiently"
            />
            <Feature
              title="Focus Timer"
              description="Stay productive with Pomodoro technique"
            />
            <Feature
              title="Daily Planner"
              description="Plan your day with visual timeline"
            />
            <Feature
              title="Wellness Tracking"
              description="Monitor your well-being journey"
            />
          </SimpleGrid>
        </Box>

        <Box
          p={8}
          bg={bgColor}
          borderWidth="1px"
          borderColor={borderColor}
          borderRadius="xl"
          shadow="xl"
        >
          <VStack spacing={6} as="form" onSubmit={handleSubmit}>
            <Heading size="lg">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </Heading>

            {!isLogin && (
              <FormControl isInvalid={errors.name}>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
            )}

            <FormControl isInvalid={errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
                <InputRightElement>
                  <IconButton
                    icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>

            {!isLogin && (
              <FormControl isInvalid={errors.confirmPassword}>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                  />
                  <InputRightElement>
                    <IconButton
                      icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
              </FormControl>
            )}

            <Button
              type="submit"
              colorScheme="brand"
              size="lg"
              width="100%"
              isLoading={isLoading}
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>

            <Button
              variant="ghost"
              onClick={() => setIsLogin(!isLogin)}
              isDisabled={isLoading}
            >
              {isLogin
                ? "Don't have an account? Sign Up"
                : 'Already have an account? Sign In'}
            </Button>
          </VStack>
        </Box>
      </SimpleGrid>
    </Container>
  );
};

const Feature = ({ title, description }) => {
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      transition="all 0.2s"
      _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
    >
      <Text fontWeight="bold" mb={2}>
        {title}
      </Text>
      <Text color="gray.500" fontSize="sm">
        {description}
      </Text>
    </Box>
  );
};

export default AuthPage; 