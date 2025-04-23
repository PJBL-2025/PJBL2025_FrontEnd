import React, { useEffect, useState } from 'react';
import { Image, Text, ScrollView, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from "lucide-react-native";

export default function Notification() {
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
                            <Text className="text-white text-base font-semibold">Notification</Text>
                            <View className="w-[85px] h-[2px] bg-white mt-[-2px]" />
                        </View>

                        {/* KANAN */}
                        <View className="flex-row items-center space-x-2">
                            <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                                <Image source={require('../assets/icons/chat.png')} className="w-[30px] h-[30px]" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                                <Image source={require('../assets/icons/cart.png')} className="w-[30px] h-[30px]" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                                <Image source={require('../assets/images/profile-dummy.png')} className="w-[42px] h-[42px] rounded-full" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Chat Column */}
                    <View className='bg-white w-full h-screen rounded-t-[25px] px-5 pt-4'>
                        <View className='mt-5'>
                            <Text className='text-black font-medium text-sm mb-4'>
                                Update Patch
                            </Text>
                            <TouchableOpacity className='border border-black rounded-xl py-4 flex justify-start px-3'>
                                <Text numberOfLines={1} ellipsizeMode="tail" className="w-[350px] text-[#697078]">
                                    Whats new on our application??🧐🧐🧐🧐🧐, we have a new feature WAYAAWWWWWWawpapwkapwkapw
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View className='mt-5'>
                            <Text className='text-black font-medium text-sm mb-4'>
                                Order
                            </Text>
                            <TouchableOpacity className='border border-black rounded-xl py-4 flex justify-start px-3'>
                                <Text numberOfLines={1} ellipsizeMode="tail" className="w-[350px] text-[#697078]">
                                    Your dream items are already in your cart, waiting for you😍😍..
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View className='mt-5'>
                            <Text className='text-black font-medium text-sm mb-4'>
                                Order
                            </Text>
                            <TouchableOpacity className='border border-black rounded-xl py-4 flex justify-start px-3'>
                                <Text numberOfLines={1} ellipsizeMode="tail" className="w-[350px] text-[#697078]">
                                    Aku adalah sigma dan sigma adalah aku
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}
