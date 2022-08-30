/*
 * @Author: hanjing
 * @Date: 2022-08-29 19:38:27
 * @LastEditTime: 2022-08-30 10:38:18
 */
const args = require('minimist')(process.argv.slice(2))
const { build } = require('esbuild');
const { resolve } = require('path')
console.log(args);

// minist 用来解析命令行参数的
const target = args._[0] || 'reactivity'
const format = args.f || 'global'

// 开发环境只打包某一个
const pkg = require(resolve(__dirname, `../packages/${target}/package.json`))

// iife 立即执行函数 (function(){}())
// cjs node中的模块 module.export
// esm 浏览器中的esModule模块 import
const outputFarmat = format.startsWith('global') ? 'iife' : format === 'cjs' ? 'cjs' : 'esm'

const outfile = resolve(__dirname, `../packages/${target}/dist/${target}.${format}.js`)

// 默认支持ts
build({
    entryPoints: [resolve(__dirname, `../packages/${target}/src/index.ts`)],
    outfile,
    bundle: true, //把所有的包全部打包到一起
    sourcemap: true,
    format: outputFarmat, // 输出格式
    globalName: pkg.buildOptions?.name, // 打包的全局名字
    platform: format === 'cjs' ? 'node' : 'browser', // 平台
    watch: { //监控文件变化
        onRebuild (errer) {
            if (!errer) console.log("rebuild----")
        }
    }
}).then(() => { console.log('watching----'); })
