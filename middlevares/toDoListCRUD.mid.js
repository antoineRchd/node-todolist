const TodoList = require('../models/todolist.model')

// Créer une nouvelle liste de tâches
exports.createTodoList = async (req, res, next) => {
    try {
        const { name, shortDescription } = req.body
        const todoList = new TodoList({
            name,
            shortDescription,
            userId: req.user._id,
        })
        await todoList.save()
        res.status(201).json({
            success: true,
            message: 'Liste de tâches créée avec succès',
            data: todoList,
        })
    } catch (error) {
        next(error)
    }
}

// Récupérer toutes les listes de tâches
exports.getTodoLists = async (req, res, next) => {
    try {
        const todoLists = await TodoList.find({ userId: req.user._id })
        res.status(200).json({ success: true, data: todoLists })
    } catch (error) {
        next(error)
    }
}

// Récupérer une liste de tâches par son identifiant
exports.getTodoListById = async (req, res, next) => {
    try {
        const todoList = await TodoList.findOne({
            _id: req.params.id,
            userId: req.user._id,
        })
        if (!todoList) {
            return res.status(404).json({
                success: false,
                message: 'Liste de tâches non trouvée',
            })
        }
        res.status(200).json({ success: true, data: todoList })
    } catch (error) {
        next(error)
    }
}

// Mettre à jour une liste de tâches par son identifiant
exports.updateTodoListById = async (req, res, next) => {
    try {
        const { name, shortDescription } = req.body
        const todoList = await TodoList.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            { name, shortDescription },
            { new: true }
        )
        if (!todoList) {
            return res.status(404).json({
                success: false,
                message: 'Liste de tâches non trouvée',
            })
        }
        res.status(200).json({
            success: true,
            message: 'Liste de tâches mise à jour avec succès',
            data: todoList,
        })
    } catch (error) {
        next(error)
    }
}

// Supprimer une liste de tâches par son identifiant
exports.deleteTodoListById = async (req, res, next) => {
    try {
        const todoList = await TodoList.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id,
        })
        if (!todoList) {
            return res.status(404).json({
                success: false,
                message: 'Liste de tâches non trouvée',
            })
        }
        res.status(200).json({
            success: true,
            message: 'Liste de tâches supprimée avec succès',
            data: todoList,
        })
    } catch (error) {
        next(error)
    }
}
