find-node-dependents
===========================================

A script to recursively find the dependents packages of a node package. 
Prints the node packageID along with the node package description. Originally meant
to track the **node-ipc supply chain attack  (CVE-2022-23812)**. 

https://security.snyk.io/vuln/SNYK-JS-NODEIPC-2426370

https://github.com/advisories/GHSA-97m3-w2cp-4xx6

I managed to run this up to a thousand deps before the API kicked me out (DDoS protection). Turns out the impact is very large (Vue, Unity, etc).

# Usage
1. Requires node/npm. Install following the official documentation

2. clone and install dependencies
```shell
git clone <> && cd <>
npm i
```
3. run
```shell
./app.js <package> [<depth>]
```

where depth by default is 1 (no recursion). 

NOTE: API will probably hang if you run this for too many packages...

# Example
```shell
% ./app.js node-ipc
#	DEPTH	NAME	DESCRIPTION
0	0	node-cluster-client	nodejs cluster client based on node-ipc and proxy
1	0	single-socket	Share a single websocket connection through a proxy server
2	0	@nkduy/cli-ui	### Local development
3	0	truffle-conflux-environment	This package contains the code needed to determine environment-specific data
4	0	@runapm/daemon	An extensible, daemonized process manager.
5	0	@oumi/cli-shared-utils	shared utilities for oumi-cli packages
6	0	mocha-json-to-file	Prints test results in JSON and outputs to file. 
7	0	phenix-utils	> TODO: description
8	0	@vibe-reporting/ipc-connect	undefined
9	0	@fzo/fzo-utils	utilities for fzo packages
10	0	envex	Highly configurable env var launcher. Supports using async JS function calls and bash-style command expansion $(...)
11	0	typescript-imba-plugin	imba plugin for tsserver
12	0	zionbox-service	Service Module - This is a secured and decentralized file system on the web!
13	0	keshr	Keshr is Node.js task scheduler, cacher and notification manager.
14	0	smartech-cli	Cliente de Smartech - Tech & Solve
15	0	movilitas.cloud-cli	CLI
16	0	jest-electrochrome-core	Shared code for Jest test runner packages
17	0	minecraftpanel	Bare-bones minecraft panel for my recording server
18	0	stream-node-ipc	`node-ipc` as Duplex streams
19	0	fixture-injection	A JavaScript test helper to inject fixtures
20	0	truffle-environment	This package contains the code needed to determine environment-specific data
21	0	egg-cluster-script	egg cluster start bin
22	0	cli-shared-utils-ttn	shared utilities for vue-cli packages
...(etc)
```


