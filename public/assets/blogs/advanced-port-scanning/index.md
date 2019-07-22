Over the next year or so, I'll be studying for the Certified Ethical Hacking
Exam from the ECC. For this reason, I'll be doing blog posts on some of
the things I'm digging into. They won't be in any order and by no means is meant
to be a complete guide on any particular topic, but hopefully you get something
out of it.

### Disclaimer

The topics, tools, and methods discussed within are meant for educational
purposes only. If used, they should be done in your personal lab against
systems you own or with the permission of system owners. Penetrating systems
you don't own or don't have consent to access is a federal offense. Don't
be an idiot.

## What is Port Scanning?

Simply put, port scanning is a method in which you attempt to find open ports
on a particular target. Port scanning happens during the Scanning and
Enumeration phase of ethical hacking. The phases, in order, are:

* Reconnaissance
* Scanning and Enumeration
* Gaining Access
* Maintaining Access
* Covering Tracks

For the purpose of this exercise, we're going to assume we've done some basic
reconnaissance and have an IP address for a target that we'd like to scan.
Before we start a scan, let's go over some of the types of scans.

### Full Connect Scan

A full connect scan is the most thorough port scan. This scan attempts a
complete three-way handshake against target ports, meaning SYN, SYN/ACK, and
ACK. Because this scan attempts a complete TCP connection to the port, it's
the most detectable scan and should be used with caution.

* **Open**: Will respond with SYN/ACK
* **Closed**: Will respond with an RST

### Stealth (SYN) Scan

This is similar to a full connect scan except the three-way handshake is cut
short; there's no ACK. Since a full connection is not made, a lot of monitoring
methods simply won't pick up this scan.

* **Open**: Will respond with SYN/ACK
* **Closed**: Will respond with an RST

### Inverse TCP Flag

This scan turns on some different TCP flags (or no flags) when sending packets
to ports. Because of the different flags, these packets may actually bypass
certain firewalls and avoids some IDS. Another important note here is that if
there's no response from the target, the port is actually open.

* **Open**: No response
* **Closed**: Will respond with an RST/ACK

## Nmap

Now that we know what port scanning is and what types of port scans are
available to us, we need a tool to help us do the job. By far, the most
popular port scanning tool is [Nmap](https://nmap.org). Nmap is over
20 years old and is still being updated pretty regularly. Check out the
[official site](https://nmap.org) to see the other things it can do from [banner grabbing](https://en.wikipedia.org/wiki/Banner_grabbing) to
[hacking Matt Damon's brain in Elysium](https://nmap.org/movies/#elysium)
and for more complete documentation.

One tip before we start scanning that will take you straight from noticeable
novice to illusory intermediate is this: timing and patience matter. A default
port scan against a target will likely be caught by any IDS. Spacing your
scan out over several hours or even days will help you blend in with normal
traffic and reduce the chances of detection. Don't fret; Nmap has a way to
help.

Ok, we've got our tool; let's start scanning our target. We're going to be using
the Nmap command line tool, but there are graphical interfaces available.
Ignoring the advice in the previous paragraph, we'll break down a default scan

```text
C:\> nmap localhost
Starting Nmap 7.70 ( https://nmap.org ) at 2019-07-21 12:26 Pacific Daylight Time
Nmap scan report for localhost (127.0.0.1)
Host is up (0.00012s latency).
Other addresses for localhost (not scanned): ::1
Not shown: 994 closed ports
PORT     STATE SERVICE
135/tcp  open  msrpc
445/tcp  open  microsoft-ds
2222/tcp open  EtherNetIP-1
5000/tcp open  upnp
5357/tcp open  wsdapi
5432/tcp open  postgresql

Nmap done: 1 IP address (1 host up) scanned in 5.95 seconds
```

This one is pretty straightforward. The second argument is your target, which
can be a hostname, IP address, a CIDR block, etc. The default Nmap scan here
checked for 1000 commonly used ports. We can already glean some useful info.
Looking at the easy-to-read output, you can probably guess that the target
(in my case: myself) is running Windows. From here we can start looking up
possible exploits for each service. That's outside the scope of this post.

Another thing to note about this output is the `SERVICE` column isn't
necessarily what's running on that port, but rather the most common service
that runs on that port. For example, I have an http server running on port
5000, but the service listed is upnp. Don't take the `SERVICE` value for granted
and do some additional prodding.

Of course, I have far more ports open on that lab computer. Scanning all
65,535 ports is sure to grab the attention of the port authority, so it's better
to be specific if you have particular exploits in mind. Otherwise, be prepared
to wait weeks to enumerate over a large network to avoid detection.
Unfortunately, if you're in the security industry, you likely have some hard
time constraints that put you at a disadvantage versus a determined malicious
hacker with a single target.

A full port scan looks like this:

```text
C:\>nmap localhost -p-
Starting Nmap 7.70 ( https://nmap.org ) at 2019-07-21 12:48 Pacific Daylight Time
Nmap scan report for localhost (127.0.0.1)
Host is up (0.00034s latency).
Other addresses for localhost (not scanned): ::1
Not shown: 65512 closed ports
PORT      STATE    SERVICE
135/tcp   open     msrpc
137/tcp   filtered netbios-ns
445/tcp   open     microsoft-ds
2222/tcp  open     EtherNetIP-1
5000/tcp  open     upnp
5040/tcp  open     unknown
5354/tcp  open     mdnsresponder
5357/tcp  open     wsdapi
5432/tcp  open     postgresql
6942/tcp  open     unknown
27015/tcp open     unknown
28080/tcp open     unknown
35729/tcp open     unknown
49664/tcp open     unknown
49665/tcp open     unknown
49666/tcp open     unknown
49667/tcp open     unknown
49668/tcp open     unknown
49671/tcp open     unknown
49676/tcp open     unknown
58365/tcp open     unknown
59546/tcp open     unknown
63342/tcp open     unknown

Nmap done: 1 IP address (1 host up) scanned in 12.06 seconds
```

I've added the `-p-` argument here. This can also be a single port like
`-p 80` or a range like `-p 2000-5000`. We can see there's lots of other ports
open and Nmap isn't going to tell us what's on them. The interwebz has some
cool resources, though.
[Here's what might be running on port 27015](https://www.speedguide.net/port.php?port=27015).

## Acronym Reference

* **ACK**: Acknowledge
* **ECC**: EC-Council, International Council of Electronic Commerce Consultants
* **IDS**: Intrusion Detection System
* **RST**: Reset
* **SYN**: Synchronize


