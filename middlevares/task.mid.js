const Task = require('../models/task.model')

// Créer une nouvelle tâche dans une liste donnée
exports.createTask = async (req, res, next) => {
    try {
        const { name, shortDescription, dueDate } = req.body
        const task = new Task({
            name,
            shortDescription,
            dueDate,
            todoListId: req.params.todoListId,
        })
        await task.save()
        res.status(201).json({
            success: true,
            message: 'Tâche créée avec succès',
            data: task,
        })
    } catch (error) {
        next(error)
    }
}

// Récupérer toutes les tâches d'une liste donnée
exports.getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ todoListId: req.params.todoListId })
        res.status(200).json({ success: true, data: tasks })
    } catch (error) {
        next(error)
    }
}

// Récupérer une tâche par son identifiant
exports.getTaskById = async (req, res, next) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            todoListId: req.params.todoListId,
        })
        if (!task) {
            return res
                .status(404)
                .json({ success: false, message: 'Tâche non trouvée' })
        }
        res.status(200).json({ success: true, data: task })
    } catch (error) {
        next(error)
    }
}

// Mettre à jour une tâche par son identifiant
exports.updateTaskById = async (req, res, next) => {
    try {
        const { name, shortDescription, dueDate } = req.body
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, todoListId: req.params.todoListId },
            { name, shortDescription, dueDate },
            { new: true }
        )
        if (!task) {
            return res
                .status(404)
                .json({ success: false, message: 'Tâche non trouvée' })
        }
        res.status(200).json({
            success: true,
            message: 'Tâche mise à jour avec succès',
            data: task,
        })
    } catch (error) {
        next(error)
    }
}

// Supprimer une tâche par son identifiant
exports.deleteTaskById = async (req, res, next) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            todoListId: req.params.todoListId,
        })
        if (!task) {
            return res
                .status(404)
                .json({ success: false, message: 'Tâche non trouvée' })
        }
        res.status(200).json({
            success: true,
            message: 'Tâche supprimée avec succès',
            data: task,
        })
    } catch (error) {
        next(error)
    }
}
