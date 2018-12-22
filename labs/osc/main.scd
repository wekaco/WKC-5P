(
  var options = ServerOptions().maxLogins_(20);
  s = Server(\myServer, NetAddr("127.0.0.1", 57110), options);
  s.boot; //start the server
  OSCFunc.trace(true);
)
(
  b = s.cachedBufferAt(0);
  b.query;
  b.updateInfo;
  b.plot;
)
().play(s);
