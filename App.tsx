import React, { useRef, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import { createTodo, type Todo } from './src/todo';

export default function App() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');

  const nextId = useRef(1);

  function handleAdd() {
    try {
      const todo = createTodo(input, nextId.current);

      nextId.current += 1;

      setTodos((previous) => [...previous, todo]);
      setInput('');
      setError('');
    } catch (cause: unknown) {
      setError(
          cause instanceof Error
              ? cause.message
              : 'Die Aufgabe konnte nicht hinzugefügt werden.',
      );
    }
  }

  return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.screen}>
          <View style={styles.content}>
            <Text accessibilityRole="header" style={styles.title}>
              Meine Todos
            </Text>

            <Text style={styles.counter}>
              {todos.length}{' '}
              {todos.length === 1 ? 'Aufgabe' : 'Aufgaben'}
            </Text>

            <Text style={styles.label}>Neue Aufgabe</Text>

            <TextInput
                accessibilityLabel="Neue Aufgabe"
                placeholder="z. B. Milch kaufen"
                value={input}
                onChangeText={setInput}
                onSubmitEditing={handleAdd}
                returnKeyType="done"
                style={styles.input}
            />

            <Pressable
                accessibilityRole="button"
                accessibilityLabel="Hinzufügen"
                onPress={handleAdd}
                style={({ pressed }) => [
                  styles.button,
                  pressed && styles.buttonPressed,
                ]}
            >
              <Text style={styles.buttonText}>Hinzufügen</Text>
            </Pressable>

            {error !== '' && (
                <Text accessibilityRole="alert" style={styles.error}>
                  {error}
                </Text>
            )}

            <FlatList
                data={todos}
                keyExtractor={(item) => String(item.id)}
                keyboardShouldPersistTaps="handled"
                style={styles.list}
                ListEmptyComponent={
                  <Text style={styles.empty}>
                    Noch keine Aufgaben.
                  </Text>
                }
                renderItem={({ item }) => (
                    <View style={styles.todo}>
                      <Text style={styles.todoText}>{item.title}</Text>
                    </View>
                )}
            />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#17212B',
  },
  counter: {
    marginTop: 6,
    marginBottom: 28,
    color: '#526170',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#A8B3BF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
  },
  button: {
    minHeight: 48,
    marginTop: 12,
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    marginTop: 12,
    color: '#B42318',
  },
  list: {
    marginTop: 24,
  },
  empty: {
    color: '#526170',
    textAlign: 'center',
    padding: 20,
  },
  todo: {
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  todoText: {
    fontSize: 17,
    color: '#17212B',
  },
});