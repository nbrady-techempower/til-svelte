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

For the purpose of this exercise, where going to assume we've done some basic
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
certain firewalls and avoids some IDS.

* **Open**: No response
* **Closed**: Will respond with an RST/ACK

## Acronym Reference

* **ACK**: Acknowledge
* **ECC**: EC-Council, International Council of Electronic Commerce Consultants
* **IDS**: Intrusion Detection System
* **RST**: Reset
* **SYN**: Synchronize


