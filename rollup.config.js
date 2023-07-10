import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import progress from 'rollup-plugin-progress';
import filesize from 'rollup-plugin-filesize';
import pkg from './package.json';

const inputPath = './src'

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 *
 * ${pkg.author}
 */
`;

const extensions = ['.ts', '.js'];

const jsPlugins = [
  commonjs(),
  json(),
  resolve({ extensions }),
  progress(),
  filesize({
    showGzippedSize: true,
  }),
  babel({
    exclude: 'node_modules/**',
    include: [`${inputPath}/**/*`],
    extensions,
    babelHelpers: 'bundled',
  }),
  terser()
];

export default [{
  input: `${inputPath}/index.ts`,
  output: [{
    file: pkg.main,
    format: 'umd',
    banner,
    name: 'ym',
    sourcemap: true,
  }],
  plugins: jsPlugins
}, {
  input: `${inputPath}/index.ts`,
  output: {
    file: pkg.module,
    banner,
    format: 'es',
    name: 'ym',
    sourcemap: true,
  },
  plugins: [
    ...jsPlugins,
    typescript({
      emitDeclarationOnly: true,
      declaration: true,
    })
  ]
}];
