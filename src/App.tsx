import {
  ChakraProvider,
  Flex,
  Box,
  Input,
  Button,
  Heading,
  extendTheme,
  Text,
  Image
} from "@chakra-ui/react";
import image1 from './assets/image1.jpeg';
import image2 from './assets/image2.webp';
import image3 from './assets/image3.jpeg';
import logo from './assets/morph.jpeg';
import { useEffect, useState } from "react";

const images = [
  image1,
  image2,
  image3
];

const theme = extendTheme({
  fonts: {
    body: 'Roboto, sans-serif',
    heading: 'Roboto, serif',
  },
  fontSizes: {
    sm: '12px',
    md: '16px',
    lg: '20px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '40px',
    '4xl': '48px',
    '5xl': '64px',
    '6xl': '72px',
  },
});


export const App = () => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    const timeOut = setTimeout(() => {
      setIsVisible(true)
    }, 1000);

    return () => {
      clearTimeout(timeOut);
      clearInterval(interval);
    }
  }, []);

  const FormBox = () => {
    return (
      <Flex
        alignItems="center"
        h="100vh"
        zIndex={100}
        opacity={isVisible ? 1 : 0}
        transition="opacity 5s ease-in-out"
      >
        <Box
          p={8}
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          w="600px"
          backgroundColor={'rgba(255, 255, 255, 0.6)'}
        >
          <Flex justifyContent={'center'} mb={5}>
            <Image src={logo} width={'100px'} borderRadius={100} />
          </Flex>
          <Text color={'black'} fontSize={'lg'} fontWeight={'500'}>Enter your number</Text>
          <Input mb={4} size={'lg'} />
          <Text color={'black'} fontSize={'lg'} fontWeight={'500'}>Enter your email</Text>
          <Input mb={4} size={'lg'} />
          <Flex justifyContent={'center'} mt={5}>
            <Button colorScheme="blue" w={200} >Submit</Button>
          </Flex>
        </Box>
      </Flex>
    );
  }

  return (
    <ChakraProvider theme={theme}>
      <Flex
        h={'100vh'}
        w={'100vw'}
        position="relative"
        justifyContent={'center'}
      >
        {images.map((imageUrl, index) => (
          <Box
            key={index}
            position="absolute"
            top={0}
            left={0}
            w="100%"
            h="100%"
            backgroundImage={`url(${imageUrl})`}
            backgroundSize="cover"
            opacity={currentImageIndex === index ? 1 : 0}
            transition="opacity 1s ease-in-out"
            backdropFilter={'grayscale(0.5)'}
            style={{ filter: 'grayscale(100%) blur(1px)' }} // Apply grayscale filter
          />

        ))}
        {isVisible && <FormBox />}
      </Flex>
    </ChakraProvider>
  )
}




