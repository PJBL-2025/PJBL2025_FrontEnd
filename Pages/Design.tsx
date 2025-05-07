import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronDown, ChevronLeft, Plus } from "lucide-react-native";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function Design() {
    const navigation = useNavigation();
    const [view, setView] = useState<"Front" | "Back">("Front");
    const [open, setOpen] = useState(false);
    const [color, setColor] = useState("Color");
    const images = {
        Black: require('../assets/images/ClothesDesign/Black.png'),
        White: require('../assets/images/ClothesDesign/White.png'),
        Red: require('../assets/images/ClothesDesign/Red.png'),
        Orange: require('../assets/images/ClothesDesign/Orange.png'),
        } as const;
        
    const colors: Array<keyof typeof images> = ["Black", "White", "Red", "Orange"];
    
    const [items, setItems] = useState(
        colors.map((color) => ({
        label: color,
        value: color,
        icon: () => (
            <Image
            source={images[color]}
            style={{ width: 24, height: 24 }}
            />
        ),
        }))
    );

    const getShirtImage = () => {
        switch (color) {
        case "Black":
            return require("../assets/images/ClothesDesign/Black.png");
        case "White":
            return require("../assets/images/ClothesDesign/White.png");
        case "Red":
            return require("../assets/images/ClothesDesign/Red.png");
        case "Orange":
            return require("../assets/images/ClothesDesign/Orange.png");
        default:
            return
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <LinearGradient
                colors={["#3B82F6", "#FFFFFF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                className="flex-1 px-4 pt-12"
            >
                <View className="flex-1">
                {/* Header */}
                <View className="flex-row items-center mt-2 mb-6">
                    <TouchableOpacity onPress={() => navigation.navigate("Home")} className="p-1">
                    <ChevronLeft size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text className="flex-1 text-center text-white font-semibold text-lg">
                    My Design
                    </Text>
                    <View className="w-5" />
                </View>

                {/* Shirt Image Card */}
                <View className="bg-white rounded-3xl p-3 items-center justify-center mb-4 border-2 border-gray-200 shadow-sm">
                    <Image
                    source={getShirtImage()}
                    className="w-96 h-96 rounded-2xl"
                    style={{ resizeMode: "contain" }}
                    />
                </View>

{/* Front/Back Switch */}
<View className="flex-row gap-x-3 mb-4">
  {["Front", "Back"].map((side) => (
    <TouchableOpacity
      key={side}
      onPress={() => setView(side as "Front" | "Back")}
      className={`flex-1 py-3 rounded-xl transition-all duration-300 ease-in-out
        ${view === side ? 'bg-blue-500 shadow-lg' : 'bg-gray-100'}`}
    >
      <Text className={`text-center text-lg font-bold transition-colors duration-300
        ${view === side ? 'text-white' : 'text-gray-700'}`}>
        {side}
      </Text>
    </TouchableOpacity>
  ))}
</View>

{/* Dropdown and Add Image */}
<View className="flex-row gap-x-3 mb-4">
  <View className="flex-1">
    <DropDownPicker
      open={open}
      value={color}
      items={items}
      setOpen={setOpen}
      setValue={setColor}
      setItems={setItems}
      placeholder="Select Color"
      listMode="SCROLLVIEW"
      dropDownDirection="AUTO"
      style={{
        backgroundColor: "white",
        borderRadius: 10,
        height: 60,
        borderColor: "transparent",
        borderWidth: 1,
      }}
      dropDownContainerStyle={{
        backgroundColor: "#fff",
        borderRadius: 10,
        borderColor: "transparent",
        borderWidth: 1,
      }}
      containerStyle={{ flex: 1 }}
      listItemLabelStyle={{ fontSize: 16 }}
      labelStyle={{ fontSize: 16 }}
      placeholderStyle={{
        fontSize: 16,
        fontWeight: "bold",
        color: "#999"
      }}
      ArrowDownIconComponent={() => <ChevronDown color="#000" />}
      ArrowUpIconComponent={() => <ChevronDown color="#000" />}
    />
  </View>

  <TouchableOpacity
    className="flex-1 bg-white py-3 rounded-xl flex-row items-center justify-center shadow-lg"
  >
    <Plus color="black" size={24} />
    <Text className="ml-2 font-semibold text-base text-black">Add Image</Text>
  </TouchableOpacity>
</View>

                    {/* Text Input */}
                    <TextInput
                        className="bg-white rounded-xl px-4 py-3 mt-4 text-base border border-gray-200"
                        placeholder="Add Some Text ( Optional )"
                        placeholderTextColor="#A1A1AA"
                    />

                    {/* Checkout Button */}
                    <TouchableOpacity className="bg-[#0ACF83] py-4 rounded-2xl mt-4 shadow-md">
                        <Text className="text-center text-white font-bold text-xl">Checkout</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </ScrollView>
    );
}
