module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  env: {
    debug: {
      sourceMaps: true,
      retainLines: true
    }
  },
  plugins: [
    [
      'import',
      {
        libraryName: 'xl-ui-vue',
        customStyleName: (name) => {
          // name = name.slice(3, 1).toLowerCase() + name.slice(4)
          return 'xl-ui-vue/lib/' + name + '/style.css'
        }
      }
    ]
  ]
}
