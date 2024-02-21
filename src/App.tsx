import {
  ChakraProvider,
  Flex,
  Box,
  Input,
  Button,
  extendTheme,
  Text,
  Image,
  useMediaQuery
} from "@chakra-ui/react";
import image1 from './assets/image1.jpeg';
import image2 from './assets/image2.webp';
import image3 from './assets/image3.jpeg';
import logo from './assets/morph.jpeg';
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyB-rNLUa0mwMavrWs6erc9hNTg6sc11110",
  authDomain: "morph-83184.firebaseapp.com",
  projectId: "morph-83184",
  storageBucket: "morph-83184.appspot.com",
  messagingSenderId: "88787333686",
  appId: "1:88787333686:web:04721354d44533ab82de97",
  measurementId: "G-80C3YNK095"
};



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
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)"); // [true, false]
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const handleSave = async () => {
    try {
      const colRef = collection(db, 'contacts');
      await addDoc(colRef, {
        email: email,
        number: phoneNumber,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

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
          w={isLargerThan768 ? "600px" : "none"}
          backgroundColor={'rgba(255, 255, 255, 0.6)'}
        >
          <Flex justifyContent={'center'} mb={5}>
            <Image src={logo} width={'100px'} borderRadius={100} />
          </Flex>
          <Text color={'black'} fontSize={'lg'} fontWeight={'500'}>Enter your Number</Text>
          <Input
            value={phoneNumber}
            mb={4}
            size={'lg'}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }} />
          <Text color={'black'} fontSize={'lg'} fontWeight={'500'}>Enter your Email</Text>
          <Input
            value={email}
            mb={4}
            size={'lg'}
            onChange={(e) => {
              setEmail(e.target.value);
            }} />
          <Flex justifyContent={'center'} mt={5}>
            <Button colorScheme="blue" w={200} onClick={handleSave}>Morph Today</Button>
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
            backgroundPosition={isLargerThan768 ? 'none' : 'center'}
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




