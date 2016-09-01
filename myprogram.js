'use strict'

let outputStart

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
  var index = 5
  var scriptlen
  var templen
  // In counter 
  // next 1-9 bytes encode the number of input txs
  const inCount = parseInt(bytes[4], 16)

  for (var i = 0; i < inCount; i++) {

    var prev = toLittleEndian(bytes.slice(5, 41)).join('')
    const script = bytes.slice(42, 149).join('')
    var outindex = prev.slice(0, 8)
    var seq = bytes.slice(149,153).join('')
    seq = parseInt(seq, 16)
    outindex = parseInt(outindex, 16)
    prev = prev.slice(8, 72)

    resArr.push({
      output_index: outindex,
      txid: prev,
      script_sig: script,
      sequence: seq
    })
    templen = parseInt(bytes[index + 36], 16)
    index += (36 + templen + 4 + 1)
        //outputStart = 154
  }
  outputStart = index + 1
  return resArr
}

function outputs (bytes) {
  var outputs = []
  var index = outputStart
  var pk_script_len
  // This index should be variable
  var numOutputs = parseInt(bytes[index -1], 16)
  
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
  
  console.log(JSON.stringify(output, null, 3) + '\n')
}

// CLI exposed
myProgram(process.argv[2])

// 0100000002d8be4b8f39670aec2024f6e6fe1b4a7a3009eb91c12f141a25eab7a77a2760f5000000006b483045022100bd6027b4015c3701bd2ba949af4cdd16bd88a15a5a6bb39b06aa77967d2182ac02202b7175221b90dfc67fa402e25f963b6459a9aa6259b10c7b0fbb0cce764ecac60121027b13af064c43cee9dac1c1010e2e1f55a17363c161d0b9017ad6dff4aee2f0b1ffffffffd8be4b8f39670aec2024f6e6fe1b4a7a3009eb91c12f141a25eab7a77a2760f5000000006b483045022100bd6027b4015c3701bd2ba949af4cdd16bd88a15a5a6bb39b06aa77967d2182ac02202b7175221b90dfc67fa402e25f963b6459a9aa6259b10c7b0fbb0cce764ecac60121027b13af064c43cee9dac1c1010e2e1f55a17363c161d0b9017ad6dff4aee2f0b1ffffffff0240634715000000001976a9143ba02668541a203b88a8fa87e3b9655d95700a1488acf5760a08000000001976a914eb591b4a5485656f72fa2dee496821611b33a85888ac00000000
// 01000000017b1eabe0209b1fe794124575ef807057c77ada2138ae4fa8d6c4de0398a14f3f00000000494830450221008949f0cb400094ad2b5eb399d59d01c14d73d8fe6e96df1a7150deb388ab8935022079656090d7f6bac4c9a94e0aad311a4268e082a725f8aeae0573fb12ff866a5f01ffffffff01f0ca052a010000001976a914cbc20a7664f2f69e5355aa427045bc15e7c6c77288ac00000000
