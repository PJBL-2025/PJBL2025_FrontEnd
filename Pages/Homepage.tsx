import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
      <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center mb-1">
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
    <Text className="text-sm font-bold">{formatRupiah(price)}</Text>
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
                <Image 
                  source={require('../assets/icons/chat.png')}
                  className="w-6 h-6"
                  resizeMode="contain"
                  tintColor="white"
                />
              </TouchableOpacity>
              <TouchableOpacity className="mr-4">
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
            </View>
          </View>
          
          {/* Search Bar */}
          <View className="bg-white rounded-full px-4 py-2 flex-row items-center">
            <Image 
              source={require('../assets/icons/search.png')}
              className="w-5 h-5 mr-2"
              resizeMode="contain"
            />
            <TextInput 
              placeholder="Search Something"
              className="flex-1"
            />
          </View>
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
              <Text className="text-white font-medium">
              <Text className="text-blue-500">Shop now→</Text>
              </Text>
            </TouchableOpacity>
          </View>
          
          <Image
            source={require('../assets/images/headphone.png')}
            style={{ width: 100, height: 200 }}
            resizeMode="contain"
          />
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
          contentContainerStyle={{ alignItems: 'center'}}
        >
          <CategoryButton icon="promo" label="Promo" />
          <CategoryButton icon="clothes" label="Clothes" />
          <CategoryButton icon="hat" label="Hat" />
          <CategoryButton icon="pants" label="Pants" />
          <CategoryButton icon="design" label="Design" />
        </ScrollView>
        </View>

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
              price={2000000}
              reviews={86}
            />
            <ProductCard 
              title="TMA-2 HD Wireless"
              price={1500000}
              reviews={86}
            />
            <ProductCard 
              title="TMA-2 HD Wireless"
              price={1800000}
              reviews={86}
            />
            <ProductCard 
              title="TMA-2 HD Wireless"
              price={2500000}
              reviews={86}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}