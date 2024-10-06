import { View, Text, ScrollView, Image, StatusBar, Alert } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import OAuth from "./OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";
import { fetchAPI } from "@/lib/fetch";

export default function Signup() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showModal, setShowModal] = useState(false);
  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignupPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          error: "verification failed",
          state: "failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
    }
  };
  return (
    <ScrollView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" />
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="w-full h-[250px]" />
          <Text className="absolute left-5 bottom-5 text-xl font-JakartaBold">
            Create Account
          </Text>
        </View>
        <View className="px-[20px]">
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setform({ ...form, name: value })}
          />
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setform({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            secureTextEntry={true}
            icon={icons.lock}
            value={form.password}
            onChangeText={(value) => setform({ ...form, password: value })}
          />
          <CustomButton
            title="Sign Up"
            onPress={onSignupPress}
            className="mt-6"
          />
          {/* OAuth */}
          <OAuth />

          <Link href={"/sign-in"} className="text-lg text-center mt-5">
            <Text className="text-neutral-500">Already have an account? </Text>
            <Text className="text-primary-500">Sign In</Text>
          </Link>
        </View>
        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            if (verification.state === "success") setShowModal(true);
          }}
        >
          <View className="bg-white  px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="font-JakartaBold mb-5 text-2xl">Verification</Text>
            <Text className="font-JakartaBold mb-5">
              We've sent a verification code to {form.email}
            </Text>
            <InputField
              label="Code"
              placeholder="12345"
              icon={icons.lock}
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />
            {verification.error && (
              <Text className="text-red-500">{verification.error}</Text>
            )}
            <CustomButton
              title="verify Email"
              onPress={onPressVerify}
              className="bg-success-500 mt-5"
            />
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={showModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-3xl font-JakartaBold text-center">
              Verified
            </Text>
            <Text className="text-base font-Jakarta text-center text-gray-200 mt-2">
              You have successfully verified your account.
            </Text>
            <CustomButton
              title="Browse Home"
              onPress={() => {
                setShowModal(false);
                router.replace(`/(root)/(tabs)/home`);
              }}
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
}
