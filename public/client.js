var socket = io.connect("https://giftsvk.com", {transports: websocket, secure: true, rejectUnauthorized: false});

socket.on("connect", function (data) {
  socket.emit("join", { customId: "000CustomIdHere0000" });
});

socket.on("thread", function (data) {
  $("#thread").append("<li>" + data + "</li>");
});


$("form").submit(function () {
  var message = $("#message").val();
  socket.emit("messages", message);
  this.reset();
  return false;
});