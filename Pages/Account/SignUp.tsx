import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from "lucide-react-native";

export default function SignUp() {
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
                        Sign Up
                    </Text>
                    <View className="w-5" />
                </View>

                {/* Form */}
                <View className="flex-1 justify-center">
                    <View className="bg-white p-6 rounded-3xl">

                        <Text className="text-gray-500 mb-4">
                            Create an account to get started
                        </Text>

                        {/* Username */}
                        <Text className="font-bold mb-1">Username</Text>
                        <TextInput
                            placeholder="Username"
                            className="border border-gray-300 px-4 py-2 rounded-md mb-4"
                        />

                        {/* Email */}
                        <Text className="font-bold mb-1">Email</Text>
                        <TextInput
                            placeholder="Email"
                            keyboardType="email-address"
                            className="border border-gray-300 px-4 py-2 rounded-md mb-4"
                        />

                        {/* Password */}
                        <Text className="font-bold mb-1">Password</Text>
                        <View className="flex-row items-center border border-gray-300 px-2 rounded-md">
                            <TextInput
                                placeholder="Password 8 karakter"
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
                        <Text className="text-gray-400 ml-2 mt-1 mb-8">
                            We recommend a strong password
                        </Text>

                        {/* Submit Button */}
                        <TouchableOpacity className="bg-[#007AFF] py-3 rounded-xl items-center mb-4" onPress={() => navigation.navigate('Login')}>
                            <Text className="text-white font-semibold">Sign Up</Text>
                        </TouchableOpacity>

                        {/* Navigation to Login */}
                        <View className="flex-row justify-center">
                            <Text className="text-gray-500">Sudah punya akun? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text className="text-[#007AFF] font-semibold">Log In</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

            </SafeAreaView>
        </LinearGradient>
    );
}