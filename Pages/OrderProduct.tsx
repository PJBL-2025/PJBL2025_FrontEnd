import { useNavigation } from "@react-navigation/native";
import { ChevronLeft, ShoppingCart } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductPreview from "../components/ProductPreview";

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
    status: 'pending' | 'process' | 'success';
    trackingInfo?: {
        resiNumber: string;
        deliveryDate: string;
        expeditionType: string;
        orderStatus: string;
        history: {
            date: string;
            status: string;
            description: string;
        }[];
    };
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
        selectedColor: 'Black',
        status: 'pending'
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
        selectedColor: 'White',
        status: 'process',
        trackingInfo: {
            resiNumber: 'JNE123456789',
            deliveryDate: '2024-03-20',
            expeditionType: 'JNE Regular',
            orderStatus: 'In Transit',
            history: [
                {
                    date: '2024-03-18',
                    status: 'Order Confirmed',
                    description: 'Order has been confirmed by seller'
                },
                {
                    date: '2024-03-19',
                    status: 'In Transit',
                    description: 'Package is being delivered'
                }
            ]
        }
    }
];

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price);
};

export default function Order() {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState<'pending' | 'process' | 'success'>('pending');
    const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const filteredItems = cartItems.filter(item => item.status === activeTab);

    const removeFromCart = (itemId: string) => {
        setCartItems(prev => prev.filter(item => item.id !== itemId));
        setSelectedItems(prev => prev.filter(id => id !== itemId));
    };

    const calculateTotal = () => {
        if (activeTab === 'pending') {
            return filteredItems
                .filter(item => selectedItems.includes(item.id))
                .reduce((total, item) => total + (item.product.price * item.quantity), 0);
        }
        return filteredItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    };

    const handleCheckout = (itemId: string) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === itemId) {
                return {
                    ...item,
                    status: 'process',
                    trackingInfo: {
                        resiNumber: 'JNE' + Math.floor(Math.random() * 1000000),
                        deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                        expeditionType: 'JNE Regular',
                        orderStatus: 'Order Confirmed',
                        history: [
                            {
                                date: new Date().toISOString().split('T')[0],
                                status: 'Order Confirmed',
                                description: 'Order has been confirmed by seller'
                            }
                        ]
                    }
                };
            }
            return item;
        }));
        setSelectedItems(prev => prev.filter(id => id !== itemId));
    };

    const moveToProcess = (itemId: string) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === itemId) {
                return {
                    ...item,
                    status: 'process',
                    trackingInfo: {
                        resiNumber: 'JNE' + Math.floor(Math.random() * 1000000),
                        deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                        expeditionType: 'JNE Regular',
                        orderStatus: 'Order Confirmed',
                        history: [
                            {
                                date: new Date().toISOString().split('T')[0],
                                status: 'Order Confirmed',
                                description: 'Order has been confirmed by seller'
                            }
                        ]
                    }
                };
            }
            return item;
        }));
    };

    const toggleItemSelection = (itemId: string) => {
        setSelectedItems(prev => {
            if (prev.includes(itemId)) {
                return prev.filter(id => id !== itemId);
            } else {
                return [...prev, itemId];
            }
        });
    };

    const handleBulkCheckout = () => {
        selectedItems.forEach(itemId => {
            handleCheckout(itemId);
        });
    };

    return (
        <SafeAreaView className="flex-1 bg-blue-500">
            {/* Header */}
            <View className="flex-row items-center mt-2 mb-6 p-4">
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <ChevronLeft size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text className="flex-1 text-center text-white font-semibold text-base">Order</Text>
                <View className="w-6" />
            </View>

            {/* Navigation Tabs */}
            <View className="flex-row bg-white px-4 py-2">
                <TouchableOpacity 
                    className={`flex-1 py-2 ${activeTab === 'pending' ? 'border-b-2 border-blue-500' : ''}`}
                    onPress={() => setActiveTab('pending')}
                >
                    <Text className={`text-center ${activeTab === 'pending' ? 'text-blue-500 font-semibold' : 'text-gray-500'}`}>
                        Pending
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    className={`flex-1 py-2 ${activeTab === 'process' ? 'border-b-2 border-blue-500' : ''}`}
                    onPress={() => setActiveTab('process')}
                >
                    <Text className={`text-center ${activeTab === 'process' ? 'text-blue-500 font-semibold' : 'text-gray-500'}`}>
                        Process
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    className={`flex-1 py-2 ${activeTab === 'success' ? 'border-b-2 border-blue-500' : ''}`}
                    onPress={() => setActiveTab('success')}
                >
                    <Text className={`text-center ${activeTab === 'success' ? 'text-blue-500 font-semibold' : 'text-gray-500'}`}>
                        Success
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Content */}
            <ScrollView className="flex-1 bg-white">
                <View className="p-4">
                    {filteredItems.length === 0 ? (
                        <View className="items-center justify-center py-8">
                            <ShoppingCart size={48} color="#D1D5DB" />
                            <Text className="text-gray-500 mt-4">No orders in this status</Text>
                        </View>
                    ) : (
                        filteredItems.map((item) => (
                            <View key={item.id} className="mb-4">
                                <View className="flex-row items-center">
                                    {item.status === 'pending' && (
                                        <TouchableOpacity 
                                            className="w-6 h-6 border-2 border-blue-500 rounded mr-2 items-center justify-center"
                                            onPress={() => toggleItemSelection(item.id)}
                                        >
                                            {selectedItems.includes(item.id) && (
                                                <View className="w-4 h-4 bg-blue-500 rounded" />
                                            )}
                                        </TouchableOpacity>
                                    )}
                                    <View className="flex-1">
                                        <ProductPreview
                                            item={item}
                                            onRemove={removeFromCart}
                                        />
                                    </View>
                                </View>
                                {item.status === 'process' && item.trackingInfo && (
                                    <TouchableOpacity 
                                        className="mt-2 bg-blue-500 rounded-xl py-2"
                                        onPress={() => navigation.navigate('OrderDetails', { item })}
                                    >
                                        <Text className="text-center text-white font-semibold">View Tracking Details</Text>
                                    </TouchableOpacity>
                                )}
                                {item.status === 'success' && (
                                    <TouchableOpacity 
                                        className="mt-2 bg-blue-500 rounded-xl py-2"
                                        onPress={() => moveToProcess(item.id)}
                                    >
                                        <Text className="text-center text-white font-semibold">Move to Process</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        ))
                    )}
                </View>
            </ScrollView>

            {/* Bottom Section */}
            {activeTab === 'pending' && filteredItems.length > 0 && (
                <View className="bg-white p-4 border-t border-gray-200">
                    <View className="flex-row justify-between mb-4">
                        <Text className="text-lg font-semibold">Total</Text>
                        <Text className="text-lg font-bold">{formatPrice(calculateTotal())}</Text>
                    </View>
                    {selectedItems.length > 0 ? (
                        <TouchableOpacity 
                            className="bg-blue-500 rounded-xl py-3"
                            onPress={handleBulkCheckout}
                        >
                            <Text className="text-center text-white font-semibold">
                                Checkout Selected Items ({selectedItems.length})
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity 
                            className="bg-gray-300 rounded-xl py-3"
                            disabled={true}
                        >
                            <Text className="text-center text-gray-500 font-semibold">
                                Select items to checkout
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </SafeAreaView>
    );
}

