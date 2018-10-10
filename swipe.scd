(
  s.boot;
)
(
  s.waitForBoot({
    SynthDef(\PulseLine, { | bus = 0, start = 50, dur = 20| 
      var end = SampleRate.ir;
      var doneAction = Done.freeSelf;

      Out.ar(bus, Pulse.ar(
        Line.kr( start, end, dur, doneAction: doneAction)
      ))
    }).add;

    SynthDef(\PulseXLine, { | bus = 0, start = 50, dur = 20 |
      var end        = SampleRate.ir;
      var doneAction = Done.freeSelf;

      Out.ar(0, Pulse.ar(
        XLine.kr(start, end, dur, doneAction: doneAction)
      ))
    }).add;
    
    SynthDef(\SineLine, { | bus = 0, start = 50, dur = 20| 
      var end = SampleRate.ir;
      var doneAction = Done.freeSelf;

      Out.ar(bus, SinOsc.ar(
        Line.kr( start, end, dur, doneAction: doneAction)
      ))
    }).add;
    
    SynthDef(\SineXLine, { | bus = 0, start = 50, dur = 20 |
      var end        = SampleRate.ir;
      var doneAction = Done.freeSelf;

      Out.ar(0, SinOsc.ar(
        XLine.kr(start, end, dur, doneAction: doneAction)
      ))
    }).add;
  });
)
(
  var sine_line = Synth(\SineLine, [ \bus, 2 ]);
)
