# generator-fyddaben 

> [Yeoman](http://yeoman.io) generator

## ToDoList

- 多使用，多完善

## 功能点

- less,sass选择
- jshint语法检查
- requirejs模块编译
- 增加`js,css`的`md5`版本号

## 注意点
### 1.安装方式
> 由于npm 的上传，自己没有经常更新，请不用用`npm instal -g generator-fyddaben`的方式安装

- 采用 `cd generator-fyddaben`
- 然后 `sudo npm install`
- 然后 `sudo npm link`

### 2.目录等级
```
├── app
│   ├── cssmin
│   ├── index.html
│   └── jsmin
├── bower.json
├── build
│   ├── index.html
│   ├── javascripts
│   └── sass
├── gulpfile.js
├── node_modules
│   ├── gulp
│   ├── gulp-jshint
│   ├── gulp-md5-assets
│   ├── gulp-minify-css
│   ├── gulp-rename
│   ├── gulp-requirejs-optimize
│   ├── gulp-sass
│   ├── gulp-uglify
│   ├── jshint-stylish
│   └── stream-combiner2
└── package.json
```
- `app`目录为访问地址,即非编辑区域，禁止编辑这个目录下的文件,生成后的区域
- `build`目录为源文件地址，即编辑区域


## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-fyddaben from npm, run:

```bash
npm install -g generator-fyddaben
```

Finally, initiate the generator:

```bash
yo fyddaben
```

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

MIT
