export interface ProjectCase {
  slug: string
  nameZh: string
  nameEn: string
  place?: string
  image: {
    src: string
    alt: string
    fit: 'contain' | 'cover'
    focal?: string
    background: 'white' | 'photo'
  }
}

export const projectCases: ProjectCase[] = [
  {
    slug: 'shuyang-zhihui-jiayuan',
    nameZh: '沭阳·智慧佳园项目',
    nameEn: 'Shuyang · Zhihui Jiayuan Project',
    place: 'Shuyang',
    image: {
      src: '/images/projects/shuyang-zhihui-jiayuan.jpg',
      alt: 'Residential buildings at Shuyang Zhihui Jiayuan',
      fit: 'cover',
      background: 'photo',
    },
  },
  {
    slug: 'xuyi-shenghai-swan-lake',
    nameZh: '盱眙·圣海天鹅湖项目',
    nameEn: 'Xuyi · Shenghai Swan Lake Project',
    place: 'Xuyi',
    image: {
      src: '/images/projects/xuyi-shenghai-swan-lake.jpg',
      alt: 'Villa facade at Xuyi Shenghai Swan Lake',
      fit: 'cover',
      background: 'photo',
    },
  },
  {
    slug: 'luhe-cuihu-meishu',
    nameZh: '六合·翠湖美墅项目',
    nameEn: 'Luhe · Cuihu Meishu Project',
    place: 'Luhe',
    image: {
      src: '/images/projects/luhe-cuihu-meishu.jpg',
      alt: 'Residential facade at Luhe Cuihu Meishu',
      fit: 'cover',
      background: 'photo',
    },
  },
  {
    slug: 'lishui-pingxi-jiayuan',
    nameZh: '溧水·屏溪佳苑项目',
    nameEn: 'Lishui · Pingxi Jiayuan Project',
    place: 'Lishui',
    image: {
      src: '/images/projects/lishui-pingxi-jiayuan.jpg',
      alt: 'Residential towers at Lishui Pingxi Jiayuan',
      fit: 'cover',
      background: 'photo',
    },
  },
  {
    slug: 'lishui-vanke-city',
    nameZh: '溧水·万科城项目',
    nameEn: 'Lishui · Vanke City Project',
    place: 'Lishui',
    image: {
      src: '/images/projects/lishui-vanke-city.jpg',
      alt: 'Residential towers at Lishui Vanke City',
      fit: 'cover',
      focal: '78% 50%',
      background: 'photo',
    },
  },
  {
    slug: 'nanjing-zijin-huafu',
    nameZh: '南京·紫金华府项目',
    nameEn: 'Nanjing · Zijin Huafu Project',
    place: 'Nanjing',
    image: {
      src: '/images/projects/nanjing-zijin-huafu.jpg',
      alt: 'Architectural facade at Nanjing Zijin Huafu',
      fit: 'cover',
      focal: '40% 55%',
      background: 'photo',
    },
  },
  {
    slug: 'rongsheng-ludao-rongfu',
    nameZh: '荣盛鹭岛荣府项目',
    nameEn: 'Rongsheng Ludao Rongfu Project',
    image: {
      src: '/images/projects/rongsheng-ludao-rongfu.jpg',
      alt: 'Main entrance at Rongsheng Ludao Rongfu',
      fit: 'cover',
      focal: '82% 50%',
      background: 'photo',
    },
  },
  {
    slug: 'nanjing-nanwanying-phase-2-3',
    nameZh: '南京南湾营二、三期经济适用房项目',
    nameEn: 'Nanjing Nanwanying Phases II and III Affordable Housing Project',
    place: 'Nanjing',
    image: {
      src: '/images/projects/nanjing-nanwanying-phase-2-3.jpg',
      alt: 'Residential facade at Nanjing Nanwanying phases two and three',
      fit: 'cover',
      background: 'photo',
    },
  },
]
