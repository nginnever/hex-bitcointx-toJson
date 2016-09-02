##Requirements

- Nodejs
- npm

##Install

// TODO: export module and api
```
npm i hex-bitcointx-tojson
```

Current install process

```
git clone https://github.com/nginnever/hex-bitcointx-toJson.git
cd hex-bitcointx-toJson
npm i
```

##Usage

```
node myprogram.js <bytecode transaction>
```

##Example

```
node myprogram.js 0100000001d8be4b8f39670aec2024f6e6fe1b4a7a3009eb91c12f141a25eab7a77a2760f5000000006b483045022100bd6027b4015c3701bd2ba949af4cdd16bd88a15a5a6bb39b06aa77967d2182ac02202b7175221b90dfc67fa402e25f963b6459a9aa6259b10c7b0fbb0cce764ecac60121027b13af064c43cee9dac1c1010e2e1f55a17363c161d0b9017ad6dff4aee2f0b1ffffffff0240634715000000001976a9143ba02668541a203b88a8fa87e3b9655d95700a1488acf5760a08000000001976a914eb591b4a5485656f72fa2dee496821611b33a85888ac00000000

>> output

{
   "version": 1,
   "inputs": [
      {
         "output_index": 0,
         "prev_output": "f560277aa7b7ea251a142fc191eb09307a4a1bfee6f62420ec0a67398f4bbed8",
         "script_len": 107,
         "script_sig": "483045022100bd6027b4015c3701bd2ba949af4cdd16bd88a15a5a6bb39b06aa77967d2182ac02202b7175221b90dfc67fa402e25f963b6459a9aa6259b10c7b0fbb0cce764ecac60121027b13af064c43cee9dac1c1010e2e1f55a17363c161d0b9017ad6dff4aee2f0b1",
         "sequence": 4294967295
      }
   ],
   "outputs": [
      {
         "value": 357000000,
         "script_len": 25,
         "pk_script": "76a9143ba02668541a203b88a8fa87e3b9655d95700a1488ac",
         "address": "16SGijkfCSAeZd37nuNREPqBFtE3Dxe7vg"
      },
      {
         "value": 134903541,
         "script_len": 25,
         "pk_script": "76a914eb591b4a5485656f72fa2dee496821611b33a85888ac",
         "address": "1NTQYKJD7Th6ZUv9trK7mbxmQ678LYR15M"
      }
   ],
   "lock_time": 0
}
```

##Example: 1 input 3 outputs

```
node myprogram.js 0100000001268a9ad7bfb21d3c086f0ff28f73a064964aa069ebb69a9e437da85c7e55c7d7000000006b483045022100ee69171016b7dd218491faf6e13f53d40d64f4b40123a2de52560feb95de63b902206f23a0919471eaa1e45a0982ed288d374397d30dff541b2dd45a4c3d0041acc0012103a7c1fd1fdec50e1cf3f0cc8cb4378cd8e9a2cee8ca9b3118f3db16cbbcf8f326ffffffff0350ac6002000000001976a91456847befbd2360df0e35b4e3b77bae48585ae06888ac80969800000000001976a9142b14950b8d31620c6cc923c5408a701b1ec0a02088ac002d3101000000001976a9140dfc8bafc8419853b34d5e072ad37d1a5159f58488ac00000000
>output
{
   "version": 1,
   "inputs": [
      {
         "output_index": 0,
         "prev_output": "d7c7557e5ca87d439e9ab6eb69a04a9664a0738ff20f6f083c1db2bfd79a8a26",
         "script_len": 107,
         "script_sig": "483045022100ee69171016b7dd218491faf6e13f53d40d64f4b40123a2de52560feb95de63b902206f23a0919471eaa1e45a0982ed288d374397d30dff541b2dd45a4c3d0041acc0012103a7c1fd1fdec50e1cf3f0cc8cb4378cd8e9a2cee8ca9b3118f3db16cbbcf8f326",
         "sequence": 4294967295
      }
   ],
   "outputs": [
      {
         "value": 39890000,
         "script_len": 25,
         "pk_script": "76a91456847befbd2360df0e35b4e3b77bae48585ae06888ac",
         "address": "18tTpf3YY3RBVguKXJxfs9Kv3eKCRuFohC"
      },
      {
         "value": 10000000,
         "script_len": 25,
         "pk_script": "76a9142b14950b8d31620c6cc923c5408a701b1ec0a02088ac",
         "address": "14vniKtB4oZDFZLJGyhy1MFtGUTJquN655"
      },
      {
         "value": 20000000,
         "script_len": 25,
         "pk_script": "76a9140dfc8bafc8419853b34d5e072ad37d1a5159f58488ac",
         "address": "12GxKg3ojpCbc9DQb6b4M6AScU6mRbNiUC"
      }
   ],
   "lock_time": 0
}
```


##Bytecode

#### Input

```
0100000001d8be4b8f39670aec2024f6e6fe1b4a7a3009eb91c12f141a25eab7a77a2760f5000000006b483045022100bd6027b4015c3701bd2ba949af4cdd16bd88a15a5a6bb39b06aa77967d2182ac02202b7175221b90dfc67fa402e25f963b6459a9aa6259b10c7b0fbb0cce764ecac60121027b13af064c43cee9dac1c1010e2e1f55a17363c161d0b9017ad6dff4aee2f0b1ffffffff0240634715000000001976a9143ba02668541a203b88a8fa87e3b9655d95700a1488acf5760a08000000001976a914eb591b4a5485656f72fa2dee496821611b33a85888ac00000000
```

#### Break down

```
01 00 00 00 = version

01 = number of inputs

d8 be 4b 8f 39 67 0a ec - 20 24 f6 e6 fe 1b 4a 7a = Outpoint TXID
30 09 eb 91 c1 2f 14 1a - 25 ea b7 a7 7a 27 60 f5

00 00 00 00 = Outpoint index number

6b = Bytes in sig. script: 107

48 30 45 02 21 00 bd 60 - 27 b4 01 5c 37 01 bd 2b = signature script (scriptSig)
a9 49 af 4c dd 16 bd 88 - a1 5a 5a 6b b3 9b 06 aa
77 96 7d 21 82 ac 02 20 - 2b 71 75 22 1b 90 df c6
7f a4 02 e2 5f 96 3b 64 - 59 a9 aa 62 59 b1 0c 7b
0f bb 0c ce 76 4e ca c6 - 01 21 02 7b 13 af 06 4c
43 ce e9 da c1 c1 01 0e - 2e 1f 55 a1 73 63 c1 61
d0 b9 01 7a d6 df f4 ae - e2 f0 b1

ff ff ff ff = Sequence number: UINT32_MAX

02 = Output Transactions 

Output: 1
40 63 47 15 00 00 00 00 = little endian value in satoshi (357000000)
19 = pk_script is 25 bytes long
76 a9 14 3b a0 26 68 54 - 1a 20 3b 88 a8 fa 87 e3 = pk_script
b9 65 5d 95 70 0a 14 88 - ac

Output: 2
f5 76 0a 08 00 00 00 00 = little endian value in satoshi (134903541)
19 = pk_script is 25 bytes long
76 a9 14 eb 59 1b 4a 54 - 85 65 6f 72 fa 2d ee 49
68 21 61 1b 33 a8 58 88 - ac

00 00 00 00 = Locktime
```

