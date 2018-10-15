s.boot

(
SynthDef(\tone, {|freq = 40, amp = (-12.dbamp), gate = 1, d = 1, tune = 0.2|
	var sound, env;
	sound = Mix.new([
		Pulse.ar(freq: (freq + tune));
		Pulse.ar(freq: (freq - tune)),
	]);
	env     = Env([ 0, 0.5, 0.9, 1, 0.7, 0.7, 0  ], [ 0.2, 0.2, 0.1, 0.5, 1.2, 1  ] / d , releaseNode:3, loopNode:2);
	sound = sound * EnvGen.kr(env, gate, doneAction: Done.freeSelf);


	Out.ar(0, LPF.ar(sound, 200).distort * amp);
}).add;
)

(
a = (instrument: \tone, freq: 120, amp: (-10.dbamp), d: 2 );

Pbind(
	\dur, 3.6,
	\legato, 2,
	\freq, Pseq([ {60+220.rand} ], inf),
	\amp, Pseq([ {(6.0.rand -8).dbamp}], inf),
	\tune, Pseq([ {(0.2.rand + 6.rand)}  ], inf)
).play(protoEvent:a);
)

s.stop
