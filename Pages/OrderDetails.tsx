import { useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeft } from "lucide-react-native";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

export default function OrderDetails() {
    const navigation = useNavigation();
    const route = useRoute();
    const { item } = route.params as { item: CartItem };

    if (!item.trackingInfo) {
        return null;
    }

    return (
        <SafeAreaView className="flex-1 bg-blue-500">
            {/* Header */}
            <View className="flex-row items-center mt-2 mb-6 p-4">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text className="flex-1 text-center text-white font-semibold text-base">Order Details</Text>
                <View className="w-6" />
            </View>

            {/* Content */}
            <ScrollView className="flex-1 bg-white rounded-t-3xl">
                <View className="p-4">
                    {/* Order Info */}
                    <View className="bg-gray-50 p-4 rounded-xl mb-4">
                        <Text className="text-lg font-semibold mb-2">Order Information</Text>
                        <View className="space-y-2">
                            <Text className="text-gray-600">Resi Number: {item.trackingInfo.resiNumber}</Text>
                            <Text className="text-gray-600">Delivery Date: {item.trackingInfo.deliveryDate}</Text>
                            <Text className="text-gray-600">Expedition: {item.trackingInfo.expeditionType}</Text>
                            <Text className="text-gray-600">Status: {item.trackingInfo.orderStatus}</Text>
                        </View>
                    </View>

                    {/* Tracking History */}
                    <View className="bg-gray-50 p-4 rounded-xl">
                        <Text className="text-lg font-semibold mb-2">Tracking History</Text>
                        <View className="space-y-4">
                            {item.trackingInfo.history.map((event, index) => (
                                <View key={index} className="flex-row">
                                    <View className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3" />
                                    <View className="flex-1">
                                        <Text className="font-semibold">{event.status}</Text>
                                        <Text className="text-gray-500 text-sm">{event.date}</Text>
                                        <Text className="text-gray-600 mt-1">{event.description}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
} 