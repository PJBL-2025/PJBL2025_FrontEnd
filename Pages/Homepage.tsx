import React, { useRef, useState } from 'react';
import { Animated, Image, ScrollView, Text, TextInput, TouchableOpacity, View, Keyboard, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Footer from '../components/Footer';
import { MoveRight } from 'lucide-react-native';

const getGreeting = () => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: false,
    timeZone: 'Asia/Jakarta',
  });

  const wibHour = parseInt(formatter.format(new Date()));

  if (wibHour >= 3 && wibHour < 10) {
    return 'Good Morning';
  } else if (wibHour >= 10 && wibHour < 15) {
    return 'Good Evening';
  } else if ((wibHour >= 18 && wibHour <= 23) || wibHour === 0) {
    return 'Good Night';
  } else {
    return 'Hello';
  }
};

// Category
const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'promo':
      return { source: require('../assets/icons/promo.png'), size: 70 };
    case 'clothes':
      return { source: require('../assets/icons/clothes.png'), size: 40 };
    case 'hat':
      return { source: require('../assets/icons/hat.png'), size: 60 };
    case 'pants':
      return { source: require('../assets/icons/pants.png'), size: 40 };
    case 'design':
      return { source: require('../assets/icons/design.png'), size: 40 };
    default:
      return { source: require('../assets/icons/promo.png'), size: 40 };
  }
};
const CategoryButton = ({ icon, label }: { icon: string; label: string }) => {
  const { source, size } = getCategoryIcon(icon);

  return (
    <TouchableOpacity className="items-center justify-center mx-2 self-center">
      <View className="w-16 h-16 bg-gray-100 rounded-full items-center justify-center mb-1">
        <Image 
          source={source}
          style={{ width: size, height: size }}
          resizeMode="contain"
        />
      </View>
      <Text className="text-xs text-white">{label}</Text>
    </TouchableOpacity>
  );
};

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

export default function Homepage() {
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.90,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate('Login');
    });
  };
  
  const inputRef = useRef<TextInput>(null);
  const [search, setSearch] = useState('');

  const handleSubmit = () => {
    if (search.trim() !== '') {
      Keyboard.dismiss();
      navigation.navigate('SearchResult', { keyword: search });
    }
  };
  
  return (
    <SafeAreaView className="flex-1 bg-blue-500">
      <ScrollView className="flex-1 bg-white">
        {/* Header */}
        <View className="p-4 bg-blue-500">
          <View className="flex-row justify-between items-center mb-4">
          <Text className="text-base text-white font-semibold">
            {getGreeting()}, John👋
          </Text>

            <View className="flex-row items-center space-x-3">
              <TouchableOpacity>
                <Image 
                  source={require('../assets/icons/chat.png')}
                  className="w-6 h-6"
                  resizeMode="contain"
                  tintColor="white"
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <Image 
                  source={require('../assets/icons/notif.png')}
                  className="w-6 h-6"
                  resizeMode="contain"
                  tintColor="white"
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <Image 
                  source={require('../assets/icons/cart.png')}
                  className="w-6 h-6"
                  resizeMode="contain"
                  tintColor="white"
                />
              </TouchableOpacity>

              <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <TouchableOpacity
                  onPress={handlePress}
                  className="bg-white border border-[#007AFF] rounded-2xl px-4 py-2 items-center shadow-md">
                  <Text className="text-[#007AFF] font-semibold text-base">Login</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
          
          {/* Search Bar */}
          <Pressable onPress={() => inputRef.current?.focus()} className="bg-white rounded-[10px] px-4 py-2 flex-row items-center">
            <Image
              source={require('../assets/icons/search.png')}
              className="w-5 h-5 mr-2"
              resizeMode="contain"
            />
            <TextInput
              ref={inputRef}
              placeholder="Search Something"
              value={search}
              onChangeText={setSearch}
              onSubmitEditing={handleSubmit}
              returnKeyType="search"
              className="flex-1"
            />
          </Pressable>
        </View>

        {/* Featured Banner */}
        <View className='bg-blue-500'>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="px-4 py-4"
        >
          <View className="w-64 h-32 bg-white rounded-xl px-4 py-3 mr-4 flex-row items-center justify-between">
          <View>
            <Text className="text-black text-base font-bold mb-2">
              TMA-2{'\n'}Modular{'\n'}Headphone
            </Text>
            <TouchableOpacity>
              <View className="flex-row items-center">
                <Text className="text-blue-500 font-medium text-base mr-1">Shop now</Text>
                <MoveRight size={15} color="#3B82F6" />
              </View>
            </TouchableOpacity>

          </View>
          
          <Image
            source={require('../assets/images/headphone.png')}
            style={{ width: 100, height: 200 }}
            resizeMode="contain"
          />
          </View>
          <View className="w-64 h-32 bg-white rounded-xl px-4 py-3 mr-4 flex-row items-center justify-between">
          <View>
            <Text className="text-black text-base font-bold mb-2">
              TMA-2{'\n'}Modular{'\n'}Headphone
            </Text>
            <TouchableOpacity>
              <View className="flex-row items-center">
                <Text className="text-blue-500 font-medium text-base mr-1">Shop now</Text>
                <MoveRight size={15} color="#3B82F6" />
              </View>
            </TouchableOpacity>
          </View>
          
          <Image
            source={require('../assets/images/headphone.png')}
            style={{ width: 100, height: 200 }}
            resizeMode="contain"
          />
          </View>
          <View className="w-64 h-32 bg-white rounded-xl px-4 py-3 mr-4 flex-row items-center justify-between">
          <View>
            <Text className="text-black text-base font-bold mb-2">
              TMA-2{'\n'}Modular{'\n'}Headphone
            </Text>
            <TouchableOpacity>
              <View className="flex-row items-center">
                <Text className="text-blue-500 font-medium text-base mr-1">Shop now</Text>
                <MoveRight size={15} color="#3B82F6" />
              </View>
            </TouchableOpacity>
          </View>
          
          <Image
            source={require('../assets/images/headphone.png')}
            style={{ width: 100, height: 200 }}
            resizeMode="contain"
          />
          </View>
        </ScrollView>

        {/* Categories */}
        <View className="flex-row justify-center items-center space-x-4 mb-4">
          <CategoryButton icon="promo" label="Promo" />
          <CategoryButton icon="clothes" label="Clothes" />
          <CategoryButton icon="hat" label="Hat" />
          <CategoryButton icon="pants" label="Pants" />
          <CategoryButton icon="design" label="Design" />
        </View>
        </View>

        {/* Featured Products */}
        <View className="bg-blue-500">
          <View className="bg-white px-4 pt-6 rounded-t-2xl">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="ml-4 text-lg font-bold">Featured Products</Text>
            <TouchableOpacity>
              <Text className="text-blue-500">See All</Text>
            </TouchableOpacity>
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
          </View>
          </View>
        </View>

      <View
      className="bg-white px-6 py-3 rounded-xl items-center justify-center m-8"
      style={{
        // iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        // Android shadow
        elevation: 4,
          }}
        >
        <Text className="text-black text-lg font-semibold">Clothes</Text>
      </View>

      {/* Scroll Content */}
      <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="px-4 py-4"
        >
          <View className="w-64 h-32 bg-white rounded-xl px-4 py-3 mr-4 flex-row items-center justify-between"
          style={{
            // iOS shadow
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            // Android shadow
            elevation: 4,
              }}
          >
          <View>
            <Text className="text-black text-base font-bold mb-2">
              TMA-2{'\n'}Modular{'\n'}Headphone
            </Text>
            <TouchableOpacity>
              <View className="flex-row items-center">
                <Text className="text-blue-500 font-medium text-base mr-1">Shop now</Text>
                <MoveRight size={15} color="#3B82F6" />
              </View>
            </TouchableOpacity>
          </View>
          
          <Image
            source={require('../assets/images/headphone.png')}
            style={{ width: 100, height: 200 }}
            resizeMode="contain"
          />
          </View>
          <View className="w-64 h-32 bg-white rounded-xl px-4 py-3 mr-4 flex-row items-center justify-between"
          style={{
            // iOS shadow
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            // Android shadow
            elevation: 4,
              }}
          >
          <View>
            <Text className="text-black text-base font-bold mb-2">
              TMA-2{'\n'}Modular{'\n'}Headphone
            </Text>
            <TouchableOpacity>
              <View className="flex-row items-center">
                <Text className="text-blue-500 font-medium text-base mr-1">Shop now</Text>
                <MoveRight size={15} color="#3B82F6" />
              </View>
            </TouchableOpacity>
          </View>
          
          <Image
            source={require('../assets/images/headphone.png')}
            style={{ width: 100, height: 200 }}
            resizeMode="contain"
          />
          </View>
          <View className="w-64 h-32 bg-white rounded-xl px-4 py-3 mr-4 flex-row items-center justify-between"
          style={{
            // iOS shadow
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            // Android shadow
            elevation: 4,
              }}
          >
          <View>
            <Text className="text-black text-base font-bold mb-2">
              TMA-2{'\n'}Modular{'\n'}Headphone
            </Text>
            <TouchableOpacity>
              <View className="flex-row items-center">
                <Text className="text-blue-500 font-medium text-base mr-1">Shop now</Text>
                <MoveRight size={15} color="#3B82F6" />
              </View>
            </TouchableOpacity>
          </View>
          
          <Image
            source={require('../assets/images/headphone.png')}
            style={{ width: 100, height: 200 }}
            resizeMode="contain"
          />
          </View>
        </ScrollView>
        
        <View>
          <View className="px-4 pt-6">
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
          </View>
          </View>
        </View>
      <Footer/>
      </ScrollView>
    </SafeAreaView>
  );
}