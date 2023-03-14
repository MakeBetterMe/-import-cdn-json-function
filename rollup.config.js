import {babel} from '@rollup/plugin-babel';
import terser from "@rollup/plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import {DEFAULT_EXTENSIONS} from '@babel/core';
import json from '@rollup/plugin-json';
// import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    {
      format: 'es',
      file: './dist/index.esm.js',
    },
    {
      format: 'umd',
      file: './dist/index.umd.js',
      name: 'import-cdn-json-function',
    },
  ],
  plugins: [
    json(),
    nodeResolve(),
    commonjs(),
    terser(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime'
    })
  ]
};
