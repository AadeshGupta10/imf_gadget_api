const { adjectives, nouns } = require("../constants");

const combinations = [];

const newGadgetName = () => {
    const gadget = "The " + adjectives[Math.floor(Math.random() * (adjectives.length))] + nouns[Math.floor(Math.random() * (nouns.length))];

    if (!combinations.includes(gadget)) {
        combinations.push(gadget);
        return gadget;
    }
    else {
        newGadgetName();
    }
}

module.exports = newGadgetName;