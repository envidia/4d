import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
    moduleName: '$4d',
    entry: './src/4d.js',
    plugins: [
    	babel({
        	babelrc: false,
        	presets: ["es2015-rollup"]
	    }),
	   	nodeResolve({
	        jsnext: true,
	        main: true
	    })
    ],
    format: 'umd',
    dest: './dist/4d.js'
};