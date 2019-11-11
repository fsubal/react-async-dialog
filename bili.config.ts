import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/index.ts',
  plugins: {
    typescript2: typescript()
  },
  output: {
    format: ['cjs', 'esm']
  }
}
