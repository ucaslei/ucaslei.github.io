// 图书数据
const books = [
    {
        id: 1,
        title: "时光的印记",
        author: "张明",
        category: "其他",
        cover: "https://t9.baidu.com/it/u=471222987,938254&fm=217&app=126&size=re3,2&q=75&n=0&g=4n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=91915B925831328422BF43A003005026",
        description: "用细腻的笔触记录生活的点点滴滴，从日常琐事中发现美好，感悟时光流逝中的珍贵瞬间。每一个故事都是对生活的热爱与思考。",
        downloads: [
            { name: "百度网盘", url: "http://cn.chinadaily.com.cn/a/202407/24/WS66a0bc08a3107cd55d26c6c7.html" },
            { name: "阿里云盘", url: "#aliyun1" },
            { name: "蓝奏云", url: "#lanzou1" }
        ]
    },
    {
        id: 2,
        title: "代码之美",  
        author: "李华",
        category: "其他",
        cover: "https://t9.baidu.com/it/u=471222987,938254&fm=217&app=126&size=re3,2&q=75&n=0&g=4n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=91915B925831328422BF43A003005026",
        description: "探索编程世界的美学，从算法设计到代码优化，展现程序员眼中的艺术。技术与美学的完美结合，为开发者提供新的思维视角。",
        downloads: [
            { name: "百度网盘", url: "#baidu2" },
            { name: "阿里云盘", url: "#aliyun2" }
        ]
    },
    {
        id: 3,
        title: "城市边缘",
        author: "王小雨",
        category: "其他",
        cover: "https://t9.baidu.com/it/u=471222987,938254&fm=217&app=126&size=re3,2&q=75&n=0&g=4n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=91915B925831328422BF43A003005026",
        description: "讲述现代都市中年轻人的奋斗故事，在繁华与孤独之间寻找自我。真实而温暖的叙述，触动每一个在城市中打拼的心灵。",
        downloads: [
            { name: "百度网盘", url: "#baidu3" }
        ]
    },
    {
        id: 4,
        title: "夜色诗行",
        author: "陈思雨",
        category: "其他",
        cover: "https://via.placeholder.com/350x280/f59e0b/ffffff?text=夜色诗行",
        description: "收录近年来创作的现代诗歌，以夜晚、梦境、情感为主题。文字如夜色般深邃，情感如星光般闪烁，为读者带来心灵的慰藉。",
        downloads: [
            { name: "百度网盘", url: "#baidu4" },
            { name: "天翼云盘", url: "#tianyi4" },
            { name: "蓝奏云", url: "#lanzou4" }
        ]
    },
    {
        id: 5,
        title: "科技与人文",
        author: "刘博文",
        category: "其他",
        cover: "https://via.placeholder.com/350x280/ef4444/ffffff?text=科技与人文",
        description: "思考科技发展对人文精神的影响，探讨在数字化时代如何保持人性的温度。深入浅出，既有理性分析，也有感性思考。",
        downloads: [
            { name: "阿里云盘", url: "#aliyun5" },
            { name: "百度网盘", url: "#baidu5" }
        ]
    },
    {
        id: 6,
        title: "山海之间",
        author: "张明",
        category: "其他",
        cover: "https://via.placeholder.com/350x280/06b6d4/ffffff?text=山海之间",
        description: "游历名山大川的心得体会，用文字记录自然之美。山的雄伟，海的辽阔，在作者笔下化为动人的篇章，启发读者对自然的热爱。",
        downloads: [
            { name: "百度网盘", url: "#baidu6" }
        ]
    },
    {
        id: 7,
        title: "算法之道",
        author: "李华",
        category: "其他",
        cover: "https://via.placeholder.com/350x280/84cc16/ffffff?text=算法之道",
        description: "深入浅出地介绍常用算法和数据结构，结合实际案例，让复杂的概念变得易懂。适合程序员提升技术水平和思维能力。",
        downloads: [
            { name: "百度网盘", url: "#baidu7" },
            { name: "阿里云盘", url: "#aliyun7" },
            { name: "123云盘", url: "#123pan7" }
        ]
    },
    {
        id: 8,
        title: "青春物语",
        author: "王小雨",
        category: "其他",
        cover: "https://via.placeholder.com/350x280/ec4899/ffffff?text=青春物语",
        description: "回忆青春岁月的美好与遗憾，用温暖的文字重现那些难忘的时光。每个人都能在书中找到自己青春的影子，感受成长的力量。",
        downloads: [
            { name: "阿里云盘", url: "#aliyun8" },
            { name: "蓝奏云", url: "#lanzou8" }
        ]
    },
    {
        id: 9,
        title: "晨光微诗",
        author: "陈思雨",
        category: "其他",
        cover: "https://via.placeholder.com/350x280/a855f7/ffffff?text=晨光微诗",
        description: "清晨时分的灵感记录，短小精悍的诗句蕴含着深刻的哲理。如晨光般温柔，如微风般清新，为忙碌的生活注入诗意。",
        downloads: [
            { name: "百度网盘", url: "#baidu9" }
        ]
    },
    {
        id: 10,
        title: "读书笔记",
        author: "刘博文",
        category: "其他",
        cover: "https://via.placeholder.com/350x280/f97316/ffffff?text=读书笔记",
        description: "记录阅读经典著作的心得感悟，分享读书的乐趣和收获。从文学到哲学，从历史到科学，展现一个读书人的精神世界。",
        downloads: [
            { name: "百度网盘", url: "#baidu10" },
            { name: "阿里云盘", url: "#aliyun10" }
        ]
    },
    {
        id: 11,
        title: "老树新花",
        author: "张明",
        category: "散文",
        cover: "https://via.placeholder.com/350x280/14b8a6/ffffff?text=老树新花",
        description: "观察身边的老人老事，发现平凡中的不平凡。用慈悲的眼光看待世界，用温暖的文字传递人间真情，展现生活的厚重与美好。",
        downloads: [
            { name: "天翼云盘", url: "#tianyi11" },
            { name: "百度网盘", url: "#baidu11" },
            { name: "蓝奏云", url: "#lanzou11" }
        ]
    },
    {
        id: 12,
        title: "Web前端实战",
        author: "李华",
        category: "前端",
        cover: "https://via.placeholder.com/350x280/3b82f6/ffffff?text=Web前端实战",
        description: "从零开始学习现代Web开发技术，包含HTML5、CSS3、JavaScript及主流框架。理论与实践结合，帮助读者快速掌握前端开发技能。",
        downloads: [
            { name: "阿里云盘", url: "#aliyun12" }
        ]
    },
    {
        id: 13,
        title: "寻找自己",
        author: "王小雨",
        category: "小说",
        cover: "https://via.placeholder.com/350x280/10b981/ffffff?text=寻找自己",
        description: "一个关于自我发现的故事，主人公在人生的十字路口做出选择，最终找到属于自己的道路。情节跌宕起伏，人物形象鲜明。",
        downloads: [
            { name: "百度网盘", url: "#baidu13" },
            { name: "123云盘", url: "#123pan13" }
        ]
    },
    {
        id: 14,
        title: "四季如歌",
        author: "陈思雨",
        category: "诗集",
        cover: "https://via.placeholder.com/350x280/8b5cf6/ffffff?text=四季如歌",
        description: "以四季为主题的诗歌集，春的生机、夏的热烈、秋的收获、冬的沉思。每一首诗都是对季节的礼赞，对生命的歌颂。",
        downloads: [
            { name: "百度网盘", url: "#baidu14" }
        ]
    },
    {
        id: 15,
        title: "思维漫步",
        author: "刘博文",
        category: "随笔",
        cover: "https://via.placeholder.com/350x280/f59e0b/ffffff?text=思维漫步",
        description: "自由散漫的思考记录，涉及哲学、心理学、社会学等多个领域。没有严格的逻辑框架，却有独特的思考角度和深刻的洞察。",
        downloads: [
            { name: "阿里云盘", url: "#aliyun15" },
            { name: "百度网盘", url: "#baidu15" },
            { name: "蓝奏云", url: "#lanzou15" }
        ]
    },
    {
        id: 16,
        title: "乡间小路",
        author: "张明",
        category: "散文",
        cover: "https://via.placeholder.com/350x280/ef4444/ffffff?text=乡间小路",
        description: "回忆童年乡村生活的点点滴滴，朴实的文字中蕴含着浓浓的乡愁。田野、小河、老屋，每一个场景都充满了温暖的回忆。",
        downloads: [
            { name: "天翼云盘", url: "#tianyi16" }
        ]
    },
    {
        id: 17,
        title: "数据结构精解",
        author: "李华",
        category: "技术",
        cover: "https://via.placeholder.com/350x280/06b6d4/ffffff?text=数据结构精解",
        description: "系统讲解各种数据结构的原理和应用，配有大量图示和代码示例。从基础到高级，循序渐进，是程序员必备的参考书籍。",
        downloads: [
            { name: "百度网盘", url: "#baidu17" },
            { name: "阿里云盘", url: "#aliyun17" }
        ]
    },
    {
        id: 18,
        title: "都市夜归人",
        author: "王小雨",
        category: "小说",
        cover: "https://via.placeholder.com/350x280/84cc16/ffffff?text=都市夜归人",
        description: "讲述都市夜晚的各种故事，出租车司机、夜班护士、便利店员工...每个人都有自己的故事，每个故事都值得倾听。",
        downloads: [
            { name: "123云盘", url: "#123pan18" },
            { name: "蓝奏云", url: "#lanzou18" }
        ]
    },
    {
        id: 19,
        title: "心语心愿",
        author: "陈思雨",
        category: "诗集",
        cover: "https://via.placeholder.com/350x280/ec4899/ffffff?text=心语心愿",
        description: "表达内心深处的感受和愿望，用诗歌的形式传递情感。每一首诗都是心灵的独白，每一句话都是真情的流露。",
        downloads: [
            { name: "百度网盘", url: "#baidu19" }
        ]
    },
    {
        id: 20,
        title: "文化散记",
        author: "刘博文",
        category: "随笔",
        cover: "https://via.placeholder.com/350x280/a855f7/ffffff?text=文化散记",
        description: "对传统文化和现代文明的思考，探讨文化传承与创新的关系。文笔优雅，见解独到，为读者提供了新的文化视角。",
        downloads: [
            { name: "阿里云盘", url: "#aliyun20" },
            { name: "百度网盘", url: "#baidu20" },
            { name: "天翼云盘", url: "#tianyi20" }
        ]
    }
];