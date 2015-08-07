# RiotTS

Use Muut's [Riot.js](https://muut.com/riotjs/) minimalistic framework from TypeScript.

# Table of contents

- [Installation](#install)
- [Supported features](#features)
- [How to write elements](#howtowrite)
- [How to correctly reference in markup](#howtoreference)
- [The @template decorator](#template)
- [Lifecycle events shortcuts](#lifecycle)
- [How to create elements programmatically](#creating)
- [Observables](#observables)
- [Router](#router)
- [Examples](#examples)
   - [A timer-based counter element](#timer_example)   
- [Running the tests](#repoexample)
- [Known issues](#knownissues)
- [Contributing](#contributing)
- [Changelog](#changelog)

# Installation <a name="install"></a>

Install via bower:
```
bower install --save riot-ts
```

This will also install `riot.js`.

You'll get the following files in `bower_components\riot-ts`:
- `riot-ts.js` the JavaScript file to load via `<script src="">`
- `riot-ts.min.js` as above, minified
- `riot-ts.d.ts` the file to reference in your TypeScript code (`/// <reference path="...">`)
- `riot-ts.ts` the source TypeScript file for debugging purposes

# Supported features <a name="features"></a>                           

- write elements as ES6 classes
- `@template()` sets template from string or URL
- `className.register()` registers the element in Riot
- class constructor receives `options` as parameter

# How to write elements <a name="howtowrite"></a>

Differently from pure [Riot.js](https://muut.com/riotjs/), in RiotTS elements are written 
as TypeScript classes extending the type `Riot.Element`. 

There are no external `.tag` files, HTML templates are defined as pure strings or are loaded from `.html` files.

In brief:

- Write elements as TypeScript classes
- Extend the `Riot.Element` class 
- Use `@template` to define the template string or load it from URL
- register the element in riot via `className.register()`.
- manually create istances with `className.createElement()`.

A class-element:
- can have private properties/fields
- can use inherited properties and methods
- can use TypeScript Mixins
- `options` are passed to the class constructor

# How to correctly reference in markup <a name="howtoreference"></a>

In the `head` section of your main .html file:

```HTML
<head>
   <!-- loads riot and riot-ts -->
   <script type="text/javascript" src="bower_components/riot/riot.js"></script>        
   <script type="text/javascript" src="bower_components/riot/compiler.js"></script>        
   <script type="text/javascript" src="bower_components/riot-ts/riot-ts.js"></script>   

   <!-- custom elements -->
   <script type="text/javascript" src="elements/my-element.js"></script>      

   <!-- your application -->
   <script src="myapp.js"></script>            
</head>
```

In your element TypeScript code (e.g. `elements/my-element.ts`):

```TypeScript
@template("my-element.html")
class MyElement extends Riot.Element
{
   // ...
}

// after the element is defined, we register it in Riot
MyElement.register();
```

In `elements/my-element.html`:

```HTML
<!-- notice there is no <my-element> tag -->
<my-element>
   <div>
      This is a my custom element
   </div>
</my-element>
```

In your main application file:

```TypeScript
/// <reference path="../bower_components/riot-ts/riot-ts.d.ts" />

//...

riot.mount('*');
```

# The @template decorator <a name="template"></a>

```
@template(param)
```

Sets the template for the element. The template parameter can be either:

- a literal string e.g. `"<my-hello><div>hello</div></my-hello>"`
- an external file ending in `.html` to be loaded syncronously

Example of an element `<my-hello>`:
 
```TypeScript
@template("<my-hello><div>hello</div></my-hello>")
class MyHello extends Riot.Element
{
}
```

# Lifecycle events shortcuts <a name="lifecycle"></a>

Lifecycle events can be listened via `this.on()` or by defining the following methods in the class:

- `mounted()` for the `mount` event
- `unmounted()` for the `unmount` event
- `updating()` for the `update` event
- `updated()` for the `updated` event

Note: names ending in "-ed" have been choosen to not clash with already methods on the `Riot.Element` interface.

Example:

```TypeScript
@template("<myel><span></span></myel>")
class MyEl extends Riot.Element {
   constructor(opts) {      
      super();
      
      // first way to listen to unmount event
      this.on("unmount",()=>
      {         
      });
   }
      
   // alternated shorter way 
   unmounted()   
   {               
   }
}
```

# How to create elements programmatically <a name="creating"></a>

To create an element to be attached to the DOM use the `creaeElement(opts)` method:

```TypeScript
var root = querySelector('#put_here');
el = test1.createElement();                
root.appendChild(el);         
```

The created element is an instance of `HTMLElement`. To access the related riot-element:

```
var riotel = (el as any)._tag;  // ._tag is undocumented
```

# Observables <a name="observables"></a>

The Riot library lets you define `Observable` objects that are not UI elements:
```TypeScript
class MyObservable extends Riot.Observable 
{
   doSomething()
   {
      this.trigger("something-done");
   }
}

var a = new MyObservable();

a.on("something-done", ()=> {
   console.log("something has been done on 'a'!");
});
```

# Router <a name="router"></a>

The Riot library comes also with a minimalistic router, the API is the same also in TypeScript.

Example:

```TypeScript
// install router hash changed function
riot.route((id,username) =>
{
   console.log(`hash changed to: id=${id} username=${username}`);
});

// start the router
riot.route.start();

// route to an address
riot.route("welcome/nino.porcino");

// stop the router
riot.route.stop();
```

# Examples <a name="examples"></a>

### A timer-based counter element <a name="timer_example"></a>
```TypeScript
@template(`
<timer>
   <div>
      timer: { time }<br>
      trasclusion is '<yield/>'<br>                 
      <div each="{el in mylist}">iterating over array item "{el}"<br></div>
   </div>
</timer>`)

class Timer extends Riot.Element {
   time: number;
   timerHandle: number;  

   mylist = ["one","two","three"];
   
   // initializes the element with opts
   constructor(opts) {      
      super();
      this.time=opts.time||0;
      this.timerHandle=setInterval(() => this.ticks(),1000);      
   }
      
   ticks() {
      this.time++;
      this.update();  // refreshes the element
   }

   // handles the unmount event 
   unmounted()   
   {         
      clearInterval(this.timerHandle);
   }
}
```

Then install the element and mount on the page with:

```TypeScript
Timer.register();

riot.mount('*');   // mounts all elements
```

# Running the tests <a name="repoexample"></a>

To run the "Test" project containing the Jasmine specs:

- clone this repo `nippur72/RiotTS`
- go to the `Test` directory
- run `bower update`
- Open the solution in Visual Studio and run the "Test" project.

# Known issues <a name="knownissues"></a>

- none (at the moment)

# Contributing <a name="contributing"></a>

Contributions are welcome.

If you find bugs or want to improve it, just send a pull request.

# Change log <a name="changelog"></a>
- v0.0.8
   - new @template syntax, @component syntax obsolete
- v0.0.6
   - deprecated loading templates from named tags
- v0.0.5
   - addded method `createElement()`
- v0.0.0 to v0.0.4
   - early experimental versions 
