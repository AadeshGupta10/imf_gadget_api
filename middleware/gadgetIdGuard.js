const gadgetIdGuard = (req, res, next) => {
    const gadgetId = req.params.id;

    if (!gadgetId) {
        return res.status(400).json({ message: "Gadget Id Required" });
    }

    next();
}

module.exports = gadgetIdGuard;