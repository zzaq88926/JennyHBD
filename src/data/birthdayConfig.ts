/* ============================================================================
   BIRTHDAY SURPRISE CONFIGURATION（Jenny 24歲耶誕夜生日驚喜設定檔）
   ----------------------------------------------------------------------------
   所有可客製化的文字、通關密語、9個章節時間軸、拍立得照片、吹蠟燭親友祝福、
   派大星語錄與最後給以淇的生日信件都集中在這支檔案中，方便你隨時替換！
   ============================================================================ */

import musicTrack from "../assets/music.mp3";
import solo1 from "../assets/solo/s1.png";
import solo2 from "../assets/solo/s2.png";
import solo3 from "../assets/solo/s3.png";
import solo4 from "../assets/solo/s4.png";
import solo5 from "../assets/solo/s5.png";
import solo6 from "../assets/solo/s6.png";
import solo7 from "../assets/solo/s7.png";
import together1 from "../assets/together/t1.png";
import together2 from "../assets/together/t2.png";
import together3 from "../assets/together/t3.png";
import together4 from "../assets/together/t4.png";
import together5 from "../assets/together/t5.png";
import together6 from "../assets/together/t6.png";

export interface BoardingPassConfig {
  /** 可通關的名字或暱稱（不分大小寫） */
  acceptedNames: string[];
  /** 通關後登機證上顯示的乘客名稱 */
  passengerDisplayName: string;
  /** 打字機提示文字 */
  typewriterPrompt: string;
  /** 點擊小提示按鈕時顯示的文字 */
  hintText: string;
  /** 航班與路線資訊 */
  fromCode: string;
  fromCity: string;
  toCode: string;
  toCity: string;
  destinationTag: string;
  flightNumber: string;
  gate: string;
  seat: string;
  boardingDate: string;
}

export interface TimelineMilestone {
  id: string;
  date: string;
  title: string;
  location: string;
  badgeEmoji: string;
  description: string;
  accentColor: "pink" | "sky" | "gold" | "lime";
}

export interface PolaroidPhoto {
  id: string;
  /** 可替換成任何本地 import 或外部圖片網址 */
  imageUrl: string;
  date: string;
  location: string;
  caption: string;
  /** 點擊拍立得打開燈箱時顯示的完整小故事 */
  memoryNote: string;
  /** 拍立得自然微傾斜角度（建議 -3 到 +3） */
  tiltDeg: number;
}

export interface FriendBlessing {
  id: string;
  /** 親友稱呼（例如：Arica、阿母） */
  senderName: string;
  /** 關係標籤（例如：UWE 英國摯友 🇬🇧、最愛的家人 🏡） */
  relationTag: string;
  /** 預設照片，後續可直接換成朋友或家人的合照 */
  photoUrl: string;
  /** 簡短溫馨的生日祝福 */
  message: string;
  /** 卡片顏色主題 */
  tagColor: "pink" | "sky" | "gold" | "lime";
}

export interface BirthdayLetterConfig {
  heading: string;
  salutation: string;
  paragraphs: string[];
  signOff: string;
  senderName: string;
  postscript: string;
}

export interface BirthdayConfig {
  musicUrl: string;
  musicTitle: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  boardingPass: BoardingPassConfig;
  timelineTitle: string;
  timelineSubtitle: string;
  timelineEvents: TimelineMilestone[];
  polaroidTitle: string;
  polaroidSubtitle: string;
  polaroids: PolaroidPhoto[];
  cakeTitle: string;
  cakeSubtitle: string;
  cakeWishGrantedTitle: string;
  cakeWishGrantedText: string;
  blessingsHeading: string;
  blessingsSubheading: string;
  wishBlessings: FriendBlessing[];
  patrickQuotes: string[];
  letter: BirthdayLetterConfig;
  footerText: string;
}

export const birthdayConfig: BirthdayConfig = {
  // 背景音樂
  musicUrl: musicTrack,
  musicTitle: "12/24 耶誕生日旋律 ♪",

  // 主畫面 Hero 歡迎區
  heroBadge: "TPE ✈️ BRS • 12/24 耶誕夜 24 歲生日驚喜航班 🎄",
  heroTitle: "24 歲生日快樂，我的耶誕夜大寶寶 Jenny！",
  heroSubtitle:
    "從上銀實習、台中小窩、東京街頭到英國布里斯托——耶誕老公公請我把這份跨海的愛與想念，準時送到妳身邊 ❄️💕",

  // 第一幕：登機證通關閘門
  boardingPass: {
    acceptedNames: ["jenny", "以淇", "大寶寶", "love", "babe", "baby", "1224"],
    passengerDisplayName: "Jenny 以淇（24 歲耶誕夜大寶寶 🎄）",
    typewriterPrompt: "這班耶誕夜特別航班，只專屬於我最愛的⋯⋯",
    hintText:
      "小提示：試試看妳的英文名字 Jenny、中文名字（以淇），或我最常叫妳的「大寶寶」💗",
    fromCode: "TPE",
    fromCity: "TAIWAN 台灣",
    toCode: "BRS",
    toCity: "UWE BRISTOL • 期待早日畢業歸來",
    destinationTag: "Jenny 的 24 歲耶誕生日派對 🎄",
    flightNumber: "XMAS-1224",
    gate: "STAR-24",
    seat: "1A（耶誕雪橇頭等艙）",
    boardingDate: "12/24 • 耶誕夜限定版 🎅",
  },

  // 第二幕 A：9 個章節的愛情飛行時間軸
  timelineTitle: "我們一起飛過的故事日誌",
  timelineSubtitle:
    "跟著小飛機一起往下滑，重溫我們從台灣到英國的每一個珍貴章節！",
  timelineEvents: [
    {
      id: "milestone-1",
      date: "Chapter 01 • 初次相遇",
      title: "當我們的世界開始有了交集",
      location: "上銀科技 ✨",
      badgeEmoji: "🌟",
      description:
        "還記得妳勇敢跳脫舒適圈、跑到上銀來實習嗎？那時候的妳總是笑得好誇張、好可愛哈哈！也因為我們都喜歡運動，漸漸開始一起吃飯、聊天，最後順其自然地牽起手在一起了。",
      accentColor: "pink",
    },
    {
      id: "milestone-2",
      date: "Chapter 02 • 快樂小日常",
      title: "家裡多了一隻可愛的小麻雀",
      location: "台中小窩 🏡",
      badgeEmoji: "🐦",
      description:
        "我們開始了同居生活，原本安靜的家一下子變得好熱鬧，每天都有隻小麻雀嘰嘰喳喳陪著我。一起去到處走走、吃美食、運動，偶爾一起下廚做飯，那段平凡卻每天都好開心的日子，真的好幸福！",
      accentColor: "lime",
    },
    {
      id: "milestone-3",
      date: "Chapter 03 • 遠距離的開始",
      title: "互相鼓勵，一起升級成為更好的我們",
      location: "台中 ↔ 高雄 🚄",
      badgeEmoji: "📚",
      description:
        "Jenny 從上銀畢業了，我們也各自考上了碩士，迎來第一次的遠距離。見面的時間少了好多、生活變得好忙碌，但真的很感謝總是體貼又溫柔的妳，常常不辭辛勞地搭車回台中找我。",
      accentColor: "sky",
    },
    {
      id: "milestone-4",
      date: "Chapter 04 • 第一次一起出國",
      title: "最互補的神仙旅伴！",
      location: "日本東京 🗼",
      badgeEmoji: "✈️",
      description:
        "第一次一起出國就飛去了東京！我們真的是超互補的完美旅伴，一個負責規劃路線，一個負責提供滿滿的情緒價值。就算走錯路、遇到小插曲也完全不會生氣，反而一起笑到不行，以後我們還要去好多好多國家玩喔！",
      accentColor: "gold",
    },
    {
      id: "milestone-5",
      date: "Chapter 05 • 磨合與成長",
      title: "越吵越認識彼此，也更懂得珍惜",
      location: "台中 ↔ 高雄 💕",
      badgeEmoji: "🤝",
      description:
        "課業、距離加上工作的壓力，那段時間我們吵過幾次架、鬧過不少不愉快。但正因為這樣，我們慢慢學會了更懂彼此的不容易：妳知道我是為妳好，我也學會多接住妳的情緒。現在連身邊朋友都好羨慕我們能互相體諒的相處模式，我們要繼續一起加油，愛妳愛妳喔！",
      accentColor: "pink",
    },
    {
      id: "milestone-6",
      date: "Chapter 06 • Jenny 勇敢追夢",
      title: "飛往英國 UWE Bristol 追夢去！",
      location: "台灣 ✈️ 英國布里斯托",
      badgeEmoji: "🛫",
      description:
        "看到妳成功拿到夢寐以求的留學資格，我真的超級為妳驕傲！去機場送機、看著妳拖著行李箱勇敢走進登機門時，心裡既捨不得又替妳開心。在布里斯托的妳越來越獨立、也越來越閃閃發光，真的太厲害了！",
      accentColor: "sky",
    },
    {
      id: "milestone-7",
      date: "Chapter 07 • 跨越時區",
      title: "相差 8 小時，卻從沒忘記彼此",
      location: "台灣 ↔ 英國 🌙",
      badgeEmoji: "💌",
      description:
        "我的早安剛好配上妳的晚安。雖然無論通話還是傳訊息的時間都比以前少了好多，常常只能靠留言聊天、傳傳日常照片參與彼此的生活，但就算隔著一片海、一萬公里的距離，我們的心永遠都牽掛著對方。",
      accentColor: "lime",
    },
    {
      id: "milestone-8",
      date: "Chapter 08 • 12/24 耶誕夜大日子",
      title: "24 歲生日快樂！學業也完成一半囉！",
      location: "英國 Bristol 🎄🎂",
      badgeEmoji: "🎅",
      description:
        "今天是 12/24 耶誕夜，也是我們耶誕夜寶寶 Jenny 的 24 歲生日！辛苦大寶寶在英國這麼努力，現在的妳廚藝大漲，還認識了好多可愛的好朋友，留學之路也悄悄撐過一半囉！今年耶誕爺爺特別請我把這份小禮物送到妳手上～",
      accentColor: "gold",
    },
    {
      id: "milestone-9",
      date: "Chapter 09 • 未完待續（敬請期待 ✨）",
      title: "期待我們的大寶寶畢業歸來！",
      location: "英國 ✈️ 回到台灣懷抱",
      badgeEmoji: "🎓",
      description:
        "接下來的這一頁，留給即將凱旋歸國的妳！我跟阿母、還有好多好朋友都超級想妳的～等妳順利畢業回來，我們又可以天天見面、一起吃好多好吃的、一起嘻嘻哈哈打鬧啦！",
      accentColor: "pink",
    },
  ],

  // 第二幕 B：拍立得回憶牆
  polaroidTitle: "我們的拍立得回憶牆",
  polaroidSubtitle: "點選任何一張照片，都可以翻開背後的小故事喔 ✨",
  polaroids: [
    {
      id: "p1",
      imageUrl: together1,
      date: "笑得超燦爛",
      location: "台灣 • 我們的起點",
      caption: "全世界我最喜歡的小麻雀笑容 ✨",
      memoryNote:
        "每次看到這張照片，都會想起妳笑到停不下來、又可愛又沒包袱的樣子，只要有妳在旁邊就覺得超級幸福。",
      tiltDeg: -3,
    },
    {
      id: "p2",
      imageUrl: solo1,
      date: "耶誕夜寶寶",
      location: "Bristol, UK 🎄",
      caption: "12/24 的今日最美壽星 🌸",
      memoryNote:
        "就算相隔一萬公里，只要收到妳傳來的生活照，我原本平凡的一天就會瞬間充滿電！",
      tiltDeg: 2.5,
    },
    {
      id: "p3",
      imageUrl: together2,
      date: "甜蜜小日常",
      location: "台中 • 我們的小窩",
      caption: "在妳身邊，就是最溫暖的地方 💕",
      memoryNote:
        "好想念以前在台中一起下廚、一起運動、到處找美食吃的日子，等妳回來我們要補吃回來！",
      tiltDeg: -2,
    },
    {
      id: "p4",
      imageUrl: solo2,
      date: "留學加油中",
      location: "UWE Bristol 🇬🇧",
      caption: "在英國認真追夢的獨立女孩！🎓",
      memoryNote:
        "已經成功撐過一半啦！看著妳廚藝變好、認識新朋友又把學業顧得這麼棒，真的好佩服妳～",
      tiltDeg: 3,
    },
    {
      id: "p5",
      imageUrl: together3,
      date: "神仙旅伴",
      location: "日本東京 🗼",
      caption: "走錯路也能笑翻的最佳旅伴 🍰",
      memoryNote:
        "東京真的好好玩！下次我們還要一起規劃更多趟旅行，把世界地圖一起貼滿！",
      tiltDeg: -2.5,
    },
    {
      id: "p6",
      imageUrl: solo3,
      date: "閃亮 24 歲",
      location: "12/24 Happy Birthday",
      caption: "24 歲的今天，妳是唯一主角 🌟",
      memoryNote:
        "生日快樂以淇！今天派大星說妳有特權可以當全世界最幸福的小貪吃鬼！",
      tiltDeg: 2,
    },
    {
      id: "p7",
      imageUrl: together4,
      date: "跨越 8 小時",
      location: "台灣 ↔ 英國",
      caption: "就算差了八小時，想念零時差 ✈️",
      memoryNote:
        "謝謝妳一直以來的體諒與貼心，我們撐過一半了，剩下的日子我們一起倒數！",
      tiltDeg: -1.5,
    },
    {
      id: "p8",
      imageUrl: solo4,
      date: "未來可期",
      location: "UWE ➔ 回家吃大餐",
      caption: "快點畢業回來找我們喔！⭐",
      memoryNote:
        "我跟阿母、還有海綿寶寶跟派大星，全都在台灣等妳風光畢業回來！",
      tiltDeg: 2.5,
    },
  ],

  // 第三幕：許願吹蠟燭 + 親友祝福陸續跳出
  cakeTitle: "24 歲耶誕夜，許個生日願望吧！🎄",
  cakeSubtitle:
    "閉上眼睛，為妳的 24 歲許個大大的願望，然後吹熄蠟燭吧～（耶誕爺爺和 Arica 他們都有小驚喜藏在裡面喔！）",
  cakeWishGrantedTitle: "太棒了！24 歲的願望已經飛向耶誕星空囉 ✨",
  cakeWishGrantedText:
    "願我們的大寶寶生日快樂、在英國順順利利，平安健康地早日畢業歸來！",

  blessingsHeading: "叮咚！來自英國摯友 Arica ＆ 台灣家人的悄悄話 💌",
  blessingsSubheading:
    "大家都有話想對 24 歲的 Jenny 說喔～點選卡片可以放大看祝福！",

  // 【這裡可替換成 Arica、英國好朋友與阿母家人的真實照片與祝福文字】
  wishBlessings: [
    {
      id: "b1",
      senderName: "Arica（預設照片 1）",
      relationTag: "UWE 英國摯友 🇬🇧",
      photoUrl: solo5,
      message:
        "Jenny 24 歲生日快樂！今年耶誕夜由我們代替妳男朋友陪妳吃大餐、吹蠟燭，祝妳天天開心、論文報告全高分！",
      tagColor: "sky",
    },
    {
      id: "b2",
      senderName: "英國好姐妹（預設照片 2）",
      relationTag: "UWE 英國摯友 🇬🇧",
      photoUrl: together5,
      message:
        "Happy 24th Birthday Jenny!! 在布里斯托有妳這個超會煮飯又可愛的好朋友真的太棒了，耶誕節＆生日大快樂！",
      tagColor: "pink",
    },
    {
      id: "b3",
      senderName: "阿母 ＆ 最愛妳的家人（預設照片 3）",
      relationTag: "台灣溫暖後盾 🏡",
      photoUrl: solo6,
      message:
        "大寶寶以淇生日快樂！一個人在英國唸書辛苦了，冬天記得穿暖暖、吃飽飽，阿母跟家人都好想妳，等妳畢業回來！",
      tagColor: "gold",
    },
    {
      id: "b4",
      senderName: "布里斯托戰友（預設照片 4）",
      relationTag: "UWE 英國摯友 🇬🇧",
      photoUrl: together6,
      message:
        "耶誕夜寶寶生日快樂！！已經撐過一半啦，接下來的日子我們繼續一起在 Bristol 吃喝玩樂、一起閃閃發亮！",
      tagColor: "lime",
    },
    {
      id: "b5",
      senderName: "親愛的家人們（預設照片 5）",
      relationTag: "台灣溫暖後盾 🏡",
      photoUrl: solo7,
      message:
        "祝我們家最棒的 Jenny 24 歲生日快樂！平安健康最重要，大家都在台灣等妳凱旋歸國吃大餐喔！",
      tagColor: "pink",
    },
  ],

  // 派大星點擊互動語錄
  patrickQuotes: [
    "Jenny 24 歲生日快樂！請問美乃滋算是一種耶誕禮物嗎？🎺🎄",
    "今天派大星也說妳可以多吃兩塊蛋糕喔～🍰🍰",
    "耶誕夜出生的以淇，一定是比奇堡最閃亮的星星！⭐",
    "聽說大寶寶已經撐過一半了耶，派大星幫妳拍拍手！👏💕",
    "英國冬天好冷，不許變成小笨蛋感冒喔，要吃飽穿暖！🧣",
  ],

  // 第四幕：手寫生日信件（保留你的真誠口吻與可愛稱呼並優化流暢度）
  letter: {
    heading: "一封漂洋過海的耶誕航空信 🎄",
    salutation: "To 最親愛的以淇：",
    paragraphs: [
      "今天是哪個大寶寶的 24 歲生日呀～生日快樂！！剛好是妳最喜歡的耶誕夜呢 🎄✨",
      "好可惜今年沒辦法當面買蛋糕給妳這個小貪吃鬼吃，所以我特別請 Arica 他們先代替我幫妳好好慶祝、把我的份一起吃掉囉！",
      "不知不覺我們已經一起撐過一半了耶，真的好想現在就穿越時差、給妳一個大大的抱抱。我不在身邊的日子裡，妳這個小笨蛋一定要好好照顧自己喔——記得穿暖暖、吃飽飽，把自己養得白白胖胖變成可愛小豬也沒關係！",
      "好啦，妳知道我不太會講什麼肉麻的話哈哈，但有妳在的每一天我都很珍惜。愛妳愛妳，24 歲生日大快樂，也祝我們的大寶寶在英國一切順順利利，早日畢業回來找我喔！！",
    ],
    signOff: "永遠愛妳的，",
    senderName: "在台灣想妳的大男孩 💕",
    postscript: "P.S. 今天派大星也說妳可以多吃兩塊蛋糕喔～～ 🍰🍰",
  },

  footerText:
    "12/24 耶誕夜快樂 • 為 24 歲的 Jenny 以淇用心打造 🎄🎂✨",
};
