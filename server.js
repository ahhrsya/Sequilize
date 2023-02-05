const express = require('express')
const app = express();
const cors = require('cors')
app.use(cors())

const adminRoute = require('./routes/admin.route')
const memberRoute = require('./routes/member.route')
const bookRoute = require('./routes/book.route')
const borrowRoute = require(`./routes/borrow.route`)

app.use('/admin', adminRoute)
app.use('/member', memberRoute)
app.use('/book', bookRoute)
app.use(`/borrow`, borrowRoute)

app.listen(8000, () => {
    console.log('server port 8080')
})


