import { Picker } from '@react-native-picker/picker';
import { View, Text, ScrollView, Image, Pressable, TouchableOpacity, Modal, FlatList } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ChevronLeft, X, ShoppingCart } from "lucide-react-native";
import { useNavigation } from '@react-navigation/native';


interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: any;
  colors: string[];
  rating: number;
  reviewCount: number;
  seller: {
    name: string;
    avatar: any;
  };
}


interface Review {
    id: string;
    user: {
        name: string;
        avatar: any;
    };
    rating: number;
    comment: string;
    date: string;
}

interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor: string;
}

const mockProduct: Product = {
    id: '1',
    name: 'TMA-2 HD Wireless',
    description: 'facilisis consectetur orci tincidunt Morbi hendrerit placerat risus tincidunt sodales.',
    price: 150000,
    image: require('../assets/images/headphone.png'),
    colors: ['Black', 'White', 'Red', 'Blue', 'Green'],
    rating: 4.7,
    reviewCount: 911,
    seller: {
        name: 'John Doe',
        avatar: require('../assets/favicon.png')
    }
};

const mockReviews: Review[] = [
    {
        id: '1',
        user: {
            name: 'Sarah Johnson',
            avatar: require('../assets/favicon.png'),
        },
        rating: 5,
        comment: 'The sound quality is amazing! Very comfortable to wear for long periods. Definitely worth the price.',
        date: '2 days ago',
    },
    {
        id: '2',
        user: {
            name: 'Michael Chen',
            avatar: require('../assets/favicon.png'),
        },
        rating: 4,
        comment: 'Great headphones overall. Battery life is impressive, but the bass could be a bit stronger.',
        date: '1 week ago',
    },
    {
        id: '3',
        user: {
            name: 'Emma Wilson',
            avatar: require('../assets/favicon.png'),
        },
        rating: 5,
        comment: 'Perfect for my daily commute. Noise cancellation works really well. Love the design!',
        date: '2 weeks ago',
    },{
        id: '4',
        user: {
            name: 'Emma Wilson',
            avatar: require('../assets/favicon.png'),
        },
        rating: 5,
        comment: 'Perfect for my daily commute. Noise cancellation works really well. Love the design!',
        date: '2 weeks ago',
    },
];

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };
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
      <Text className="text-sm font-bold text-black">{formatPrice(price)}</Text>
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

export default function DetailsProduct({ route }: { route: any }) {
  const [product, setProduct] = useState<Product>(mockProduct);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [colorModalVisible, setColorModalVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [checkoutModalVisible, setCheckoutModalVisible] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartModalVisible, setCartModalVisible] = useState(false);
  const reviewsPerPage = 3;

  const selectColor = (item: string) => {
    setSelectedColor(item);
    setColorModalVisible(false);
  };

  const handleQuantityChange = (value: string) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      setQuantity(numValue);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const renderStars = (rating: number) => {
    return (
      <View className="flex-row">
        {[1, 2, 3, 4, 5].map((star) => (
          <Image
            key={star}
            source={require('../assets/icons/star.png')}
            className="w-4 h-4"
            style={{ tintColor: star <= rating ? '#FFD700' : '#D1D5DB' }}
          />
        ))}
      </View>
    );
  };

  const paginatedReviews = reviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const navigation = useNavigation();

  const addToCart = () => {
    if (!selectedColor) {
      alert('Please select a color first');
      return;
    }

    const newCartItem: CartItem = {
      id: Date.now().toString(),
      product,
      quantity,
      selectedColor,
    };

    setCartItems(prev => [...prev, newCartItem]);
    alert('Product added to cart!');
  };

  const buyNow = () => {
    if (!selectedColor) {
      alert('Please select a color first');
      return;
    }

    addToCart();
    setCheckoutModalVisible(true);
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="flex-1 bg-blue-500">
        {/* Header */}
        <View className="flex-row items-center mt-2 mb-6 p-4">
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <ChevronLeft size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text className="flex-1 text-center text-white font-semibold text-base">Detail Product</Text>
            <TouchableOpacity 
                onPress={() => setCartModalVisible(true)}
                className="relative"
            >
                <ShoppingCart size={24} color="#FFFFFF" />
                {cartItems.length > 0 && (
                    <View className="absolute -top-1  bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                        <Text className="text-white text-xs">{cartItems.length}</Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView className="flex-1">
          <View className='flex bg-white p-4 rounded-md'>
            <View className='flex-row'>
              <View className='mr-4 flex items-center'>
                <Image source={product.image} className="w-[150px] h-[150px]" />
              </View>
              <View className='flex-1 gap-y-4'>
                <Text className='text-[14px]'>{product.description}</Text>
                <Text className='text-[14px] font-semibold'>{formatPrice(product.price)}</Text>
                <TouchableOpacity className='flex flex-row my-4 items-center'>
                  <Image source={product.seller.avatar} className='w-[24px] h-[24px] mr-2 rounded-xl shadow-lg'/>
                  <Text className='text-[12px]'>{product.seller.name}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex-row space-x-4">
              {/* Color Selection */}
              <TouchableOpacity
                className="border border-gray-300 px-4 py-3 rounded-xl bg-white flex-1"
                onPress={() => setColorModalVisible(true)}
              >
                <Text className="text-base text-gray-700">
                  {selectedColor ?? 'Select Color'}
                </Text>
              </TouchableOpacity>

              <Modal
                transparent
                animationType="fade"
                visible={colorModalVisible}
                onRequestClose={() => setColorModalVisible(false)}
              >
                <Pressable
                  className="flex-1 justify-center bg-black/30 px-10"
                  onPress={() => setColorModalVisible(false)}
                >
                  <View className="bg-white rounded-2xl py-2 px-4">
                    <FlatList
                      data={product.colors}
                      keyExtractor={(item) => item}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          className="py-3 border-b border-gray-100"
                          onPress={() => selectColor(item)}
                        >
                          <Text className="text-base text-gray-800">
                            {item}
                          </Text>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </Pressable>
              </Modal>

              {/* Quantity Selection */}
              <View className="flex-row items-center border border-gray-300 rounded-xl bg-white flex-1">
                <TouchableOpacity
                  className="px-4 py-3"
                  onPress={decrementQuantity}
                >
                  <Text className="text-xl text-gray-700">-</Text>
                </TouchableOpacity>
                <TextInput
                  className="flex-1 text-center text-base text-gray-700"
                  value={quantity.toString()}
                  onChangeText={handleQuantityChange}
                  keyboardType="numeric"
                  maxLength={2}
                />
                <TouchableOpacity
                  className="px-4 py-3"
                  onPress={incrementQuantity}
                >
                  <Text className="text-xl text-gray-700">+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className=' flex flex-row space-x-4 items-center align-middle'>
              <TouchableOpacity>
                <View className='border border-gray-300 px-2 py-2 rounded-xl bg-white w-[100px] flex-row space-x-1 mt-4 items-center'>
                  <Image source={require("../assets/icons/star.png")}/>
                  <Text>{product.rating}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleFavorite}>
                <View className='border border-gray-300 px-2 py-2 rounded-xl bg-white w-[100px] flex-row space-x-1 mt-4 items-center'>
                  <Image 
                    source={require("../assets/icons/love.png")} 
                    className='w-[16px] h-[16px]'
                    style={{ tintColor: isFavorite ? 'red' : 'gray' }}
                  />
                  <Text>{product.rating}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text className='text-[12px]'>{product.reviewCount} Reviews</Text>
              </TouchableOpacity>
            </View>
            <View className='flex space-y-4 my-8'>
                <View className='h-[1px] w-full bg-gray-300'/>
                <Text className='text-[16px] font-semibold'>
                    Description
                </Text>
                <View>
                  <Text 
                    className={`text-gray-600 ${!isDescriptionExpanded ? 'line-clamp-2' : ''}`}
                    numberOfLines={isDescriptionExpanded ? undefined : 2}
                  >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor quas deserunt 
                    adipisci modi molestias odit provident pariatur, rerum error. Tempora, 
                    quae eum? Ratione veniam quasi quia! Id qui accusamus error.
                    {'\n'}
                    {'\n'}
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor quas deserunt 
                    adipisci modi molestias odit provident pariatur, rerum error. Tempora, 
                    quae eum? Ratione veniam quasi quia! Id qui accusamus error.
                  </Text>
                  <TouchableOpacity onPress={toggleDescription}>
                    <Text className="text-blue-500 mt-2">
                      {isDescriptionExpanded ? 'See Less' : 'See More'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className='h-[1px] w-full bg-gray-300'/>
                <Text className='text-[16px] font-semibold'>
                    Review
                </Text>
                <View className="space-y-6">
                  {paginatedReviews.map((review) => (
                    <View key={review.id} className="space-y-2">
                      <View className="flex-row items-center space-x-3">
                        <Image
                          source={review.user.avatar}
                          className="w-10 h-10 rounded-full"
                        />
                        <View className="flex-1">
                          <Text className="font-semibold">{review.user.name}</Text>
                          <View className="flex-row items-center space-x-2">
                            {renderStars(review.rating)}
                            <Text className="text-gray-500 text-xs">{review.date}</Text>
                          </View>
                        </View>
                      </View>
                      <Text className="text-gray-600">{review.comment}</Text>
                    </View>
                  ))}
                </View>
                <View className="flex-row justify-center items-center space-x-4 mt-4">
                  <TouchableOpacity
                    onPress={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <Text className={`text-base ${currentPage === 1 ? 'text-gray-400' : 'text-blue-500'}`}>
                      Previous
                    </Text>
                  </TouchableOpacity>
                  <Text className="text-base">
                    Page {currentPage} of {totalPages}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    <Text className={`text-base ${currentPage === totalPages ? 'text-gray-400' : 'text-blue-500'}`}>
                      Next
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className='h-[1px] w-full bg-gray-300'/>

                {/* Product content */}
                <Text className='text-[16px] font-semibold'>
                    Description
                </Text>
                <View className="flex-row flex-wrap justify-between">
                    <ProductCard 
                    title="TMA-2 HD Wireless"
                    price={2000000}
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
                    price={2000000}
                    reviews={86}
                    image={require('../assets/images/headphone.png')}
                    />
                    <ProductCard 
                    title="TMA-2 HD Wireless"
                    price={2000000}
                    reviews={86}
                    image={require('../assets/images/headphone.png')}
                    />
                </View>
            </View>

 
          </View>
      </ScrollView>

        {/* Bottom Fixed Buttons */}
        <View className="flex-row p-4 bg-white border-t border-gray-200">
          <TouchableOpacity
            className="flex-1 bg-gray-200 rounded-xl py-3 mr-2"
            onPress={addToCart}
          >
            <Text className="text-center font-semibold">Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 bg-blue-500 rounded-xl py-3 ml-2"
            onPress={buyNow}
          >
            <Text className="text-center text-white font-semibold">Buy Now</Text>
          </TouchableOpacity>
        </View>

        {/* Cart Modal */}
        <Modal
          visible={cartModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setCartModalVisible(false)}
        >
          <View className="flex-1 bg-black/50 justify-end">
            <View className="bg-white rounded-t-3xl p-6">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-xl font-bold">Shopping Cart</Text>
                <TouchableOpacity onPress={() => setCartModalVisible(false)}>
                  <X size={24} color="#000" />
                </TouchableOpacity>
              </View>

              {cartItems.length === 0 ? (
                <View className="items-center justify-center py-8">
                  <ShoppingCart size={48} color="#D1D5DB" />
                  <Text className="text-gray-500 mt-4">Your cart is empty</Text>
                </View>
              ) : (
                <>
                  <ScrollView className="max-h-96">
                    {cartItems.map((item) => (
                      <View key={item.id} className="flex-row items-center mb-4 p-2 bg-gray-50 rounded-xl">
                        <Image
                          source={item.product.image}
                          className="w-16 h-16 rounded-lg"
                        />
                        <View className="flex-1 ml-3">
                          <Text className="font-semibold">{item.product.name}</Text>
                          <Text className="text-gray-500">Color: {item.selectedColor}</Text>
                          <Text className="text-gray-500">Qty: {item.quantity}</Text>
                          <Text className="font-semibold">{formatPrice(item.product.price * item.quantity)}</Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => removeFromCart(item.id)}
                          className="p-2"
                        >
                          <X size={20} color="#FF0000" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </ScrollView>

                  <View className="border-t border-gray-200 pt-4 mt-4">
                    <View className="flex-row justify-between mb-4">
                      <Text className="text-lg font-semibold">Total</Text>
                      <Text className="text-lg font-bold">{formatPrice(calculateTotal())}</Text>
                    </View>
                    <TouchableOpacity
                      className="bg-blue-500 rounded-xl py-3"
                      onPress={() => {
                        setCartModalVisible(false);
                        setCheckoutModalVisible(true);
                      }}
                    >
                      <Text className="text-center text-white font-semibold">Checkout</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </Modal>

        {/* Checkout Modal */}
        <Modal
          visible={checkoutModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setCheckoutModalVisible(false)}
        >
          <View className="flex-1 bg-black/50 justify-end">
            <View className="bg-white rounded-t-3xl p-6">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-xl font-bold">Checkout</Text>
                <TouchableOpacity onPress={() => setCheckoutModalVisible(false)}>
                  <X size={24} color="#000" />
                </TouchableOpacity>
              </View>

              <ScrollView className="max-h-96">
                {cartItems.map((item) => (
                  <View key={item.id} className="flex-row items-center mb-4 p-2 bg-gray-50 rounded-xl">
                    <Image
                      source={item.product.image}
                      className="w-16 h-16 rounded-lg"
                    />
                    <View className="flex-1 ml-3">
                      <Text className="font-semibold">{item.product.name}</Text>
                      <Text className="text-gray-500">Color: {item.selectedColor}</Text>
                      <Text className="text-gray-500">Qty: {item.quantity}</Text>
                      <Text className="font-semibold">{formatPrice(item.product.price * item.quantity)}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => removeFromCart(item.id)}
                      className="p-2"
                    >
                      <X size={20} color="#FF0000" />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>

              <View className="border-t border-gray-200 pt-4 mt-4">
                <View className="flex-row justify-between mb-4">
                  <Text className="text-lg font-semibold">Total</Text>
                  <Text className="text-lg font-bold">{formatPrice(calculateTotal())}</Text>
                </View>
                <TouchableOpacity
                  className="bg-blue-500 rounded-xl py-3"
                  onPress={() => {
                    // Handle payment
                    alert('Proceeding to payment...');
                    setCheckoutModalVisible(false);
                  }}
                >
                  <Text className="text-center text-white font-semibold">Proceed to Payment</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
} 