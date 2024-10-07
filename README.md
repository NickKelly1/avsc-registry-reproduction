# AVSC issue 485 reproduction: Registry not respected when schema input is an object

Reproduction for this issue in `avsc` https://github.com/mtth/avsc/issues/485

Tested with `avsc@5.7.7` and NodeJS `v22.9.0`

```
# Use NodeJS version 22.9.0
# (if you have nvm installed) nvm use

npm install

node ./main.js
# Serializing long type 1 ()
# buf1 <Buffer 02>
# Serializing long type 2
#  node:internal/util/inspect:2140
#      return JSONStringify(arg);
#             ^
# 
#  TypeError: Do not know how to serialize a BigInt
#      at stringify (<anonymous>)
#      at tryStringify (node:internal/util/inspect:2140:12)
#      at formatWithOptionsInternal (node:internal/util/inspect:2224:25)
#      at format (node:internal/util/inspect:2161:10)
#      at throwInvalidError (<cwd>/node_modules/avsc/lib/types.js:3042:19)
#      at LongType._write (<cwd>/node_modules/avsc/lib/types.js:927:5)
#      at Type.toBuffer (<cwd>/node_modules/avsc/lib/types.js:658:8)
#      at file://<cwd>/main.js:53:24
#      at ModuleJob.run (node:internal/modules/esm/module_job:262:25)
#      at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:483:26)
# 
#  Node.js v22.9.0

```

