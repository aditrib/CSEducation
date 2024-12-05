import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import db from "../../../database/db";
import theme from "../../../assets/theme";

export default function NewCourse() {
  const [courseName, setCourseName] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [modules, setModules] = useState([
    { title: "", type: "READ", content: "" },
  ]);
  const [loading, setLoading] = useState(false);

  const addModule = () => {
    setModules([...modules, { title: "", type: "READ", content: "" }]);
  };

  const removeModule = (index) => {
    setModules(modules.filter((_, i) => i !== index));
  };

  const handleModuleChange = (index, field, value) => {
    const updatedModules = [...modules];
    updatedModules[index][field] = value;
    setModules(updatedModules);
  };

  const submitCourse = async () => {
    if (!courseName || !subject || !description || modules.length === 0) {
      Alert.alert("Error", "Please fill out all required fields.");
      return;
    }

    // Validate subject
    const validSubjects = ["math", "science", "history", "english"];
    if (!validSubjects.includes(subject)) {
      Alert.alert(
        "Error",
        `Subject must be one of: ${validSubjects.join(", ")}`
      );
      return;
    }

    // Validate modules
    for (const module of modules) {
      if (!module.title || !module.type || !module.content) {
        Alert.alert("Error", "All module fields must be filled.");
        return;
      }
    }

    setLoading(true);

    try {
      const { error } = await db.from("courses").insert({
        course_name: courseName,
        subject,
        description,
        module_text: modules.reduce((acc, module, index) => {
          acc[`module_${index + 1}`] = module;
          return acc;
        }, {}),
      });

      if (error) {
        Alert.alert("Error", "Failed to create course.");
        console.error(error);
      } else {
        Alert.alert("Success", "Course created successfully!");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create New Course</Text>
      <TextInput
        placeholder="Course Name"
        value={courseName}
        onChangeText={setCourseName}
        style={styles.input}
      />
      <TextInput
        placeholder="Subject (math, science, history, english)"
        value={subject}
        onChangeText={setSubject}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
      />
      <Text style={styles.sectionTitle}>Modules</Text>
      {modules.map((module, index) => (
        <View key={index} style={styles.moduleContainer}>
          <TextInput
            placeholder="Module Title"
            value={module.title}
            onChangeText={(text) => handleModuleChange(index, "title", text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Module Type (READ or WRITE)"
            value={module.type}
            onChangeText={(text) => handleModuleChange(index, "type", text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Module Content"
            value={module.content}
            onChangeText={(text) => handleModuleChange(index, "content", text)}
            style={styles.input}
            multiline
          />
          <TouchableOpacity
            onPress={() => removeModule(index)}
            style={[styles.button, styles.deleteButton]}
          >
            <Text style={styles.buttonText}>Delete Module</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity
        onPress={addModule}
        style={[styles.button, styles.addButton]}
      >
        <Text style={styles.buttonText}>Add Module</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={submitCourse}
        style={[styles.button, styles.submitButton]}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Submitting..." : "Submit Course"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  moduleContainer: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 8,
  },
  addButton: {
    backgroundColor: theme.colors.lightBlue,
  },
  submitButton: {
    backgroundColor: theme.colors.green,
  },
  deleteButton: {
    backgroundColor: theme.colors.red,
  },
  buttonText: {
    color: theme.colors.textWhite,
    fontWeight: "bold",
  },
});
