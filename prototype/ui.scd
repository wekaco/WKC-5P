{|server, name="ui"|
  var parent;
  var meters, controls;
  var serverBtn;
  parent        = Window.new(name, Point.new(640, 360));
  parent.layout = VLayout(3);


  meters   = ServerMeterView.new(server, parent, Point.new(0,0), server.options.numInputBusChannels, server.options.numOutputBusChannels);
  controls = View.new(parent, Point.new(640, 40));

  serverBtn = Button.new(controls, Point.new(32,32)); 
  serverBtn.states_([
    [ "◯", Color.black, Color.white ],
    [ "◉", Color.white, Color.black ]
  ]);
  serverBtn.value = server.serverRunning.asInt;
  serverBtn.action_({|btn|
    if (btn.value.asBoolean) { server.boot } { server.quit }
  });

  parent.front;
}
