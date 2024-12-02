import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { useLocalSearchParams } from "expo-router";
import BackButton from "../../../components/courseDetails/BackButton";
import { CoursesContext } from "../../../context/CoursesContext";
import { ProgressBar, Colors } from "react-native-paper";
import theme from "../../../assets/theme";
import NextButton from "../../../components/courseDetails/NextButton";
import FinishButton from "../../../components/courseDetails/FinishButton";

export default function ModuleContent() {
  const { moduleName, tab } = useLocalSearchParams();
  const { selectedCourse } = useContext(CoursesContext);
  const modules = Object.keys(selectedCourse["module_text"]);

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <ProgressBar
        progress={((modules.indexOf(moduleName) + 1) / modules.length).toFixed(
          2
        )}
        color={theme.colors.darkBlue}
        style={{ margin: 10 }}
      />
      <Text style={styles.title}>{moduleName}</Text>
      <ScrollView>
        <Text style={styles.body}>
          {selectedCourse["module_text"][moduleName]}
        </Text>
        {modules.indexOf(moduleName) + 1 < modules.length ? (
          <NextButton
            currentModuleName={moduleName}
            nextModuleName={modules[modules.indexOf(moduleName) + 1]}
            tab={tab}
          />
        ) : (
          <FinishButton currentModuleName={moduleName} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    paddingLeft: 10,
    fontSize: 24,
    fontWeight: "bold",
  },
  body: {
    padding: 10,
    paddingBottom: 5,
  },
});
