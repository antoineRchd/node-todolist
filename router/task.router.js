const express = require('express')

const router = express.Router()

const {
    createTask,
    getTasks,
    getTaskById,
    updateTaskById,
    deleteTaskById,
} = require('../middlevares/task.mid')

// Créer une nouvelle tâche
router.post('/add', createTask)

// Récupérer toutes les tâches
router.get('/show', getTasks)

// Récupérer une tâche par son identifiant
router.get('show/:id', getTaskById)

// Mettre à jour une tâche par son identifiant
router.put('update/:id', updateTaskById)

// Supprimer une tâche par son identifiant
router.delete('delete/:id', deleteTaskById)

module.exports = router
