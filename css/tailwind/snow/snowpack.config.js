// snowpack.config.mjs
module.exports = {
  mount: {
    src: '/_dist',
    public: '/',
  },
 devOptions: {
   tailwindConfig: './tailwind.config.js',
 },
 plugins: [
   '@snowpack/plugin-postcss',
 ],
};
