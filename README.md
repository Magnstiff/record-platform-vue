## 接口配置

### 对树莓派

### 上传掉落信息

`/raspberry/submit`

- method: POST

- body:

```json
{
  "location": "脏泽园家",
  "floor": 1,
  "level": 1,
  "probability": 0.3,
  "photos": ["data:image/png;base64,xxxxxx", "data:image/png;base64,xxxxxx"]
}
```

- response:
  上传成功

```json
{
  "status": "ok"
}
```

上传失败

```json
{
  "status": "error"
}
```
