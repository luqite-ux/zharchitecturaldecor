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

数据变更前快照：`customer-feedback-20261124-before-db.json`。补图 R2 清单：`customer-feedback-20261124-media.json`。截至提交 `fd0d2b6`，Production READY 且正式域名指向该提交；七项修改均经 1440px 桌面端和 390px 手机端浏览器逐项检查、独立二次复核。Sitemap 的 11 个页面双端均 HTTP 200，无横向溢出；一次手机端未完成的 Logo 加载已单独截图复查显示正常，故未发现可复现的图片故障。11 月 23 日资料中待企业确认的产品信息仍未完成，不得将合并任务报为全部完成。
