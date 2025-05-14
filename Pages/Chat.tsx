import React, { useEffect, useState } from 'react';
import { Image, Text, ScrollView, Pressable, TextInput, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from "lucide-react-native";

export default function Chat() {
    const navigation = useNavigation();
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

    return (
        <LinearGradient
            colors={['#007AFF', '#D9EBFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            className="flex-1">
            <SafeAreaView className="flex-1">
                <ScrollView>
                    {/* Header */}
                    <View className="relative flex-row items-center justify-between mt-2 mb-6 px-4">
                        {/* KIRI */}
                        <View className="flex-row items-center space-x-2">
                            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                <ChevronLeft size={24} color="#FFFFFF" />
                            </TouchableOpacity>
                            <Text className="text-white font-base">Milea Cantik</Text>
                        </View>

                        {/* TENGAH */}
                        <View className="absolute left-0 right-0 items-center">
                            <Text className="text-white text-base font-semibold">Chat</Text>
                            <View className="w-[32px] h-[2px] bg-white mt-[-2px]" />
                        </View>

                        {/* KANAN */}
                        <View className="flex-row items-center space-x-2">
                            <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                                <Image source={require('../assets/icons/notif.png')} className="w-7 h-7" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                                <Image source={require('../assets/icons/cart.png')} className="w-7 h-7" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                                <Image source={require('../assets/images/Profile/profile-dummy.png')} className="w-[42px] h-[42px] rounded-full" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Chat Column */}
                    <View className='bg-white w-full h-screen rounded-t-[25px] px-5'>
                    <Pressable className="bg-white rounded-[20px] px-4 mb-5 mt-5 flex-row items-center border border-blue-500">
                        <Image
                        source={require('../assets/icons/search.png')}
                        className="w-5 h-5 mr-2"
                        resizeMode="contain"
                        />
                        <TextInput
                        // ref={inputRef}
                        placeholder="Search Something"
                        // value={search}
                        // onChangeText={setSearch}
                        // onSubmitEditing={handleSubmit}
                        returnKeyType="search"
                        className="flex-1"
                        />
                    </Pressable>
                        <TouchableOpacity className='relative mb-3' onPress={() => navigation.navigate('Messager')}>
                            <View className='border-black border rounded-xl flex flex-row justify-between p-3'>
                                <Image className='rounded-full w-14 h-14' source={require('../assets/images/profile-dummy-2.jpg')}/>
                                <View className='flex justify-center'>
                                    <Text className='font-bold text-base'>
                                        Username
                                    </Text>
                                    <Text numberOfLines={1} ellipsizeMode="tail" className="w-[281px] text-[#697078]">
                                        WOY KAMU SUDAH SAMPAI DIMANA NEGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                                    </Text>
                                </View>
                                <View>
                                </View>
                            </View>
                            <Text className="text-[#697078] text-sm font-bold absolute right-6 top-3">
                                {time}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='relative mb-3'>
                            <View className='border-black border rounded-xl flex flex-row justify-between p-3'>
                                <Image className='rounded-full w-14 h-14' source={require('../assets/images/profile-dummy-2.jpg')}/>
                                <View className='flex justify-center'>
                                    <Text className='font-bold text-base'>
                                        Username
                                    </Text>
                                    <Text numberOfLines={1} ellipsizeMode="tail" className="w-[281px] text-[#697078]">
                                        Aku sebenernya suka sama kamu
                                    </Text>
                                </View>
                                <View>
                                </View>
                            </View>
                            <Text className="text-[#697078] text-sm font-bold absolute right-6 top-3">
                                {time}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}
