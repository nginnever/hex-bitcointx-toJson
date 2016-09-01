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
function myProgram (bytecode) {
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
myProgram(process.argv[2])
