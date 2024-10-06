import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const MagicButton = ({
  title,
  otherClasses,
}: {
  title: string;
  otherClasses?: string;
}) => {
  return (
    <TouchableOpacity className="relative inline-flex h-12 overflow-hidden rounded-[8px] p-[4px] focus:outline-none focus:ring-2  focus:ring-offset-2 focus:ring-offset-slate-50">
      <View className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FFFFFF_0%,#FFFFFF_50%,#1D195B_100%)]" />
      <View className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-[8px] bg-[#1D195B] md:px-[48px] md:py-[16px] px-[32px] py-[12px] text-[16px] md:text-[18px] font-medium text-white backdrop-blur-3xl">
        <Text className={`relative ${otherClasses}`}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MagicButton;
