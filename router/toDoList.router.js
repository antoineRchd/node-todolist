const express = require('express')

const router = express.Router()

const {
    createTodoList,
    getTodoLists,
    getTodoListById,
    updateTodoListById,
    deleteTodoListById,
} = require('../middlevares/toDoListCRUD.mid')

// Créer une nouvelle liste de tâches
router.post('/add', createTodoList)

// Récupérer toutes les listes de tâches
router.get('/show', getTodoLists)

// Récupérer une liste de tâches par son identifiant
router.get('/show/:id', getTodoListById)

// Mettre à jour une liste de tâches par son identifiant
router.put('/update/:id', updateTodoListById)

// Supprimer une liste de tâches par son identifiant
router.delete('/delete/:id', deleteTodoListById)

module.exports = router
