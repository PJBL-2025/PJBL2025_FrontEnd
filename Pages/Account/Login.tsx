import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from "lucide-react-native";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(prev => !prev);
    const navigation = useNavigation();

    return (
        <LinearGradient
            colors={['#007AFF', '#D9EBFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            className="flex-1 px-4"
        >
            <SafeAreaView className="flex-1">
                {/* Header */}
                <View className="flex-row items-center mt-2">
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <ChevronLeft size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text className="flex-1 text-center text-white font-semibold text-base">
                        Log In
                    </Text>
                    <View className="w-5" />
                </View>

                {/* Form Section */}
                <View className="flex-1 justify-center">
                    <View className="bg-white p-6 rounded-3xl">
                        <Text className="text-gray-500 mb-4">Login to Access our features</Text>

                        {/* Email */}
                        <Text className="font-bold mb-1">Email</Text>
                        <TextInput
                            placeholder="Email"
                            keyboardType="email-address"
                            className="border border-gray-300 px-4 py-2 rounded-md mb-4"
                        />

                        {/* Password */}
                        <Text className="font-bold mb-1">Password</Text>
                        <View className="flex-row items-center border border-gray-300 px-2 rounded-md mb-12">
                            <TextInput
                                placeholder="Password 8 Karakter"
                                secureTextEntry={!showPassword}
                                className="flex-1 py-2 px-2"
                            />
                            <TouchableOpacity onPress={togglePasswordVisibility}>
                                <Image
                                    source={
                                        showPassword
                                            ? require('assets/icons/open-eye.png')
                                            : require('assets/icons/close-eye.png')
                                    }
                                    className="w-5 h-5"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Button */}
                        <TouchableOpacity className="bg-[#007AFF] py-3 rounded-xl items-center mb-4" onPress={() => navigation.navigate('Profile')}>
                            <Text className="text-white font-semibold">Next</Text>
                        </TouchableOpacity>

                        {/* Sign Up Text */}
                        <View className="flex-row justify-center">
                            <Text className="text-gray-500">Belum punya akun? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                                <Text className="text-[#007AFF] font-semibold">SignUp</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}
