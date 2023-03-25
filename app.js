const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
require('./db')

const PORT = process.env.PORT || 3000

// Importer les middlewares
const todoListsMiddleware = require('./middlevares/toDoListCRUD.mid')
const tasksMiddleware = require('./middlevares/task.mid')

const authRouter = require('./router/auth.router')

// Importer la connexion à la base de données
require('./db')

// Créer une nouvelle instance d'application Express
const app = express()

// Configurer le middleware bodyParser pour analyser les demandes avec un corps JSON
app.use(bodyParser.json())
app.use('/auth', authRouter)

// Définir les routes pour les listes de tâches
app.get('/todo-lists', todoListsMiddleware.getTodoLists)
app.post('/todo-lists', todoListsMiddleware.createTodoList)
app.get('/todo-lists/:id', todoListsMiddleware.getTodoListById)
app.put('/todo-lists/:id', todoListsMiddleware.updateTodoListById)
app.delete('/todo-lists/:id', todoListsMiddleware.deleteTodoListById)

// Définir les routes pour les tâches
app.get('/todo-lists/:todoListId/tasks', tasksMiddleware.getTasks)
app.post('/todo-lists/:todoListId/tasks', tasksMiddleware.createTask)
app.get('/todo-lists/:todoListId/tasks/:id', tasksMiddleware.getTaskById)
app.put('/todo-lists/:todoListId/tasks/:id', tasksMiddleware.updateTaskById)
app.delete('/todo-lists/:todoListId/tasks/:id', tasksMiddleware.deleteTaskById)

app.use((err, req, res, next) => {
    res.status(500).json({ status: 'error', message: err })
})
app.use((req, res) => {
    res.status(404).json({ message: 'not found : check the url !' })
})

// Démarrer le serveur en écoutant les demandes entrantes sur le port 3000
app.listen(PORT, () => {
    console.log(`=> server launched on port : ${PORT}`)
})
