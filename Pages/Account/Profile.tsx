import { useNavigation } from '@react-navigation/native';
import ProductCard from 'components/ProductCard';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, CircleHelp, Pencil } from "lucide-react-native";
import { Image, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
                    <View className="flex-row items-center justify-between mt-2 mb-6 px-4">
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                            <ChevronLeft size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                        <Text className='flex-1 text-center text-white text-lg font-semibold'>
                            Hello Username👋
                        </Text>
                        <TouchableOpacity onPress={() => Linking.openURL(`https://wa.me/${NomorHP}`)}>
                            <CircleHelp size={30} color="#FFFFFF"/>
                        </TouchableOpacity>
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
                        <Image source={require('assets/images/Profile/profile-dummy.png')} className='w-[75px] h-[76px] rounded-full ml-3'/>
                        <View className='ml-[26px]'>
                            <Text className='text-[23px] font-bold'>
                                Name
                            </Text>
                            <Text className='text-[15px] font-bold text-[#7f7f7fa4]'>
                                @username
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
                                <TouchableOpacity className='border-2 border-blue-500 rounded-xl p-2' onPress={() => navigation.navigate('Pending')}>
                                    <Image source={require('assets/images/not-yet-paid.png')} className='w-12 h-12'/>
                                </TouchableOpacity>
                                <Text className='pt-3'>Pending</Text>
                            </View>
                            <View className='flex items-center'>
                                <TouchableOpacity className='border-2 border-blue-500 rounded-xl p-2' onPress={() => navigation.navigate('OnDeliver')}>
                                    <Image source={require('assets/images/deliver-on-process.png')} className='w-12 h-12'/>
                                </TouchableOpacity>
                                <Text className='pt-3'>On Delivery</Text>
                            </View>
                            <View className='flex items-center'>
                                <TouchableOpacity className='border-2 border-blue-500 rounded-xl p-2' onPress={() => navigation.navigate('Sent')}>
                                    <Image source={require('assets/images/sent.png')} className='w-12 h-12'/>
                                </TouchableOpacity>
                                <Text className='pt-3'>Sent</Text>
                            </View>
                        </View>
                    </View>
                    <View className="bg-white px-4 pt-6 rounded-t-2xl">
                        <Text className='font-bold mb-5'>
                            Recomendation Products
                        </Text>
                        <View className="flex-row flex-wrap justify-between">
                            <ProductCard 
                            title="TMA-2 HD Wireless"
                            price={2000000}
                            reviews={86}
                            image={require('assets/images/headphone.png')}
                            />
                            <ProductCard 
                            title="TMA-2 HD Wireless"
                            price={1500000}
                            reviews={86}
                            image={require('assets/images/headphone.png')}
                            />
                            <ProductCard 
                            title="TMA-2 HD Wireless"
                            price={1800000}
                            reviews={86}
                            image={require('assets/images/headphone.png')}
                            />
                            <ProductCard 
                            title="TMA-2 HD Wireless"
                            price={2500000}
                            reviews={86}
                            image={require('assets/images/headphone.png')}
                            />
                            <ProductCard 
                            title="TMA-2 HD Wireless"
                            price={2000000}
                            reviews={86}
                            image={require('assets/images/headphone.png')}
                            />
                            <ProductCard 
                            title="TMA-2 HD Wireless"
                            price={1500000}
                            reviews={86}
                            image={require('assets/images/headphone.png')}
                            />
                            <ProductCard 
                            title="TMA-2 HD Wireless"
                            price={1800000}
                            reviews={86}
                            image={require('assets/images/headphone.png')}
                            />
                            <ProductCard 
                            title="TMA-2 HD Wireless"
                            price={2500000}
                            reviews={86}
                            image={require('assets/images/headphone.png')}
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}
