import babel from 'rollup-plugin-babel';

export default {
    moduleName: '$4d',
    entry: './src/4d.js',
    plugins: [babel({
        babelrc: false,
        presets: ["es2015-rollup"]
    })],
    format: 'umd',
    dest: './dist/4d.js'
};
