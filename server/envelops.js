const envelopsRouter = require("express").Router();
const { v4: uuidv4 } = require("uuid");

const envelops = [
  {
    id: "8c49864c-3a06-4d2c-a7ab-a5a01e56ba39",
    name: "Car",
    amount: 1500000,
  },
  {
    id: "e122698a-30c4-4552-a840-c24a4dd09d13",
    name: "Car2",
    amount: 1500000,
  },
];

envelopsRouter.param("id", (req, res, next, id) => {
  const envelopIndex = envelops.findIndex((envelop) => envelop.id === id);
  if (envelopIndex === -1) {
    res.status(404).send("Not found!");
  } else {
    req.envelopIndex = envelopIndex;
    req.foundEnvelop = envelops[envelopIndex];
    next();
  }
});

// GET ALL ENVELOP
envelopsRouter.get("/", (req, res, next) => {
  res.send(envelops);
});

// CREATE NEW ENVELOP
envelopsRouter.post("/", (req, res, next) => {
  const { name, amount } = req.body;

  if (!name || !amount) {
    res.status(400).send("Something is missing!");
  } else {
    const newEnvelop = {
      id: uuidv4(),
      name: req.body.name,
      amount: Number(req.body.amount),
    };

    envelops.push(newEnvelop);
    res.status(201).send(newEnvelop);
  }
});

// UPDATE ENVELOP
envelopsRouter.post("/:id", (req, res, next) => {
  const { name, amount } = req.query;

  req.foundEnvelop.name = name;
  req.foundEnvelop.amount = req.foundEnvelop.amount + Number(amount);

  res.status(201).send(req.foundEnvelop);
});

// TRANSFER TO OTHER ENVELOPS
envelopsRouter.post("/:id/transfer", (req, res, next) => {
  const { toEnvelopId, transferAmount } = req.body;

  req.foundEnvelop.amount -= transferAmount;
  const toEnvelop = envelops.find((envelop) => envelop.id === toEnvelopId);

  toEnvelop.amount += transferAmount;

  res.status(200).send(toEnvelop);
});

// DELETE ENVELOP
envelopsRouter.delete("/:id", (req, res, next) => {
  envelops.splice(req.envelopIndex, 1);

  res.status(200).send(envelops);
});

envelopsRouter.get("/:id", (req, res, next) => {
  res.send(req.foundEnvelop);
});

module.exports = envelopsRouter;
