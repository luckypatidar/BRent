import { Button, Box, Image, Text, Stack,Container } from "@chakra-ui/react";
import { useContext } from "react";
import { BlockchainContext } from "../context/BlockchainContext";

const Bike = ({ bike }) => {
  const { checkOut, checkIn } = useContext(BlockchainContext);
  return (
    <Box boxSize="sm" mx={2} bgColor={'rgba(230,230,230,1)'} height={"26em"} borderRadius={10}>
      <Image src={bike} mb={1} borderTopRadius={10} />
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. 
      </Text>
      <Container
       direction={"row"}
        align={"center"}
      >
      <Stack
        // spacing={0}
        direction={"row"}
        align={"center"}
        justify={"space-between"}
        maxWidth={"70%"}
        mt={3}
      >
        <Button
          onClick={checkOut}
        //   m={2}
          fontSize={"sm"}
          fontWeight={600}
          bg={"blue.500"}
          color={"white"}
          _hover={{
            bg: "blue.600",
          }}
        >
          Check Out
        </Button>
        <Button
          onClick={checkIn}
        //   m={2}
          fontSize={"sm"}
          fontWeight={600}
          color={"white"}
          bg={"blue.500"}
          _hover={{
            bg: "blue.600",
          }}
        >
          Check In
        </Button>
      </Stack>
      </Container>
    </Box>
  );
};

export default Bike;
