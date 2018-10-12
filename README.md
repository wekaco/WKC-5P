# ヒューマノイド「WKC-5P」

## Time

System time is measured by a _system clock_, which is typically implemented as a simple count of the number of ticks that have transpired since some arbitrary starting date, called the epoch.

The *system clock* is typically implemented as a programmable interval timer (PIT) that periodically interrupts the CPU, which then starts executing a timer interrupt service routine. This routine typically adds one tick to the system clock (a simple counter) and handles other periodic housekeeping tasks (preemption, etc.) before returning to the task the CPU was executing before the interruption.

<hr/>
<a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
  <img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/80x15.png" />
</a>&nbsp;This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
