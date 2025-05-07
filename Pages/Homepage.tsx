import React, { useRef, useState } from 'react';
import { Animated, Image, ScrollView, Text, TextInput, TouchableOpacity, View, Keyboard, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Footer from '../components/Footer';
import ProductCard from 'components/ProductCard';
import CategoryButton from 'components/CategoryButton';
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

  const handleCategoryPress = (category: string) => {
    navigation.navigate("Category",{category})
  }
  
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
              <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                <Image 
                  source={require('../assets/icons/chat.png')}
                  className="w-6 h-6"
                  resizeMode="contain"
                  tintColor="white"
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                <Image 
                  source={require('../assets/icons/notif.png')}
                  className="w-6 h-6"
                  resizeMode="contain"
                  tintColor="white"
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Cart')}>

                
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
            <Text className="ml-1 text-lg font-bold">New Arrivals</Text>
            <TouchableOpacity onPress={() => handleCategoryPress("New Arrivals")}>
              <Text className="mr-1 text-blue-500">See All</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row flex-wrap justify-between">
            
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
          <View className="bg-white px-4 pt-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="ml-1 text-lg font-bold">Best Seller</Text>
            <TouchableOpacity onPress={() => handleCategoryPress("Best Seller")}>
              <Text className="mr-1 text-blue-500">See All</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row flex-wrap justify-between">
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