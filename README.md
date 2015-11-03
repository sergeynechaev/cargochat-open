# Cargo.chat
> React.js + Router + webpack + babel

## Usage

First, you need to install npm and node on your machine:  
[npm](https://www.npmjs.com/)  
[node](https://nodejs.org/en/download/package-manager/)

Clone this repo into your local folder.

Then, run:
```shell
npm i
```

Run dev server powered by [webpack-dev-server](http://webpack.github.io/docs/webpack-dev-server.html):

```shell
npm run dev
```

Access to project at 
```shell
localhost:8081 or 127.0.0.1:8081.
```

If it doesn't work, try to change port `8080` to `8081` in file `node_modules\webpack-dev-server\bin\webpack-dev-server.js`


For production run:

```shell
npm deploy
```

For production in windows run:

```shell
webpack --progress -p -v --config webpack.production.config.js
```

without minification:

```shell
webpack --progress -v --config webpack.production.config.js
```


## Development

Modify the files under `/client` directory.



## Production

See the folder `/public`

