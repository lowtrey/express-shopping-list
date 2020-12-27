const express = require("express");
const items = require("../fakeDb");
const router = new express.Router();
const ExpressError = require("../ExpressError");

router.get("/", (req, res) => res.json(items));

router.post("/", (req, res, next) => {
    try {
        if (!req.body.name || !req.body.price) throw new ExpressError("Name and Price required.", 400);
        const newItem = { ...req.body };
        items.push(newItem);
        return res.json({ added: newItem });
    } catch(e) {
        return next(e);
    };
});

router.get("/:name", (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name);
    if(foundItem) return res.json(foundItem);
    return res.send("Not Found!");
});

router.patch("/:name", (req, res) => {
    const itemIndex = items.findIndex(item => item.name === req.params.name);
    if (itemIndex) items[itemIndex] = { ...req.body };
    return res.json({ updated: items[itemIndex] }); 
});

router.delete("/:name", (req, res) => {
    const itemIndex = items.findIndex(item => item.name === req.params.name);
    if(itemIndex !== -1) {
        const deletedItem = items.splice(itemIndex, 1)[0];
        return res.json({ message: `Item: '${deletedItem.name}' deleted.` });
    };
});

module.exports = router;