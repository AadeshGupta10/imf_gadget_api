const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { v4: uuidv4 } = require('uuid');
const newGadgetName = require("../utils/generateGadgetName");
const getTime = require("../utils/getTime");

// Get All Gadgets
const handleGetAll = async (req, res) => {
    try {
        const { status } = req.query

        const allGadgets = await prisma.gadgets.findMany({
            where: status ? { status } : {}
        });

        if (allGadgets.length == 0) {
            return res.status(404).json({ message: "No Gadget is Available in Arsenal" })
        }

        const gettingAllGadgets = allGadgets.map((gadget) => (
            {
                ...gadget,
                name: gadget.name + " - " + (Math.floor((Math.random() * 50) + 50 + 1)) + "% success probability"
            }
        ));

        return res.status(200).send(gettingAllGadgets);
    } catch {
        return res.status(500).json({ message: "Error in fetching Gadgets from Arsenal" });
    }
}

// Add New Gadget
const handlePost = async (req, res) => {
    const gadgetName = newGadgetName();

    const uid = uuidv4();

    try {
        await prisma.gadgets.create({
            data: {
                id: uid,
                name: gadgetName
            }
        })

        res.status(201).json({
            "New Gadget Added in Arsenal": gadgetName,
            "Gadget Id": uid
        });
    } catch {
        res.status(500).json({ message: "Error in Adding New Gadget to Arsenal" });
    }
}

// Update Gadget
const handlePatch = async (req, res) => {
    try {
        const { id } = req.params;

        const gadget = await prisma.gadgets.findUnique({
            where: { id }
        });

        if (!gadget) {
            return res.status(400).json({ message: `Gadget with id - ${id} is not Available in Arsenal` });
        }

        const { name, status } = req.body;

        if (name == undefined && status == undefined) {
            return res.status(400).json({ message: "Name or Status are required" });
        }

        const updateData = {}

        if (name !== undefined && name.length > 0) {
            updateData.name = name;
        }

        if (status !== undefined && status.length > 0) {
            updateData.status = status;
        }

        const updatedData = await prisma.gadgets.update({
            where: { id },
            data: updateData
        })

        return res.status(200).send(updatedData);
    } catch {
        res.status(500).send({ message: "Error in Updating Gadget to Arsenal" });
    }
}

// Destroy Gadget
const handleDelete = async (req, res) => {
    try {
        const { id } = req.params;

        const gadget = await prisma.gadgets.findUnique({
            where: { id }
        });

        if (!gadget) {
            return res.status(404).json({ message: "Gadget Not Available in Arsenal" });
        }

        const updatedData = await prisma.gadgets.update({
            where: { id },
            data: {
                status: "Decommissioned",
                decommissionedAt: getTime()
            }
        });

        return res.status(200).send(updatedData);
    } catch {
        res.status(500).json({ message: "Error in Deleting Gadget from Arsenal" });
    }
}

// Initiate Self Distruct on Gadget
const handleSelfDestruct = async (req, res) => {

    try {
        const { id } = req.params;

        const gadget = await prisma.gadgets.findUnique({
            where: { id }
        });

        if (!gadget) {
            return res.status(404).json({ message: "Gadget Not Available in Arsenal" });
        }

        const confirmationCode = Math.random().toString(36).substring(2, 8).toUpperCase();

        await prisma.gadgets.update({
            where: { id },
            data: { status: "Destroyed" }
        });

        return res.status(200).json({
            message: `Self-destruct sequence initiated for ${gadget.name}.`,
            confirmationCode: confirmationCode
        });
    } catch {
        return res.status(500).json({ message: "Error in Initiating Self-destruct Sequence on Gadget" });
    }
}

module.exports = {
    handleGetAll,
    handlePost,
    handlePatch,
    handleDelete,
    handleSelfDestruct
}