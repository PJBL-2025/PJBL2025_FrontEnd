import { X } from "lucide-react-native";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View, Modal } from "react-native";

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

interface ProductPreviewProps {
    item: CartItem;
    onRemove: (id: string) => void;
}

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price);
};

const ProductPreview = ({ item, onRemove }: ProductPreviewProps) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleCancel = () => {
        setModalVisible(true);
    };

    const handleConfirm = () => {
        setModalVisible(false);
        onRemove(item.id);
    };
    return (
        <View className="flex-row items-center mb-4 p-3 bg-gray-50 rounded-xl">
            <Image
                source={item.product.image}
                className="w-20 h-20 rounded-lg"
            />
            <View className="flex-1 ml-3">
                <Text className="font-semibold">{item.product.name}</Text>
                <Text className="text-gray-500">Color: {item.selectedColor}</Text>
                <Text className="text-gray-500">Quantity: {item.quantity}</Text>
                <Text className="font-semibold">{formatPrice(item.product.price * item.quantity)}</Text>
            </View>
            <>
                <TouchableOpacity
                    onPress={handleCancel}
                    className="p-2"
                >
                    <X size={20} color="#FF0000" />
                </TouchableOpacity>

                    <Modal
                        animationType="fade" // Ubah animasi menjadi fade
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                    <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-white w-80 p-5 rounded-xl">
                        <Text className="text-lg font-bold mb-4 text-center">
                            You sure want to remove this item from your cart?
                        </Text>
                        <View className="flex-row justify-center gap-x-5">
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            className="bg-gray-300 px-4 py-2 rounded-lg"
                        >
                            <Text className="text-black font-semibold">No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleConfirm}
                            className="bg-red-500 px-4 py-2 rounded-lg"
                        >
                            <Text className="text-white font-semibold">Yes</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                    </View>
                </Modal>
                </>
        </View>
    );
};

export default ProductPreview;