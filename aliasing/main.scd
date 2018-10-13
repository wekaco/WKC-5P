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
  var new_buffer = { | s, dur, numChannels = 2 | 
    //numFrames (buffer size) should be power of two, sampleRate is 1 sec
    var numFrames = (s.sampleRate *  dur ).nextPowerOfTwo;
    Buffer.alloc(s, numFrames, numChannels);
  };

  fork {
    // Synth
    var swipe, record; 

    // Synth Params
    var mul = 0.1;
    var start = 1489;
    var dur = 10;

    // Buffer
    var bufnum = new_buffer.value(s, dur);

    // SoundFile Params 
    var path = "~/Desktop/lpfar_lines_start_1382.aiff".standardizePath;
    var headerFormat = "AIFF";
    var sampleFormat = "int16";//int8, int16, int24, int32
    var numFrames = 0; //default: -1 means write whole buffer
    var startFrame = 0;
    var leaveOpen = true;

    bufnum.write(path, headerFormat, sampleFormat, numFrames, startFrame, leaveOpen);
    swipe = Synth(\LFParLines, [
      \start, start,
      \dur, dur,
      \mul, mul,
    ]);
    record = Synth.tail(nil, \DiskOutStereo, [ \bufnum, bufnum ]);
    
    dur.wait;

    record.free;

    bufnum.close;
    bufnum.free;
  }
)
