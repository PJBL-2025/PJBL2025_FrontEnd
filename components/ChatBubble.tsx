import React from 'react';
import { View, Text } from 'react-native';

type Props = {
  message: string;
  time: string;
  isUser?: boolean; // tambahkan prop ini
};

const ChatBubble: React.FC<Props> = ({ message, time, isUser = false }) => {
  const bubbleBg = isUser ? 'bg-[#DCF8C6]' : 'bg-white'; // warna hijau muda seperti WhatsApp untuk user
  const textAlign = isUser ? 'items-end' : 'items-start';
  const tailStyle = isUser
    ? {
        right: -10,
        borderTopWidth: 20,
        borderTopColor: 'transparent',
        borderLeftWidth: 20,
        borderLeftColor: '#DCF8C6', // tail hijau
        bottom: 2,
      }
    : {
        left: -10,
        borderTopWidth: 20,
        borderTopColor: 'transparent',
        borderRightWidth: 20,
        borderRightColor: 'white', // tail putih
        bottom: 2,
      };

  return (
    <View className={`px-4 py-2 flex-row ${isUser ? 'justify-end' : ''}`}>
      <View className={`relative max-w-[280px] ${isUser ? 'mr-4' : 'ml-4'}`}>
        {/* Bubble */}
        <View className={`${bubbleBg} rounded-2xl px-4 py-3`}>
          <Text className="text-black leading-5">{message}</Text>
          <Text className="text-xs text-gray-400 text-right mt-2">{time}</Text>
        </View>

        {/* Tail */}
        <View
          className="absolute"
          style={{
            width: 0,
            height: 0,
            borderBottomWidth: 0,
            ...tailStyle,
          }}
        />
      </View>
    </View>
  );
};

export default ChatBubble;