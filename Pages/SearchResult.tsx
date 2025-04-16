import React, { useState, useEffect } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeft } from "lucide-react-native";

export default function SearchResult() {
    const navigation = useNavigation();

    const route = useRoute();
    const { keyword } = route.params;

    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        if (keyword) {
        setSearchInput(keyword);
        }
    }, [keyword]);

    return (
        <LinearGradient
            colors={['#007AFF', '#D9EBFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            className="flex-1 px-4"
        >
            <SafeAreaView className="flex-1">
                {/* Header */}
                <View className="flex-row justify-between items-center mt-2 mb-6">
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <ChevronLeft size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <View className="bg-white rounded-[10px] px-4 py-2 flex-row items-center w-72">
                        <Image
                        source={require('../assets/icons/search.png')}
                        className="w-5 h-5 mr-2"
                        resizeMode="contain"
                        />
                        <TextInput
                            placeholder="Search Something"
                            value={searchInput} // ← tampilkan keyword di input
                            onChangeText={setSearchInput}
                            className="flex-1"
                        />
                    </View>
                    <View className="w-5" /> 
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}
