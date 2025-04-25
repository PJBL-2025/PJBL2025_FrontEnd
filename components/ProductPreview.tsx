import { X } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";

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
    return (
        <View className="flex-row items-center mb-4 p-3 bg-gray-50 rounded-xl">
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
                onPress={() => onRemove(item.id)}
                className="p-2"
            >
                <X size={20} color="#FF0000" />
            </TouchableOpacity>
        </View>
    );
};

export default ProductPreview;