## admin 后台管理系统模板应用

### 依赖

* 构建工具使用 umi2。
* 组件库使用 [antd 4](https://ant.design/index-cn)。
* 图标使用 [react-icons](https://react-icons.netlify.com/#/icons/ai)。
* 请求库使用 [umi-request](https://github.com/umijs/umi-request)。

### 配置项

#### 展示配置项

```yaml
TITLE: 应用名称
SIDER_THEME: dark # 侧边栏风格，dark、light
LOGO_URL: https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg # logo 图标地址
BREADCRUMBS_MODE: simple # 面包屑风格，simple、complex
```

#### 功能配置项

```yaml
ENABLE_LOGIN: true # 是否需要登录
```

### 接口约定

#### 通用接口

```yaml
success: true # 调用成功或失败 true, false
data: any # 响应数据
code: number # 响应 code。403 无权限，500，404 会自动跳转到相关页面
errorMessage: string # 错误信息
```

#### 分页接口

```yaml
list: array # 列表数据
total: number # 总条数
current: number # 当前页码
pageSize: number # 每页显示多少条
```

### 权限模型

由用户信息接口返回 authes 数组加以推断。

authes/NeedAuth 用于校验菜单权限。umirc#routes 配置添加 authes 数组，Routes 配置添加 NeedAuth，表示访问该菜单需要相关权限。

Components/Layouts/Authority 根据用户权限展示或隐藏子组件。
