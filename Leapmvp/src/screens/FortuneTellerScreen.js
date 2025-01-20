import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../hooks/useAuth';

const FortuneTellerScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const scrollViewRef = useRef();
  const { user } = useAuth();

  const fortuneTellerResponses = {
    love: [
      '桜が咲くころ、特別な出会いがありそうです',
      '今は自分を大切にする時期です',
      '既存の関係に新しい発見があるでしょう'
    ],
    career: [
      '新しい道が開かれようとしています',
      '努力が実を結ぶ時期です',
      '変化を恐れずに進むべき時です'
    ],
    health: [
      '規則正しい生活を心がけましょう',
      '運動を始めるのに良い時期です',
      'リラックスする時間を大切にしてください'
    ]
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      text: input,
      sender: 'user',
      timestamp: new Date().getTime()
    };

    const category = determineCategory(input.toLowerCase());
    const responses = fortuneTellerResponses[category];
    const botResponse = {
      text: responses[Math.floor(Math.random() * responses.length)],
      sender: 'bot',
      timestamp: new Date().getTime()
    };

    const newMessages = [...messages, userMessage, botResponse];
    setMessages(newMessages);
    setInput('');

    if (user) {
      await addDoc(collection(db, 'conversations'), {
        userId: user.uid,
        message: userMessage.text,
        response: botResponse.text,
        timestamp: new Date()
      });
    }
  };

  const determineCategory = (text) => {
    if (text.includes('love') || text.includes('relationship')) return 'love';
    if (text.includes('job') || text.includes('career')) return 'career';
    if (text.includes('health') || text.includes('wellness')) return 'health';
    return 'love'; // default category
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        style={styles.messagesContainer}
      >
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.message,
              message.sender === 'user' ? styles.userMessage : styles.botMessage
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <Input
          value={input}
          onChangeText={setInput}
          placeholder="Ask about your fortune..."
          containerStyle={styles.input}
        />
        <Button
          title="Send"
          onPress={handleSend}
          buttonStyle={styles.sendButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  message: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#D5517B',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#2D2D4A',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
  },
  sendButton: {
    backgroundColor: '#D5517B',
  },
});

export default FortuneTellerScreen; 