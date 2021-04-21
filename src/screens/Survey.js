import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, TextInput, Button, ScrollView
} from 'react-native'


import { Auth } from 'aws-amplify'
import { API, graphqlOperation } from 'aws-amplify'
import { createTodo } from '../graphql/mutations'
import { listTodos } from '../graphql/queries'

const initialState = { name: '', description: '', newcat: '', emailAddress: '' }

uidtext = ""
let emailAddress = ""



const App = () => {


  Auth.currentAuthenticatedUser().then((user) => {
    uidtext = user.attributes.email;
    emailAddress = uidtext;
  });
  

  const [formState, setFormState] = useState(initialState)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetchTodos()
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos))
      const todos = todoData.data.listTodos.items
      let newlist = []

      console.log("original items = " + JSON.stringify(todos))

      for (let items of todos){
        let i = 0        
        console.log("111")

        // if (items.emailAddress == emailAddress){
        //   console.log("222")
        //   newlist[i] = items
        //   ++i
        // }

        if (items.emailAddress == emailAddress){
          console.log("222")
          console.log("ITEMS = " + items)
          newlist.push(items)

        }

        console.log("333")

      }


      console.log("final items PRE = " + newlist)

      console.log("final items = " + JSON.stringify(newlist))
      
      //console.log("newer list = " + newerlist)
      
      setTodos(newlist)
    } catch (err) { console.log('error fetching todos') }
  }

  async function addTodo() {
    try {
      formState.emailAddress = uidtext
      const todo = { ...formState }
      setTodos([...todos, todo])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createTodo, {input: todo}))
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text>{uidtext}</Text>
      <TextInput
        onChangeText={val => setInput('name', val)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <TextInput
        onChangeText={val => setInput('description', val)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
      <TextInput
        onChangeText={val => setInput('newcat', val)}
        style={styles.input}
        value={formState.newcat}
        placeholder="NewCat"
      />
      <Button title="Create Todo" onPress={addTodo} />
      {
        todos.map((todo, index) => (
          


          <View key={todo.id ? todo.id : index} style={styles.todo}>
            <Text style={styles.todoName}>{todo.name}</Text>
            <Text>{todo.description}</Text>
            <Text>{todo.newcat}</Text>
            <Text>{todo.emailAddress}</Text>
          </View>
        ))
      }
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { height: 50, backgroundColor: '#ddd', marginBottom: 10, padding: 8 },
  todoName: { fontSize: 18 }
})

export default App