const router = require('express').Router();

const todoItemsModel = require('../models/todoitems');


router.post('/api/item', async (req, res) => {
    try {
        const newItem = new todoItemsModel({
            item: req.body.item
        })
        const saveItem = await newItem.save()
        res.status(200).json(saveItem)
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message)
    }
})

router.get('/api/items', async (req, res) => {
    try{
        const allTodoItems = await todoItemsModel.find({});
        res.status(200).json(allTodoItems)
    }catch(err){
        res.json(err);
    }
})

router.put('/api/item/:id', async (req, res) => {
    try{
        const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {$set: req.body})
        res.status(200).json('Item has been updated')
    } catch(err){
        res.json(err);
    }
})

router.delete('/api/item/:id', async (req, res) => {
    try{
        const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
        res.status(200).json('Item has been deleted');
    } catch(err){
        res.json(err);
    }
})

module.exports = router;