# nStatic generator [![Build Status](https://secure.travis-ci.org/nelsyeung/generator-nstatic.png?branch=master)](https://travis-ci.org/nelsyeung/generator-nstatic)

> [Yeoman](http://yeoman.io) generator for a static website. It lets you quickly set up a project with sensible defaults and best practices. Yet so minimal that everything can easily be changed to your needs.

There are too many generators that generates projects with too many tools that one might not need and complicated setup such that editing the project becomes difficult. This generator aims to scaffold a simple structure, starting code and configurations. Even this generator is aimed to have a simple code base. Currently this generator will generate a simple setup without tests.

## Getting Started

Install all the required packages:
```bash
npm install -g bower yo generator-nstatic
```

Install `grunt-cli` or `gulp` depending on your needs.
```
npm install -g grunt-cli
npm install -g gulp
```

Make a new directory, and `cd` into it:
```
mkdir my-project && cd $_
```

Initiate the generator:
```bash
yo nstatic
```

That's it! Run `grunt` or `gulp` depending on what you've chosen and load up the website with `http://localhost:3000`.


## What's inside
* connect
* sass
* autoprefixer
* watch
* wiredep
* usemin
* AngularJS
* jQuery

I try to keep the amount of tools to the minimal as well. It includes a jshintrc file but not JSHint since linting can be done via the editor. Please add any other configurations to your needs.

## License

MIT
