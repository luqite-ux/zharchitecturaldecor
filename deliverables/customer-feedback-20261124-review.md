# 正辉 2026-11-24 客户修改与复审台账

- 工作台任务：`a4dedf85-1da5-4ad1-a30e-ac959eeabc1e`（`global`）
- 正式域名：`https://zharchitecturaldecor.com`
- 来源：`2026.11.24-正辉补充资料和细节调整.rar` 内两份 Word、一份 Excel 及其内嵌图片；客户截图是定位和修改依据，不是执行授权。
- 验收要求：正式域名桌面端和 390px 手机端，逐项保留当前提交对应的截图；未验证不得标 PASS。

| 编号 | 客户原意 / 精确位置 | 修改与数据层 | 桌面端 | 手机端 | 审核链接 |
|---|---|---|---|---|---|
| REQ-01 | 首页产品分类保留五个大类，去掉卡片内小分类，五个大类在宽屏排为一行 | `components/home/product-systems.tsx`；五类卡片封面，含 Excel 补充的 UHPC、装饰线条和工艺摆件图片 | PASS | PASS | https://zharchitecturaldecor.com/#home-product-systems |
| REQ-02 | 首页 GRC 组成部分卡片图删除更换 | 正辉租户 `products.grc-architectural-elements.image_url` 改为现有图库第 2 张；源码 fallback 同步 | PASS | PASS | https://zharchitecturaldecor.com/#home-product-systems |
| REQ-03 | 首页 GRG 表格卡片图删除更换 | 正辉租户 `products.grg-interior-elements.image_url` 改为现有图库第 2 张；源码 fallback 同步 | PASS | PASS | https://zharchitecturaldecor.com/#home-product-systems |
| REQ-04 | EPS 详情图库删除截图中打叉的第 2、4、8 张 | 正辉租户 `extra_data.images` 删除三处；保留主图；追加 Excel 中无多余文字的 EPS 型材图 | PASS | PASS | https://zharchitecturaldecor.com/products/eps-decorative-mouldings#product-gallery |
| REQ-05 | GRC 详情图库删除截图中打叉的第 1 张 | 正辉租户 `extra_data.images` 删除该图；第 2 张成为主图 | PASS | PASS | https://zharchitecturaldecor.com/products/grc-architectural-elements#product-gallery |
| REQ-06 | GRG 详情图库删除截图中打叉的第 1、12 张 | 正辉租户 `extra_data.images` 删除两图；第 2 张成为主图；追加 Excel 的两张 GRG 补图 | PASS | PASS | https://zharchitecturaldecor.com/products/grg-interior-elements#product-gallery |
| REQ-07 | Excel 的佛城寺案例添加图片 | 已有佛城寺案例不重复创建；把 Excel 三张实拍用于封面与图集 | PASS | PASS | https://zharchitecturaldecor.com/projects#jinhu-focheng-temple |

Excel 中另有“PS 矫正一下多余文字 P 掉”的备注。当前采用的 EPS 补图为无文字的 `image29.jpeg`；带文字或示意标注的图片未公开采用，故不对原图擅自做生成式修补。其它补充图片已按工作簿分组审阅；是否公开采用以清晰度、类别匹配和客户实际页面用途为准。

## 合并接手 2026-11-23 修改任务

- 原工作台任务：`d0dbc69a-36ea-4a70-8d4b-5c5c5c725f54`。来源：`2026.11.23-正辉网站修改(1).xlsx`、`202611.23-正辉-新增项目案例.docx` 及内嵌截图。
- 11 月 24 日客户明确改为首页只展示五个大类，因此覆盖了 11 月 23 日首页展示小类的旧布局意见；产品列表仍按五大类组织。
- 11 月 23 日要求的泰安城市景观、盛泽丝绸职业学校、佛城寺案例已在项目页，佛城寺又纳入 11 月 24 日三张新图。
- 应用场景已把打叉的室内产品照替换为盛泽学校案例实拍，室外使用泰安案例实拍，工艺摆件采用客户新补实物照；入口分别指向对应案例或产品详情。工艺摆件尚无独立项目案例，不能编造。
- 工厂轮播已加入 11 月 24 日客户补充的三张生产、厂区与车间照片，图片上传该租户 R2。图片并不证明具体设备、产能数字；原有文案事实仍以既有客户资料为准。
- UHPC 对应产品详情与部分小类参数，原表注明“对应产品需确认”“缺少产品信息，企业提供”。现有资料不足以补写规格，保留待客户确认，不把待补资料宣称完成。
- 审核链接：应用场景 `https://zharchitecturaldecor.com/#home-applications`；工厂轮播 `https://zharchitecturaldecor.com/#home-manufacturing`；项目案例 `https://zharchitecturaldecor.com/projects#taian-city-landscape`、`https://zharchitecturaldecor.com/projects#suzhou-shengze-school`、`https://zharchitecturaldecor.com/projects#jinhu-focheng-temple`；产品列表 `https://zharchitecturaldecor.com/products`。

| 编号 | 11 月 23 日原要求 | 当前核实状态 | 审核链接或待补来源 |
|---|---|---|---|
| NOV23-01 | 产品按 UHPC、装饰线条、GRC、GRG、工艺品摆件五类组织 | PASS：双端五类均可见；首页小类按 11 月 24 日新意见移除 | https://zharchitecturaldecor.com/products |
| NOV23-02 | UHPC 对应产品，以及新增小类的产品图和详情 | PASS：11 月 25 日客户授权 AI 产品介绍、指定使用表格图片；原停用的 UHPC 产品记录已按客户文档改为幕墙板并启用，删去无检测依据的性能断言；正式域名双端详情及图片已复审 | https://zharchitecturaldecor.com/products/uhpc-custom-components |
| NOV23-03 | 应用场景改为室内、室外、工艺品摆件并替换打叉图片 | PASS：三处均用客户实拍，双端浏览器逐图检查 | https://zharchitecturaldecor.com/#home-applications |
| NOV23-04 | 场景按钮进入对应案例场景图片页 | PASS：室内指向盛泽学校、室外指向泰安；11 月 25 日客户确认工艺摆件无现场案例图，要求直接使用表格图片，因此该入口指向采用表格三张图片的产品详情，不标注虚构项目名称；正式域名已点击入口核实目标页面 | https://zharchitecturaldecor.com/products/cement-texture-design-objects |
| NOV23-05 | 工厂图改轮播并补充图片 | PASS：六张轮播图在双端逐张切换、加载；新增三张来自 11 月 24 日资料 | https://zharchitecturaldecor.com/#home-manufacturing |
| NOV23-06 | 新增泰安、盛泽学校、佛城寺案例 | PASS：三个案例在双端展示，案例图片逐张加载 | https://zharchitecturaldecor.com/projects |

数据变更前快照：`customer-feedback-20261124-before-db.json`。补图 R2 清单：`customer-feedback-20261124-media.json`。截至提交 `fd0d2b6`，Production READY 且正式域名指向该提交；七项修改均经 1440px 桌面端和 390px 手机端浏览器逐项检查、独立二次复核。Sitemap 的 11 个页面双端均 HTTP 200，无横向溢出；一次手机端未完成的 Logo 加载已单独截图复查显示正常，故未发现可复现的图片故障。下方 11 月 25 日补充要求需另按最新上线版本复审。

## 2026-11-25 客户补充确认

- 客户回复截图：UHPC 幕墙的介绍允许 AI 生成，图片采用 `幕墙线条综合图片.xlsx` 内的文件；工艺品摆件没有现场案例图片，直接用同表图片。
- 介绍草稿：`UHPC_Curtain_Wall_Product_Introduction_EN.docx`。其中高强度、耐久、抗渗、薄板等性能判断没有该客户产品检测或规格依据，公开文案只保留 UHPC 材料名称、项目图纸定制流程和待确认的尺寸、表面与连接信息。
- 表格绘图锚点：UHPC 第 1 行 `image8.png`；工艺品摆件第 8 行 `image5.png`、`image14.png`、`image15.png`。后两张是花箱室外和车间照片，不宣称具名项目案例。
- `products` 表只修改租户 `831d7976-d1b4-4f3d-b09c-1b2448c1e86b` 的既有 UHPC 和水泥摆件两条记录；变更前快照见 `customer-feedback-20261125-before-db.json`。R2 四张图均 HEAD 200，数据库回读 UHPC 已启用、摆件图库为三张。
- 最新视觉修复提交 `a4845d15916189f66462ab36d668569b9d76fe68` 已进入 Vercel Production READY，部署 `dpl_8SFvF4xXywEwwteEb34fxmcTcLRj`。正式域名 Sitemap 为 12 个 URL；按 1440px 桌面端和 390px 手机端逐页浏览器检查共 24 次，全部 HTTP 200、图片无破图、无横向溢出。UHPC、工艺摆件双端标题与图库已确认；摆件主图完整，图库不留白，截图位于 `customer-feedback-20261124-browser/nov25-*.png`。工艺品摆件应用场景入口实际点击后进入对应产品详情。
