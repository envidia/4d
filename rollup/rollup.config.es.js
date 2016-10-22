import babel from 'rollup-plugin-babel';

export default {
    moduleName: '$4d',
    entry: 'src/4d.js',
    plugins: [babel({
        babelrc: false,
        exclude: 'node_modules/**'
    })],
    format: 'es',
    dest: 'dist/4d.es.js'
};
