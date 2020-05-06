import * as React from "react";
import { Modal, View, TouchableOpacity, Text } from "react-native";
import styles from "../constants/styles";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function TransparentModal({
  modalVisible,
  setModalVisible,
  navigation
}) {
  return (
    <Modal animationType={"fade"} visible={modalVisible} transparent={true}>
      <View
        style={{
          position: "relative",
          width: 395,
          height: 395,
          marginTop: 150
        }}
      >
        <RoundButton
          onPressAction={setModalVisible}
          iconName="eye"
          iconType="awesome"
          size={27}
          angle={styles.deg0}
        />
        <RoundButton
          onPressAction={() => {
            setModalVisible(false);
            navigation.navigate("Create");
          }}
          iconName="md-add-circle-outline"
          iconType="ion"
          size={30}
          angle={styles.deg60}
        />
        <RoundButton
          onPressAction={setModalVisible}
          iconName="md-copy"
          iconType="ion"
          size={30}
          angle={styles.deg120}
        />
        <RoundButton
          onPressAction={setModalVisible}
          iconName="paste"
          iconType="awesome"
          size={23}
          angle={styles.deg180}
        />
        <RoundButton
          onPressAction={setModalVisible}
          iconName="md-arrow-round-back"
          iconType="ion"
          size={30}
          angle={styles.deg240}
        />
        <RoundButton
          onPressAction={setModalVisible}
          iconName="folder-open-o"
          iconType="awesome"
          size={25}
          angle={styles.deg300}
        />
      </View>
    </Modal>
  );
}

function RoundButton({ onPressAction, iconName, iconType, size, angle }) {
  return (
    <TouchableOpacity
      onPress={onPressAction}
      style={[styles.roundButton, angle, { backgroundColor: Colors.orange }]}
    >
      <Text>
        <Icon type={iconType} iconName={iconName} size={size} />
      </Text>
    </TouchableOpacity>
  );
}

function Icon({ type, iconName, size }) {
  if (type === "ion") {
    return <Ionicons size={size} color="#fff" name={iconName} />;
  } else {
    return <FontAwesome size={size} color="#fff" name={iconName} />;
  }
}
