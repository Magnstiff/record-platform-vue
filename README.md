# HADAR 高空抛物信息备案平台

## 部署&配置

### 依赖&DB

``` bash
sudo apt update && sudo apt upgrade
sudo apt install mysql nodejs npm #just for debian or ubuntu
git clone git@github.com:do-not-smash-me/record-platform-vue.git
cd record-platform-vue
npm install
npm run dev
```

### 数据库

进入 mysql

```bash
# debian系apt安装mysql必须使用sudo
sudo mysql -u $your_database_usrname -p $your_database_passwd
```

创建表结构

```sql
CREATE DATABASE $your_database_name;
USE $your_database_name;

CREATE TABLE info(
    id INT NOT NULL AUTO_INCREMENT,
    time DATETIME,
    location VARCHAR(50),
    floor INT,
    level INT,
    probability FLOAT,
    PRIMARY KEY(id)
);

CREATE TABLE photos(
    id INT,
    name VARCHAR(100),
    FOREIGN KEY(id) REFERENCES info(id)
);
```

创建用户&修改密码

```sql
use mysql;
-- 新建用户/直接用root用户
-- 修改用户密码
-- 给新用户$your_database_usrname的所有权限
```

### 服务端对 mysql 配置

打开./backend/sql.js 文件，修改 createConnection 中 json 的所有配置信息，例如

```javascript
const connection = mysql.createConnection({
  host: $your_ip_addr,
  user: $your_database_usrname,
  password: $your_database_passwd,
  database: $your_database_passwd,
});
```

## 接口配置

### 上传掉落信息

`/raspberry/submit`

- method: POST

- body:

```json
{
  "location": "location",
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
