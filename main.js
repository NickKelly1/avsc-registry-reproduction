import avro from 'avsc'

/** Use this type for longs instead of the avsc in-built long type */
const bigintLongType = avro.types.LongType.__with({
	/**
	 * @param {Buffer} buf
	 * @returns {bigint}
	 */
	fromBuffer(buf) {
		const value = buf.readBigInt64LE()
		return value
	},
	/**
	 * @param {bigint} n
	 * @returns {Buffer}
	 */
	toBuffer(n) {
		const buf = Buffer.alloc(8)
		buf.writeBigInt64LE(n)
		return buf
	},
	fromJSON: BigInt,
	toJSON: BigInt,
	/**
	 * @param {bigint} n
	 * @returns {boolean}
	 */
	isValid(n) {
		return typeof n === 'bigint'
	},
	/**
	 * @param {bigint} n1
	 * @param {bigint} n2
	 * @returns {number}
	 */
	compare(n1, n2) {
		if (n1 === n2) return 0
		if (n1 < n2) return -1
		return 1
	}
})

export const registry = {
	long: bigintLongType,
}

const longType1 = avro.Type.forSchema('long', { registry })
console.log('Serializing long type 1') // Serializing long type 1
const buf1 = longType1.toBuffer(1n)
console.log('buf1', buf1) // buf1 <Buffer 02>

const longType2 = avro.Type.forSchema({ type: 'long' }, { registry })
console.log('Serializing long type 2') // Serializing long type 2
const buf2 = longType2.toBuffer(1n)
// node:internal/util/inspect:2140
//     return JSONStringify(arg);
//            ^
//
// TypeError: Do not know how to serialize a BigInt
//     at stringify (<anonymous>)
//     at tryStringify (node:internal/util/inspect:2140:12)
//     at formatWithOptionsInternal (node:internal/util/inspect:2224:25)
//     at format (node:internal/util/inspect:2161:10)
//     at throwInvalidError (<cwd>/node_modules/avsc/lib/types.js:3042:19)
//     at LongType._write (<cwd>/node_modules/avsc/lib/types.js:927:5)
//     at Type.toBuffer (<cwd>/node_modules/avsc/lib/types.js:658:8)
//     at file://<cwd>/main.js:53:24
//     at ModuleJob.run (node:internal/modules/esm/module_job:262:25)
//     at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:483:26)
//
// Node.js v22.9.0
console.log('buf2', buf2)

