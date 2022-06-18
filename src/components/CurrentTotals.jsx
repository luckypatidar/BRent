import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode, useContext, useState, useEffect } from "react";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import {
  AiOutlineClockCircle,
  AiOutlineLogin,
  AiFillCloseCircle,
} from "react-icons/ai";

import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import PayForm from "./PayForm";
import AddToBalanceForm from "./AddToBalanceForm";
import { BlockchainContext } from "../context/BlockchainContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Countdown from "react-countdown";

function StatsCard(props) {
  const { title, stat, icon, bgColor, seconds, minutes, time } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
      backgroundColor={bgColor}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {time ? `${minutes}: ${seconds}` : stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.800", "gray.200")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function CurrentTotals() {
  const { renterBalance, due, duration, renter } =
    useContext(BlockchainContext);

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hour, setHour] = useState(0);
  var timer;

  function timeDifference(date1,date2) {
      var difference = date1.getTime() - date2;
  
      var daysDifference = Math.floor(difference/1000/60/60/24);
      difference -= daysDifference*1000*60*60*24
  
      var hoursDifference = Math.floor(difference/1000/60/60);
      difference -= hoursDifference*1000*60*60
  
      var minutesDifference = Math.floor(difference/1000/60);
      difference -= minutesDifference*1000*60
  
      var secondsDifference = Math.floor(difference/1000);
  
      // console.log('difference = ' + 
      //   daysDifference + ' day/s ' + 
      //   hoursDifference + ' hour/s ' + 
      //   minutesDifference + ' minute/s ' + 
      //   secondsDifference + ' second/s ');
      setMinutes(minutesDifference);
      setSeconds(secondsDifference);
      setHour(hoursDifference);
  }
  useEffect(() => {
    if(renter?.start){
        timer = setInterval(() => {
          timeDifference(new Date(),getTimeStamp(renter?.start));
        }, 1000);
        return () => clearInterval(timer);
    }
  });

  


  console.log(duration);
  const getTimeStamp = (data) => {
    const numb = data?._hex;
    const yourNumber = parseInt(numb, 16);
    //    console.log(yourNumber*1000,Date.now())
    return yourNumber * 1000;
  };
//   console.log(getTimeStamp(renter?.start));
  return (
    <>
      <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1
          textAlign={"center"}
          fontSize={"4xl"}
          py={10}
          fontWeight={"bold"}
        >
          Welcome {renter?.firstName}! Here are your stats:
        </chakra.h1>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard
            title={"ETH Credit"}
            stat={renterBalance}
            icon={<MdOutlineAccountBalanceWallet size={"3em"} />}
          />
          <StatsCard
            title={"ETH Due"}
            stat={due}
            icon={<RiMoneyDollarCircleLine size={"3em"} />}
          />
          {/* <StatsCard
                    title={'Ride Minutes'}
                    stat={duration}
                    icon={<AiOutlineClockCircle size={'3em'}  />}
                    seconds={seconds} 
                    minutes={minutes}
                    time = {true}
                /> */}
          <Stat
            px={{ base: 2, md: 4 }}
            py={"5"}
            shadow={"xl"}
            border={"1px solid"}
            borderColor={useColorModeValue("gray.800", "gray.500")}
            rounded={"lg"}
            // backgroundColor={bgColor}
          >
            <Flex justifyContent={"space-between"}>
              <Box pl={{ base: 2, md: 4 }}>
                <StatLabel fontWeight={"medium"} isTruncated>
                  {'Ride Minutes'}
                </StatLabel>
                <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
                  {duration === 0 ? `${hour}:${minutes}: ${seconds}`: duration}
                </StatNumber>
              </Box>
              <Box
                my={"auto"}
                color={useColorModeValue("gray.800", "gray.200")}
                alignContent={"center"}
              >
                <AiOutlineClockCircle size={'3em'}  />
              </Box>
            </Flex>
          </Stat>
          <StatsCard
            title={"Bike Status"}
            bgColor={renter && renter.active ? "green" : "blue.300"}
            stat={renter?.canRent ? "Available" : "Not Available"}
            icon={
              renter?.canRent ? (
                <AiOutlineLogin size={"2em"} color="white" />
              ) : (
                <AiFillCloseCircle size={"2em"} color="red" />
              )
            }
          ></StatsCard>
        </SimpleGrid>
        <Flex justifyContent={"center"} alignItems={"center"}>
          <AddToBalanceForm />
          <PayForm />
        </Flex>
      </Box>
      <ToastContainer autoClose={3000} />
    </>
  );
}
