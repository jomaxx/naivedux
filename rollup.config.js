import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/naivedux.js',
  format: 'cjs',
  plugins: [
    babel(),
  ],
  dest: 'lib/naivedux.js'
};
