import vue from 'rollup-plugin-vue';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  inlineDynamicImports: true,
  output: [
    {
      dir: 'dist',
      format: 'cjs'
    },
    {
      file: 'dist/index.esm.js',
      format: 'es'
    }
  ],
  external: ['vue', '@vudel/core', '@vudel/validations'],
  plugins: [
    vue(),
    typescript({ tsconfig: './tsconfig.build.json' })
  ]
};