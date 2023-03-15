# import-cdn-json-function
 
### 使用方式
```javascript
import importCDNJson from 'import-cdn-json-function'

... 
const data = await importCDNJson(options)

或

importCDNJson(options,(err,data)=>{
  if (!err){
    console.log(data)
  }
})
```


### options
* 可为string 或 object；为object时，参数如下

| 参数     | 类型     | 说明                                                                  |
|--------|--------|---------------------------------------------------------------------|
| source | string | cdn链接如 `https://www.cdn.com/test.json` <br/>或wpm包，如wpm-test-jsonPkg |
| env    | string | qa或online，默认根据域名是否带qa判定                                             |


