/** load library express */
const express = require(`express`)
/** initiate object that instance of express */
const app = express()

/** allow to read 'request' with json type */
app.use(express.json())

/** load member's controller */
const memberController =
require(`../controllers/member.controller`)

/** create route to get data with method "GET" */
app.get("/", memberController.getAllMember)

/** create route to add new member using method "POST" */
app.post("/", memberController.addMember)

/** create route to find member
* using method "POST" and path "find" */
app.post("/find", memberController.findMember)

// create route to update member
//  *using method "PUT" and define parameter for "id" 
app.put("/:id", memberController.updateMember)

// create route to delete member
app.delete("/:id", memberController.deleteMember)

module.exports = app