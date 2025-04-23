import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

type Props = {
  onSend: (msg: string) => void;
};

const ChatInput: React.FC<Props> = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() !== '') {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <View className="flex-row items-center bg-white px-4 py-2 border-t border-gray-200">
      <TextInput
        className="flex-1 px-3 py-2 bg-gray-100 rounded-full text-black"
        value={input}
        onChangeText={setInput}
        placeholder="Ketik pesan..."
      />
      <TouchableOpacity onPress={handleSend} className="ml-2">
        <Text className="text-[#007AFF] font-semibold">Kirim</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatInput;