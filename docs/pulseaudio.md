# Pulseaudio setup

## Host install (development)

On mac with `brew install pulseaudio` on Mac. Command line tool accessible through `pulseaudio -nC` & documentation on `man pulse-cli-syntax`


## ALSA Configuration

To activate the driver edit `/etc/asound.conf` or `~/.asoundrc` and add:

```
pcm.pulse {
    type pulse
}

ctl.pulse {
    type pulse
}
```

Now you you can access the PulseAudio server under the virtual ALSA device pulse:

```
$ aplay -Dpulse foo.wav
$ amixer -Dpulse
```

Next: Default device [PulseAudio/Documentation/User/PerfectSetup](https://www.freedesktop.org/wiki/Software/PulseAudio/Documentation/User/PerfectSetup/#alsaapplications)

## Network Setup

There are several different ways to connect to another PulseAudio server
- direct connection
- tunnel
- RTP

Note all methods described here stream raw PCM audio over the network. This can use pretty much network bandwidth (around `1.4 Mb/s` for CD-quality sound). If you get choppy sound, try setting a lower sample rate for the network stream. Furthermore, even while many WiFi connections can sustain such bitrates, often the jitter in packet latency makes transmitting low-latency audio over a wireless link infeasible in practice.

## Direct connection

Just set the environment variable `$PULSE_SERVER` to the host name of the PulseAudio server. Alternatively you can modify `~/.pulse/client.conf` or `/etc/pulse/client.conf` and set default-server.

An example string:

```
{ecstasy}unix:/tmp/pulse-6f7zfg/native tcp6:ecstasy.ring2.lan:4713 tcp:ecstasy.ring2.lan:4713
```

This tells PulseAudio to connect to the UNIX socket `/tmp/pulse-6f7zfg/native` if the local host name is ecstasy. If that fails (or the hostname doesn't match) try to connect to host `ecstasy.ring2.lan` on port `4713` usng TCP/IPv6. If even that fails, connect to the same host/port with TCP/IPv4.

Another example string:
```
gurki
```

All the methods that connect to the daemon over the network using the native protocol need `module-native-protocol-tcp` loaded. This includes tunnels and Zeroconf setups. With this module loaded, the server listens on port `4713` for incoming client connections.

[PulseAudio/Documentation/User/Network](https://www.freedesktop.org/wiki/Software/PulseAudio/Documentation/User/Network/)
