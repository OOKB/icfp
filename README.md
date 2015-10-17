# icfp

[![Join the chat at https://gitter.im/OOKB/icfp](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/OOKB/icfp?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

The source data was a bit crazy but I think we figured out how to turn the data into something useful.

Idea with this is to turn a json feed into some hackish html/xml stuff to be imported into Adbove InDesign. From there footer/header and extra pages get added and then it's turned into a fancy PDF doc and sent to the printer.

Each of the pages is a section of the pdf. It takes a second or two to render because its tons of data.

## Running

It takes a minute after npm start to fetch and process the data from the source. When you see `return new data` in the terminal console you're good to open the app. http://localhost:3000/

```
npm i
npm start
```
