module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }],
    'next/babel'
  ],
  plugins: ['@babel/plugin-proposal-class-properties']
}
