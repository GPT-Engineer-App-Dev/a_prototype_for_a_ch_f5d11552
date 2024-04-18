import React, { useState } from "react";
import { Box, VStack, HStack, Heading, Text, Textarea, Button, Image, IconButton, Select, Checkbox, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, useDisclosure } from "@chakra-ui/react";
import { FaPaperclip, FaCog, FaDownload, FaPrint } from "react-icons/fa";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [avatar, setAvatar] = useState("https://images.unsplash.com/photo-1527430253228-e93688616381?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxmcmllbmRseSUyMHJvYm90JTIwYXZhdGFyfGVufDB8fHx8MTcxMzQwOTIwM3ww&ixlib=rb-4.0.3&q=80&w=1080");
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSendMessage = () => {
    if (inputText.trim() !== "") {
      setMessages([...messages, { text: inputText, sender: "user" }]);
      setInputText("");
      // TODO: Send message to ChatGPT-4 API and add response to messages
    }
  };

  return (
    <Box p={4}>
      <HStack align="start" spacing={4}>
        <VStack align="start" w="70%">
          <Heading size="xl">ChatGPT-4</Heading>
          <Box borderWidth={1} borderRadius="md" h="400px" w="100%" p={4} overflowY="scroll">
            {messages.map((msg, index) => (
              <Text key={index} mb={2}>
                {msg.sender === "user" ? "You: " : "ChatGPT-4: "}
                {msg.text}
              </Text>
            ))}
          </Box>
          <HStack w="100%">
            <Textarea value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Type your message..." size="sm" />
            <IconButton icon={<FaPaperclip />} aria-label="Attach file" onClick={onOpen} />
            <Button onClick={handleSendMessage} colorScheme="blue">
              Send
            </Button>
          </HStack>
        </VStack>
        <VStack align="start" w="30%">
          <Box borderWidth={1} borderRadius="md" p={4}>
            <Image src={avatar} alt="Avatar" w="150px" h="150px" mb={4} />
            <input type="file" accept="image/*" onChange={(e) => setAvatar(URL.createObjectURL(e.target.files[0]))} />
            <Checkbox isChecked={voiceEnabled} onChange={(e) => setVoiceEnabled(e.target.checked)}>
              Enable voice
            </Checkbox>
          </Box>
          <Box borderWidth={1} borderRadius="md" p={4} w="100%">
            <Heading size="md" mb={2}>
              Chat History
            </Heading>
            <Select placeholder="Select format">
              <option value="docx">.docx</option>
              <option value="pdf">.pdf</option>
              <option value="txt">.txt</option>
              <option value="csv">.csv</option>
            </Select>
            <HStack mt={2}>
              <IconButton icon={<FaDownload />} aria-label="Download chat" />
              <IconButton icon={<FaPrint />} aria-label="Print chat" />
            </HStack>
          </Box>
          <IconButton icon={<FaCog />} aria-label="Settings" onClick={onOpen} />
        </VStack>
      </HStack>

      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Settings</DrawerHeader>
          <DrawerBody>{/* TODO: Add custom bot interaction preferences */}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Index;
