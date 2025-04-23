import { useNavigation } from "@react-navigation/native";
import { ChevronLeft, ShoppingCart, X } from "lucide-react-native"
import { useState } from "react";
import { Text, TouchableOpacity, View, Image, ScrollView, Modal, Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

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

interface CartItem {
    id: string;
    product: Product;
    quantity: number;
    selectedColor: string;
}

const mockCartItems: CartItem[] = [
    {
        id: '1',
        product: {
            id: '1',
            name: 'TMA-2 HD Wireless',
            description: 'High-quality wireless headphones',
            price: 2000000,
            image: require('../assets/images/headphone.png'),
            colors: ['Black', 'White'],
            rating: 4.7,
            reviewCount: 911,
            seller: {
                name: 'John Doe',
                avatar: require('../assets/favicon.png')
            }
        },
        quantity: 1,
        selectedColor: 'Black'
    },
    {
        id: '2',
        product: {
            id: '2',
            name: 'TMA-2 HD Wireless',
            description: 'High-quality wireless headphones',
            price: 2000000,
            image: require('../assets/images/headphone.png'),
            colors: ['Black', 'White'],
            rating: 4.7,
            reviewCount: 911,
            seller: {
                name: 'John Doe',
                avatar: require('../assets/favicon.png')
            }
        },
        quantity: 2,
        selectedColor: 'White'
    }
];

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price);
};

export default function CartProduct() {
    const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
    const navigation = useNavigation();

    const removeFromCart = (itemId: string) => {
        setCartItems(prev => prev.filter(item => item.id !== itemId));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    };

    return (
        <SafeAreaView className="flex-1 bg-blue-500">
            {/* Header */}
            <View className="flex-row items-center mt-2 mb-6 p-4">
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <ChevronLeft size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text className="flex-1 text-center text-white font-semibold text-base">Cart</Text>
                <View className="w-6" />
            </View>

            {/* Content */}
            <ScrollView className="flex-1 bg-white rounded-t-3xl">
                <View className="p-4">
                    {cartItems.length === 0 ? (
                        <View className="items-center justify-center py-8">
                            <ShoppingCart size={48} color="#D1D5DB" />
                            <Text className="text-gray-500 mt-4">Your cart is empty</Text>
                        </View>
                    ) : (
                        <>
                            {cartItems.map((item) => (
                                <View key={item.id} className="flex-row items-center mb-4 p-3 bg-gray-50 rounded-xl">
                                    <Image
                                        source={item.product.image}
                                        className="w-20 h-20 rounded-lg"
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
                        </>
                    )}
                </View>
            </ScrollView>

            {/* Bottom Checkout Section */}
            {cartItems.length > 0 && (
                <View className="bg-white p-4 border-t border-gray-200">
                    <View className="flex-row justify-between mb-4">
                        <Text className="text-lg font-semibold">Total</Text>
                        <Text className="text-lg font-bold">{formatPrice(calculateTotal())}</Text>
                    </View>
                    <TouchableOpacity
                        className="bg-blue-500 rounded-xl py-3"
                        onPress={() => {
                            // Handle checkout
                            alert('Proceeding to checkout...');
                        }}
                    >
                        <Text className="text-center text-white font-semibold">Checkout</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}