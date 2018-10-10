(
  s.boot;
)
(
  s.waitForBoot({
    /**
     * geometric waveforms, not band limited.
     * will cause aliasing at higher frequencies.
     * LFPar, LFCub, LFTri, LFSaw, Impulse
     */
    SynthDef(\LFParLines, { | bus = 0, start = 50, dur = 20, mul = 0.2 |
      var end = SampleRate.ir;
      var doneAction = Done.freeSelf;
      var line = Line.kr( start, end, dur, doneAction: doneAction);
      var xline = XLine.kr( start, end, dur, doneAction: doneAction);
      var iphase = 0;
      Out.ar(bus, [ 
        LFCub.ar(line, iphase, mul),
        LFCub.ar(xline, iphase, mul)
      ])
    }).add;

    SynthDef(\DiskOutStereo, { | bufnum, bus = 0|
      DiskOut.ar(bufnum, In.ar(bus, 2));
    }).add;

    SynthDef(\DiskOutMono, { | bufnum, bus = 0|
      DiskOut.ar(bufnum, In.ar(bus, 1));
    }).add;
  })
)
(
  fork {
    var dur = 20;
    //numFrames (buffer size) should be power of two, sampleRate is 1 sec
    var numFrames = (s.sampleRate * ( dur * 2 )).nextPowerOfTwo;
    var numChannels = 2;
    var swipe, bufnum, record;

    "start".postln;
    swipe = Synth(\LFParLines, [
      \dur, dur,
      \mul, 0.1,
    ]);
    bufnum = Buffer.alloc(s, numFrames, numChannels);
    bufnum.write("~/Desktop/lpfar_lines.aiff".standardizePath, "aiff", "int16", 0, 0, true);

    record = Synth.tail(nil, \DiskOutStereo, [ \bufnum, bufnum ]);

    dur.wait;
    record.free;

    bufnum.close;
    bufnum.free;
    "done".postln;
  }
)
