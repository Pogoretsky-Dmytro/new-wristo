const io = require("./src/index.js").io;

module.exports = function (socket) {
	console.log("socket = ", socket.id);
}