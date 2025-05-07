import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import Footer from 'components/Footer';
import ProductCard from 'components/ProductCard';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, CircleHelp } from "lucide-react-native";
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export default function Category() {
    const route = useRoute();
    const { category } = route.params as { category: string };
    const navigation = useNavigation();

    return (
        <LinearGradient
        colors={['#007AFF', '#D9EBFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="flex-1"
        >
            <SafeAreaView className="flex-1 relative">
                <ScrollView>
                    {/* Header */}
                    <View className="absolute translate-x-1/2 ">
                        <Image source={require('../assets/images/CategoryHeader.png')} className='w-[400px]'/>
                    </View>
                    <View className="flex-row items-center justify-between mt-2 mb-6 px-4">
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                            <ChevronLeft size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                            <CircleHelp size={30} color="#FFFFFF"/>
                        </TouchableOpacity>
                    </View>

                    <View className="bg-white px-4 pt-6 rounded-t-2xl mt-44">
                        <View className="flex flex-row justify-between items-center align-middle mb-8">
                                <Text className="text-black font-bold text-base">Sort By</Text>
                            <View>
                                <Text className='rounded-full px-3 py-1 bg-blue-500 text-base text-white'>{capitalize(category)}</Text>
                            </View>
                        </View>
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
                    <Footer/>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}


// export default function Category() {

//   return (
//     <LinearGradient
//             colors={['#007AFF', '#D9EBFF']}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 0, y: 1 }}
//             className="flex-1 px-4">
//         <SafeAreaView className="flex-1">
//         <View className="flex-row items-center mt-2 mb-6">
//                     <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//                         <ChevronLeft size={24} color="#FFFFFF" />
//                     </TouchableOpacity>
//                     <Text className="flex-1 text-center text-white font-semibold text-base">
//                         Log In
//                     </Text>
//                     <View className="w-5" />
//                 </View>
//             
//         </SafeAreaView>
//     </LinearGradient>
//   );
// }