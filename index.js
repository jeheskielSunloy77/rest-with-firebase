const express = require("express")
const cors = require("cors")
const Users = require("./config")
const app = express()
app.use(express.json())
app.use(cors())

app.get("/users", async (req, res) => {
	const snapshot = await Users.get()
	const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
	res.send(list)
})
app.get("/users/:id", async (req, res) => {
	const snapshot = await Users.get()
	const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
	const oneItem = list.find(item => item.id === req.params.id)
	res.send(oneItem)
})
app.post("/users", async (req, res) => {
	const data = req.body
	await Users.add({ data })
	res.send({ msg: "User Added!" })
})

app.patch("/users/:id", async (req, res) => {
	const id = req.params.id
	delete req.body.id
	const data = req.body
	await Users.doc(id).update(data)
	res.send({ msg: "Updated" })
})

app.delete("/users/:id", async (req, res) => {
	const id = req.params.id
	await Users.doc(id).delete()
	res.send({ msg: "Deleted" })
})
app.listen(3001, () => console.log("Yay! server runs on port 3001 !"))
