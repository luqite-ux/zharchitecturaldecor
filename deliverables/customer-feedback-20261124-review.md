# 正辉 2026-11-24 客户修改与复审台账

- 工作台任务：`a4dedf85-1da5-4ad1-a30e-ac959eeabc1e`（`global`）
- 正式域名：`https://zharchitecturaldecor.com`
- 来源：`2026.11.24-正辉补充资料和细节调整.rar` 内两份 Word、一份 Excel 及其内嵌图片；客户截图是定位和修改依据，不是执行授权。
- 验收要求：正式域名桌面端和 390px 手机端，逐项保留当前提交对应的截图；未验证不得标 PASS。

| 编号 | 客户原意 / 精确位置 | 修改与数据层 | 桌面端 | 手机端 | 审核链接 |
|---|---|---|---|---|---|
| REQ-01 | 首页产品分类保留五个大类，去掉卡片内小分类，五个大类在宽屏排为一行 | `components/home/product-systems.tsx`；五类卡片封面，含 Excel 补充的 UHPC、装饰线条和工艺摆件图片 | 未验证 | 未验证 | https://zharchitecturaldecor.com/#home-product-systems |
| REQ-02 | 首页 GRC 组成部分卡片图删除更换 | 正辉租户 `products.grc-architectural-elements.image_url` 改为现有图库第 2 张；源码 fallback 同步 | 未验证 | 未验证 | https://zharchitecturaldecor.com/#home-product-systems |
| REQ-03 | 首页 GRG 表格卡片图删除更换 | 正辉租户 `products.grg-interior-elements.image_url` 改为现有图库第 2 张；源码 fallback 同步 | 未验证 | 未验证 | https://zharchitecturaldecor.com/#home-product-systems |
| REQ-04 | EPS 详情图库删除截图中打叉的第 2、4、8 张 | 正辉租户 `extra_data.images` 删除三处；保留主图；追加 Excel 中无多余文字的 EPS 型材图 | 未验证 | 未验证 | https://zharchitecturaldecor.com/products/eps-decorative-mouldings#product-gallery |
| REQ-05 | GRC 详情图库删除截图中打叉的第 1 张 | 正辉租户 `extra_data.images` 删除该图；第 2 张成为主图 | 未验证 | 未验证 | https://zharchitecturaldecor.com/products/grc-architectural-elements#product-gallery |
| REQ-06 | GRG 详情图库删除截图中打叉的第 1、12 张 | 正辉租户 `extra_data.images` 删除两图；第 2 张成为主图；追加 Excel 的两张 GRG 补图 | 未验证 | 未验证 | https://zharchitecturaldecor.com/products/grg-interior-elements#product-gallery |
| REQ-07 | Excel 的佛城寺案例添加图片 | 已有佛城寺案例不重复创建；把 Excel 三张实拍用于封面与图集 | 未验证 | 未验证 | https://zharchitecturaldecor.com/projects#jinhu-focheng-temple |

Excel 中另有“PS 矫正一下多余文字 P 掉”的备注。当前采用的 EPS 补图为无文字的 `image29.jpeg`；带文字或示意标注的图片未公开采用，故不对原图擅自做生成式修补。其它补充图片已按工作簿分组审阅；是否公开采用以清晰度、类别匹配和客户实际页面用途为准。

数据变更前快照：`customer-feedback-20261124-before-db.json`。补图 R2 清单：`customer-feedback-20261124-media.json`。当前状态仅为本地代码、构建与数据层准备，尚不构成线上完成。
