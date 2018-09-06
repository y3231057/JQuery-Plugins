# JQuery-Plugins
---
Plugins list:
- Bandwidth test

#### Bandwidth test
---
&emsp;&emsp;This is a bandwidth speed test jquery plugin, u can use it refer to the following example
``` javascript
$('h3')._speedTest({
            fileSize: 390,
            domId: "h3",
            fileUrl: "http://a.hiphotos.baidu.com/image/pic/item/adaf2edda3cc7cd90df1ede83401213fb80e9127.jpg",
            bgColor: "#0E0E0E"
        });
```
"h3" is the dom id;
"fileSize" is the size of the file which used to test bandwidth speed， unit is Kb;
"fileUrl" is the file of the file which used to test bandwidth speed;
"bgColor" is the backgroud color