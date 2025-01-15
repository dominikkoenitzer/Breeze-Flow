import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useColorModeValue,
  SimpleGrid,
  Icon,
  useToast,
  Select,
  FormErrorMessage,
} from '@chakra-ui/react';
import {
  FaQuestionCircle,
  FaEnvelope,
  FaBook,
  FaLifeRing,
} from 'react-icons/fa';
import { api } from '../../services/api';

const SupportPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const validateForm = () => {
    const newErrors = {};
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.description) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await api.submitSupportTicket(formData);
      toast({
        title: 'Support ticket submitted',
        description: "We'll get back to you as soon as possible",
        status: 'success',
        duration: 5000,
      });
      setFormData({
        subject: '',
        category: '',
        description: '',
      });
    } catch (error) {
      toast({
        title: 'Error submitting ticket',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const faqItems = [
    {
      question: 'How do I get started with Breeze Flow?',
      answer:
        'Getting started is easy! First, create an account and log in. Then, explore our main features: Task Management, Focus Timer, Daily Planner, and Wellness Tracking. Each tool is designed to help you stay productive and organized.',
    },
    {
      question: 'Can I sync my data across devices?',
      answer:
        'Yes! Breeze Flow automatically syncs your data across all your devices when you are signed in to your account. This ensures you have access to your tasks, schedule, and progress wherever you go.',
    },
    {
      question: 'How does the Focus Timer work?',
      answer:
        'Our Focus Timer uses the Pomodoro Technique - work for 25 minutes, then take a 5-minute break. You can customize these intervals in the settings. The timer helps you maintain focus and take regular breaks for optimal productivity.',
    },
    {
      question: 'Is my data secure?',
      answer:
        'Yes, we take security seriously. All data is encrypted and stored securely. We use industry-standard security measures to protect your information and never share it with third parties.',
    },
    {
      question: 'How can I customize my notifications?',
      answer:
        'Go to Settings > Notifications to customize your preferences. You can choose which notifications you want to receive and how you want to receive them (email, push notifications, or both).',
    },
  ];

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center" mb={8}>
          <Heading size="2xl" mb={4}>
            How can we help?
          </Heading>
          <Text fontSize="xl" color="gray.500">
            Find answers or reach out to our support team
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mb={12}>
          <SupportCard
            icon={FaQuestionCircle}
            title="FAQ"
            description="Find quick answers to common questions"
          />
          <SupportCard
            icon={FaBook}
            title="Documentation"
            description="Detailed guides and tutorials"
          />
          <SupportCard
            icon={FaLifeRing}
            title="Live Support"
            description="Get help from our support team"
          />
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
          {/* FAQ Section */}
          <Box>
            <Heading size="lg" mb={6}>
              Frequently Asked Questions
            </Heading>
            <Accordion allowMultiple>
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  border="1px"
                  borderColor={borderColor}
                  borderRadius="lg"
                  mb={4}
                >
                  <h2>
                    <AccordionButton
                      _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
                      borderRadius="lg"
                      p={4}
                    >
                      <Box flex="1" textAlign="left" fontWeight="medium">
                        {item.question}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} px={4}>
                    {item.answer}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Box>

          {/* Support Ticket Form */}
          <Box
            p={8}
            bg={bgColor}
            borderRadius="xl"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <VStack spacing={6} as="form" onSubmit={handleSubmit}>
              <Heading size="lg" mb={2}>
                Submit a Support Ticket
              </Heading>
              <Text color="gray.500" mb={6}>
                Cannot find what you are looking for? Send us a message.
              </Text>

              <FormControl isInvalid={errors.subject}>
                <FormLabel>Subject</FormLabel>
                <Input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Brief description of your issue"
                />
                <FormErrorMessage>{errors.subject}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.category}>
                <FormLabel>Category</FormLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Select a category"
                >
                  <option value="technical">Technical Issue</option>
                  <option value="account">Account Related</option>
                  <option value="feature">Feature Request</option>
                  <option value="billing">Billing</option>
                  <option value="other">Other</option>
                </Select>
                <FormErrorMessage>{errors.category}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.description}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Please provide as much detail as possible"
                  minH="150px"
                />
                <FormErrorMessage>{errors.description}</FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                colorScheme="brand"
                size="lg"
                width="100%"
                isLoading={isSubmitting}
                leftIcon={<FaEnvelope />}
              >
                Submit Ticket
              </Button>
            </VStack>
          </Box>
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

const SupportCard = ({ icon, title, description }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      p={6}
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="xl"
      textAlign="center"
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-4px)',
        shadow: 'xl',
      }}
    >
      <Icon as={icon} boxSize={8} color="brand.500" mb={4} />
      <Heading size="md" mb={2}>
        {title}
      </Heading>
      <Text color="gray.500">{description}</Text>
    </Box>
  );
};

export default SupportPage; 