<div align="center">
  <img src="./assets/images/logo.png" width="50%" />
</div>

## Installation

```bash
git clone https://github.com/itsmais/time-it-app.git
cd time-it-app
npm install
```

## Development

Start the app in the `dev` environment:

```bash
npm start
```

## Packaging for Production

Before attempting to package the app, add the following to `webpack.config.base.js` in `node_modules`.

```js
{test: /\.js$/ , loader:'babel-loader', exclude: '/node_modules/'},
{test: /\.jsx$/ , loader:'babel-loader', exclude: '/node_modules/'}
```
To package for the local platform:

```bash
npm run-script build
npm run-script package // yarn package
```  

## Docs

Coming soon.

## Contributing

Coming soon.

## Featrures that should be implemented:
- fix the overall layout - Settings page
- add an extract data option - Settings page
- add button loaders / make buttons change when actions are completed - Settings page
- add a sidebar toggle button


## Developers and Maintainers

- [Mais](https://github.com/itsmais)

## License

GNU General Public License. Credits are required for code reuse from this repository.
