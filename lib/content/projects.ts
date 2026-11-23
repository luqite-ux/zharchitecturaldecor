export interface ProjectCase {
  slug: string
  nameZh: string
  nameEn: string
  place?: string
  gallery?: string[]
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
    slug: 'luhe-cuihu-meishu',
    nameZh: '六合·翠湖美墅项目',
    nameEn: 'Luhe · Cuihu Meishu Project',
    place: 'Luhe',
    image: {
      src: '/images/projects-optimized/luhe-cuihu-meishu-hd.png',
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
      src: '/images/projects-optimized/lishui-pingxi-jiayuan.jpg',
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
      src: '/images/projects-optimized/lishui-vanke-city.jpg',
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
      src: '/images/projects-optimized/nanjing-zijin-huafu.jpg',
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
      src: '/images/projects-optimized/rongsheng-ludao-rongfu.jpg',
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
      src: '/images/projects-optimized/nanjing-nanwanying-phase-2-3.jpg',
      alt: 'Residential facade at Nanjing Nanwanying phases two and three',
      fit: 'cover',
      background: 'photo',
    },
  },
  {
    slug: 'taian-city-landscape', nameZh: '山东泰安城市景观', nameEn: 'Tai’an City Landscape', place: 'Tai’an',
    image: { src: '/images/projects-optimized/taian-city-landscape.jpg', alt: 'Curved white landscape seating in Tai’an', fit: 'cover', background: 'photo' },
    gallery: ['/images/projects-optimized/taian-city-landscape-2.jpg', '/images/projects-optimized/taian-city-landscape-3.jpg'],
  },
  {
    slug: 'suzhou-shengze-school', nameZh: '苏州盛泽丝绸职业学校', nameEn: 'Suzhou Shengze Silk Vocational School', place: 'Suzhou',
    image: { src: '/images/projects-optimized/suzhou-shengze-school.jpg', alt: 'Arched school corridor under construction in Suzhou', fit: 'cover', background: 'photo' },
    gallery: [2, 3, 4, 5, 6].map((index) => `/images/projects-optimized/suzhou-shengze-school-${index}.jpg`),
  },
  {
    slug: 'jinhu-focheng-temple', nameZh: '淮安金湖佛城寺', nameEn: 'Jinhu Focheng Temple', place: 'Huai’an',
    image: { src: '/images/projects-optimized/jinhu-focheng-temple.jpg', alt: 'Temple building at Jinhu Focheng Temple', fit: 'cover', background: 'photo' },
  },
]
