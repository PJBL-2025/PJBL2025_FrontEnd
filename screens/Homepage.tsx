import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CategoryButton = ({ icon, label }: { icon: string; label: string }) => (
  <TouchableOpacity className="items-center mx-2">
    <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center mb-1">
      <Text className="text-2xl">{icon}</Text>
    </View>
    <Text className="text-xs text-gray-600">{label}</Text>
  </TouchableOpacity>
);

const ProductCard = ({ title, price, reviews }: { 
  title: string; 
  price: number; 
  reviews: number;
}) => (
  <TouchableOpacity className="w-[48%] bg-white rounded-xl p-3 mb-4 shadow-sm">
    <View className="w-full h-32 bg-gray-100 rounded-lg mb-2 items-center justify-center">
      <Text className="text-gray-400">Product Image</Text>
    </View>
    <Text className="text-sm font-medium mb-1">{title}</Text>
    <Text className="text-sm font-bold">USD {price}</Text>
    <View className="flex-row items-center mt-1">
      <Text className="text-yellow-500">★</Text>
      <Text className="text-xs text-gray-600 ml-1">4.8</Text>
      <Text className="text-xs text-gray-400 ml-1">({reviews} Reviews)</Text>
    </View>
  </TouchableOpacity>
);

export default function Homepage() {
  return (
    <SafeAreaView className="flex-1 bg-blue-500">
      <ScrollView className="flex-1 bg-white">
        {/* Header */}
        <View className="p-4 bg-blue-500">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg text-white font-semibold">Good Morning John !! 👋</Text>
            <View className="flex-row">
              <TouchableOpacity className="mr-4">
                <Text className="text-white text-xl">💬</Text>
              </TouchableOpacity>
              <TouchableOpacity className="mr-4">
                <Text className="text-white text-xl">🔔</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text className="text-white text-xl">🛒</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Search Bar */}
          <View className="bg-white rounded-full px-4 py-2 flex-row items-center">
            <Text className="text-gray-400 mr-2">🔍</Text>
            <TextInput 
              placeholder="Search Something"
              className="flex-1"
            />
          </View>
        </View>

        {/* Featured Banner */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="px-4 py-4"
        >
          <View className="w-64 h-32 bg-gray-100 rounded-xl p-4 mr-4">
            <Text className="text-lg font-bold mb-1">TMA-2 Modular Headphone</Text>
            <TouchableOpacity>
              <Text className="text-blue-500">Shop now →</Text>
            </TouchableOpacity>
          </View>
          <View className="w-64 h-32 bg-gray-100 rounded-xl p-4 mr-4">
            <Text className="text-lg font-bold mb-1">TMA-2 Modular Headphone</Text>
            <TouchableOpacity>
              <Text className="text-blue-500">Shop now →</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="px-4 mb-4"
        >
          <CategoryButton icon="🏷️" label="Promo" />
          <CategoryButton icon="👕" label="Clothes" />
          <CategoryButton icon="🧢" label="Hat" />
          <CategoryButton icon="👖" label="Pants" />
          <CategoryButton icon="🎨" label="Design" />
        </ScrollView>

        {/* Featured Products */}
        <View className="px-4 pb-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold">Featured Products</Text>
            <TouchableOpacity>
              <Text className="text-blue-500">See All</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row flex-wrap justify-between">
            <ProductCard 
              title="TMA-2 HD Wireless"
              price={350}
              reviews={86}
            />
            <ProductCard 
              title="TMA-2 HD Wireless"
              price={350}
              reviews={86}
            />
            <ProductCard 
              title="TMA-2 HD Wireless"
              price={350}
              reviews={86}
            />
            <ProductCard 
              title="TMA-2 HD Wireless"
              price={350}
              reviews={86}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 