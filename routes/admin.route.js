/** load library express */
const express = require(`express`)
/** initiate object that instance of express */
const app = express()

/** allow to read 'request' with json type */
app.use(express.json())

/** load member's controller */
const adminController =
require(`../controllers/admin.controller`)

/** create route to get data with method "GET" */
app.get("/", adminController.getAllAdmin)

/** create route to add new member using method "POST" */
app.post("/", adminController.addAdmin)

/** create route to find member
* using method "POST" and path "find" */
app.post("/find", adminController.findAdmin)

// create route to update member
//  *using method "PUT" and define parameter for "id" 
app.put("/:id", adminController.updateAdmin)

// create route to delete member
app.delete("/:id", adminController.deleteAdmin)

module.exports = app