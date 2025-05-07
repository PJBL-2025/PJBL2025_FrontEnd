import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import ChatBubble from 'components/ChatBubble';
import ChatInput from 'components/ChatInput';

export default function Messager() {
    const navigation = useNavigation();
    // const [messages, setMessages] = useState<{ message: string; time: string; isUser: boolean }[]>([]);
    const [messages, setMessages] = useState([
        
        {
        message:
            "Psst... Something fabulous just landed! 👀\nFresh, fun, and full of vibe—get it while it’s still hot!🔥🔥",
        time: '07.00 am',
        isUser: false,
        },
    ]);

    const [time, setTime] = useState('');

useEffect(() => {
  const updateClock = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    const formatter = new Intl.DateTimeFormat('en-GB', options);
    setTime(formatter.format(now));
  };

  updateClock();
  const interval = setInterval(updateClock, 1000);
  return () => clearInterval(interval);
}, []);

// ✅ Ini handleSend yang fix: ambil waktu saat user mengirim
const handleSend = (msg: string) => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  const formatter = new Intl.DateTimeFormat('en-GB', options);
  const currentTime = formatter.format(now);

  setMessages([...messages, { message: msg, time: currentTime, isUser: true }]);
};

    return (
        <LinearGradient
        colors={['#007AFF', '#D9EBFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="flex-1"
        >
        <SafeAreaView className="flex-1">
            <View className="relative flex-row items-center mt-2 mb-6 px-4 bg-white py-5">
            <View className="absolute left-4">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                <ChevronLeft size={24} color="#007AFF" />
                </TouchableOpacity>
            </View>
            <View className="flex-1 items-center">
                <Text className="text-[#007AFF] font-bold text-lg">Toko Sigma Asalole</Text>
            </View>
            </View>

            <ScrollView className="px-2">
            {messages.map((msg, index) => (
                <ChatBubble
                key={index}
                message={msg.message}
                time={msg.time}
                isUser={msg.isUser}
                />
            ))}
            </ScrollView>
            <ChatInput onSend={handleSend} />
        </SafeAreaView>
        </LinearGradient>
    );
}