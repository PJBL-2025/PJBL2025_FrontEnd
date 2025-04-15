import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View , ScrollView, Linking} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Pencil, CircleHelp} from "lucide-react-native";

const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        }).format(price);
    };

    // PRODUCT CARD
    const ProductCard = ({
        title,
        price,
        reviews,
        image,
    }: {
        title: string;
        price: number;
        reviews: number;
        image: any;
    }) => (
    <TouchableOpacity
        className="w-[48%] bg-white rounded-2xl p-3 mb-4"
        style={{
            shadowColor: '#687582',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 30,
            elevation: 4,
        }}
        >
        <View className="w-full h-32 rounded-xl bg-white items-center justify-center overflow-hidden mb-3">
            <Image
            source={image}
            style={{ width: '100%', height: '100%' }}
            resizeMode="contain"
            />
        </View>
            <Text className="text-sm font-medium text-black mb-1">{title}</Text>
            <Text className="text-sm font-bold text-black">{formatRupiah(price)}</Text>
        <View className="flex-row items-center mt-1 space-x-1">
            <Image
            source={require('../assets/icons/star.png')}
            className="w-4 h-4"
            resizeMode="contain"
            />
            <Text className="text-xs text-gray-600">4.6</Text>
            <Text className="text-xs text-gray-400">( {reviews} Reviews )</Text>
        </View>
    </TouchableOpacity>
);

export default function Profile() {
    const navigation = useNavigation();
    const NomorHP = '62895635004580';

    return (
        <LinearGradient
        colors={['#007AFF', '#D9EBFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="flex-1"
        >
            <SafeAreaView className="flex-1">
                <ScrollView>
                    {/* Header */}
                    <View className="flex-row items-center mt-2 mb-6 px-4">
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                            <ChevronLeft size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                        <Text className="flex-1 text-center text-white font-semibold text-base">
                            Hello Username👋
                        </Text>
                        <View className="w-5" />
                    </View>

                    <View className='bg-white h-[95px] rounded-[15px] flex flex-row items-center mb-5 mx-4'
                        style={{
                            shadowColor: '#000000',
                            shadowOffset: { width: 0, height: 8 },
                            shadowOpacity: 1.0,
                            shadowRadius: 12,
                            elevation: 20,
                            borderRadius: 9999,
                        }}>
                        <Image source={require('../assets/images/profile-dummy.png')} className='w-[75px] h-[76px] rounded-full ml-3'/>
                        <View className='ml-[26px]'>
                            <Text className='text-[20px] font-bold'>
                                Milea Cantik
                            </Text>
                            <Text className='text-[12px] font-bold'>
                                082136412013
                            </Text>
                            <Text className='text-[10px] font-bold'>
                                mileapunyarifqi@gmail.com
                            </Text>
                        </View>
                        <TouchableOpacity className='flex absolute right-2' onPress={() => navigation.navigate('ProfileEdit')}>
                            <Pencil size={25} color="#000000"/>
                        </TouchableOpacity>
                    </View>
                    <View className='bg-white h-[169px] w-full p-2 mb-4'>
                            <Text className='text-[#697078] font-medium'>My Order</Text>
                        <View className='flex flex-row gap-x-8 justify-center p-3'>
                            <View className='flex items-center'>
                                <TouchableOpacity className='border-2 border-blue-500 rounded-xl p-2'>
                                    <Image source={require('../assets/images/not-yet-paid.png')} className='w-12 h-12'/>
                                </TouchableOpacity>
                                <Text className='pt-3'>Not Yet Paid</Text>
                            </View>
                            <View className='flex items-center'>
                                <TouchableOpacity className='border-2 border-blue-500 rounded-xl p-2'>
                                    <Image source={require('../assets/images/deliver-on-process.png')} className='w-12 h-12'/>
                                </TouchableOpacity>
                                <Text className='pt-3'>On Delivery</Text>
                            </View>
                            <View className='flex items-center'>
                                <TouchableOpacity className='border-2 border-blue-500 rounded-xl p-2'>
                                    <Image source={require('../assets/images/sent.png')} className='w-12 h-12'/>
                                </TouchableOpacity>
                                <Text className='pt-3'>Sent</Text>
                            </View>
                        </View>
                    </View>
                    <View className='bg-white h-[102px] p-2 mb-4'>
                            <Text className='text-[#697078] font-medium'>Help Center</Text>
                        <TouchableOpacity className='flex flex-row gap-x-2 items-center justify-center p-4' onPress={() => Linking.openURL(`https://wa.me/${NomorHP}`)}>
                            <CircleHelp size={30} color="#007AFFD9"/>
                            <Text className='font-medium text-[13px]'>Get any trouble?,<Text className='text-blue-500'>click here</Text> to get some help</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="bg-white px-4 pt-6 rounded-t-2xl">
                        <View className="flex-row flex-wrap justify-between">
                            <ProductCard 
                            title="TMA-2 HD Wireless"
                            price={2000000}
                            reviews={86}
                            image={require('../assets/images/headphone.png')}
                            />
                            <ProductCard 
                            title="TMA-2 HD Wireless"
                            price={1500000}
                            reviews={86}
                            image={require('../assets/images/headphone.png')}
                            />
                            <ProductCard 
                            title="TMA-2 HD Wireless"
                            price={1800000}
                            reviews={86}
                            image={require('../assets/images/headphone.png')}
                            />
                            <ProductCard 
                            title="TMA-2 HD Wireless"
                            price={2500000}
                            reviews={86}
                            image={require('../assets/images/headphone.png')}
                            />
                            <ProductCard 
                            title="TMA-2 HD Wireless"
                            price={2000000}
                            reviews={86}
                            image={require('../assets/images/headphone.png')}
                            />
                            <ProductCard 
                            title="TMA-2 HD Wireless"
                            price={1500000}
                            reviews={86}
                            image={require('../assets/images/headphone.png')}
                            />
                            <ProductCard 
                            title="TMA-2 HD Wireless"
                            price={1800000}
                            reviews={86}
                            image={require('../assets/images/headphone.png')}
                            />
                            <ProductCard 
                            title="TMA-2 HD Wireless"
                            price={2500000}
                            reviews={86}
                            image={require('../assets/images/headphone.png')}
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}
