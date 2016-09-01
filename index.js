'use strict'

// Internal functions
function toLittleEndian (bytearr) {
	return bytearr.reverse()
}
function version (bytes) {
	bytes = bytes.slice(0, 3)
	bytes = toLittleEndian(bytes)
	var formatted = bytes.join('')
	return parseInt(formatted, 16)
}

function inputs (bytes) {
	var resArr = []
	let index
	let len
  // In counter 
  // next 1-9 bytes encode the number of input txs
  const inCount = parseInt(bytes[4], 16)
  
  if (inCount === 1) {
	  var prev = toLittleEndian(bytes.slice(5, 41)).join('')
	  const script = bytes.slice(42, 149).join('')
	  var outindex = prev.slice(0, 8)
	  var seq = bytes.slice(149,153).join('')
	  seq = parseInt(seq, 16)
	  outindex = parseInt(outindex, 16)
	  prev = prev.slice(8, 72)

    resArr.push({
    	output_index: outindex,
    	prev_hash: prev,
    	script: script,
    	sequence: seq
    })

  } else {
  	// TODO: Handle more inputs
	  // for (var i = 0; i < inCount; i++) {
	  // 	if (i === 0) {
	  //     index = 4
	  //     len = parseInt(bytes[41], 16)
	  // 	}
	  // 	index += (36 + 4 + 1 + len + 4 - 3)  
	  //   // get the script sig length
	  //   len = bytes[index]
  }

  return resArr
}

function outputs (bytes) {
	var outputs = []
  var index = 154
  var pk_script_len
	// This index should be variable
  var numOutputs = parseInt(bytes[153], 16)
  
  for (var i = 0; i < numOutputs; i++) {
  	pk_script_len = parseInt(bytes[index + 8], 16)
    outputs.push({
    	value: parseInt(toLittleEndian(bytes.slice(index, index + 8)).join(''), 16),
    	pk_script: bytes.slice(index + 9, index + 9 + pk_script_len).join('')
    })
    index += pk_script_len + 8 + 1 
  }
  return outputs
}

function locktime (bytes) {
	return parseInt(bytes.slice(bytes.length - 4, bytes.length).join(''), 16)
}
// Main function
function convert (bytecode) {
	var output = {}
	var inputLen = bytecode.length
	if (!inputLen || inputLen % 2)
		throw new Error("Bad input")

	const hl = inputLen >> 1
	var code = new Array(hl)

	for (var i = 0; i < hl; i++) {
		code[i] = bytecode.substr(i * 2, 2)
	}
  
  // The first 4 bytes encodes the tx version number
  // Data type uint32_t
  output.version = version(code)

  // Decode the number of inputs
  output.inputs = inputs(code)

  // Decode output txs
  output.outputs = outputs(code)

  // Decode lock_time
  output.lock_time = locktime(code)

  // var test = toLittleEndian('0xd8be4b8f39670aec2024f6e6fe1b4a7a3009eb91c12f141a25eab7a77a2760f5')
  
  console.log(output)
}

// CLI exposed
convert(process.argv[2])


// 01 00 00 00 = version

// 01 = number of inputs

// d8 be 4b 8f 39 67 0a ec - 20 24 f6 e6 fe 1b 4a 7a = Outpoint TXID
// 30 09 eb 91 c1 2f 14 1a - 25 ea b7 a7 7a 27 60 f5

// 00 00 00 00 = Outpoint index number

// 6b = Bytes in sig. script: 107

// 48 30 45 02 21 00 bd 60 - 27 b4 01 5c 37 01 bd 2b = signature script (scriptSig)
// a9 49 af 4c dd 16 bd 88 - a1 5a 5a 6b b3 9b 06 aa
// 77 96 7d 21 82 ac 02 20 - 2b 71 75 22 1b 90 df c6
// 7f a4 02 e2 5f 96 3b 64 - 59 a9 aa 62 59 b1 0c 7b
// 0f bb 0c ce 76 4e ca c6 - 01 21 02 7b 13 af 06 4c
// 43 ce e9 da c1 c1 01 0e - 2e 1f 55 a1 73 63 c1 61
// d0 b9 01 7a d6 df f4 ae - e2 f0 b1

// ff ff ff ff = Sequence number: UINT32_MAX

// 02 = Output Transactions 

// Output: 1
// 40 63 47 15 00 00 00 00 = little endian value in satoshi (357000000)
// 19 = pk_script is 25 bytes long
// 76 a9 14 3b a0 26 68 54 - 1a 20 3b 88 a8 fa 87 e3 = pk_script
// b9 65 5d 95 70 0a 14 88 - ac

// Output: 2
// f5 76 0a 08 00 00 00 00 = little endian value in satoshi (134903541)
// 19 = pk_script is 25 bytes long
// 76 a9 14 eb 59 1b 4a 54 - 85 65 6f 72 fa 2d ee 49
// 68 21 61 1b 33 a8 58 88 - ac

// 00 00 00 00 = Locktime