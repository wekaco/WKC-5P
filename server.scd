{|server, device="JackRouter", numIns = 4, numOuts = 4|
  server.options.device = device;
  server.options.numInputBusChannels  = numIns;
  server.options.numOutputBusChannels = numOuts;
  server.boot;
}
