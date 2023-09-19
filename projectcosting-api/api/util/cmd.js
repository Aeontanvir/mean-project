const write = function(message = "") {
    console.log(message)
}
const onServerStart = function () {
    write(`Game app listening on port http://localhost:${process.env.PORT}`)
}

module.exports = {
    onServerStart: onServerStart,
    write: write
}