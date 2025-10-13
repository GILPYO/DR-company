// constants/products.ts

// 타입 정의 추가
export interface ProductSubcategory {
  id: string;
  name: string;
  image?: string;
  imageDetails?: {
    src: string;
    name: string;
  }[];
}

export interface ProductCategory {
  id: string;
  name: string;
  subcategories: Record<string, ProductSubcategory>;
}

export interface ProductCategories {
  [key: string]: ProductCategory;
}

export const PRODUCT_CATEGORIES: ProductCategories = {
  condensing: {
    id: "condensing",
    name: "콘덴싱",
    subcategories: {
      basicWindPressure: {
        id: "basicWindPressure",
        name: "기본",
        image: "/products/condensing.png",
      },
      separateType: {
        id: "separateType",
        name: "분리형",
        image: "/products/condensing2.png",
      },
      windPressureUse: {
        id: "windPressureUse",
        name: "풍압사용",
        image: "/products/condensing3.png",
      },
      windPressureUseSeparate: {
        id: "windPressureUseSeparate",
        name: "풍압사용 분리형",
        image: "/products/condensing4.png",
      },
      condensingWindBasicPressure: {
        id: "condensingWindBasicPressure",
        name: "풍압대",
        image: "/products/condensing5.png",
      },
    },
  },
  general: {
    id: "general",
    name: "일반형",
    subcategories: {
      basicWindPressure: {
        id: "basicWindPressure",
        name: "기본",
        image: "/products/general.png",
      },
      separateType: {
        id: "separateType",
        name: "분리형",
        image: "/products/general2.png",
      },
      windPressureUse: {
        id: "windPressureUse",
        name: "풍압사용",
        image: "/products/general3.png",
      },
      windPressureUseSeparate: {
        id: "windPressureUseSeparate",
        name: "풍압사용 분리형",
        image: "/products/general4.png",
      },
      generalBasicWindPressure: {
        id: "generalBasicWindPressure",
        name: "풍압대",
        image: "/products/general5.png",
      },
    },
  },
  parts: {
    id: "parts",
    name: "단품",
    subcategories: {
      extension: {
        id: "extension",
        name: "연장관",
        imageDetails: [
          {
            src: "/products/extend700.png",
            name: "주름 연장관700L",
          },
          {
            src: "/products/extend2000.png",
            name: "연장관 150~2000L",
          },
        ],
      },
      curved: {
        id: "curved",
        name: "곡관",
        imageDetails: [
          {
            src: "/products/curve.png",
            name: "투엘보",
          },
          {
            src: "/products/curve45.png",
            name: "45° 곡관 200L(공용)",
          },
          {
            src: "/products/curveU.png",
            name: "U 곡관(공용)",
          },
          {
            src: "/products/curve130.png",
            name: "130*130 곡관(공용)",
          },
          {
            src: "/products/curve180.png",
            name: "180*180 기본 곡관(공용)",
          },
          {
            src: "/products/curve250.png",
            name: "250*250 이중 곡관(공용)",
          },
          {
            src: "/products/curveGeneral.png",
            name: "일반 기능 곡관",
          },
          {
            src: "/products/curveCondensing.png",
            name: "콘덴싱 기능 곡관",
          },
          {
            src: "/products/curveS.png",
            name: "일반 S 곡관",
          },
          {
            src: "/products/curveCondensingS.png",
            name: "콘덴싱 S 곡관",
          },
        ],
      },
      accessories: {
        id: "accessories",
        name: "부속품",
        imageDetails: [
          {
            src: "/products/part.png",
            name: "A/L 급기호스",
          },
          {
            src: "/products/part2.png",
            name: "철밴드(수출용)",
          },
          {
            src: "/products/part3.png",
            name: "SUS 밴드",
          },
          {
            src: "/products/part4.png",
            name: "리브밴드",
          },
          {
            src: "/products/part5.png",
            name: "SUS 후렌지",
          },
          {
            src: "/products/part6.png",
            name: "PP 후렌지",
          },
        ],
      },
    },
  },
  export: {
    id: "export",
    name: "수출용",
    subcategories: {
      kazakhstanS: {
        id: "kazakhstanS",
        name: "카자흐스탄 분리형(S)",
        image: "/products/export.png",
      },
      kazakhstanL: {
        id: "kazakhstanL",
        name: "카자흐스탄 분리형(L)",
        image: "/products/export2.png",
      },
      balhaeS: {
        id: "balhaeS",
        name: "발해 분리형(S)",
        image: "/products/export3.png",
      },
      balhaeL: {
        id: "balhaeL",
        name: "발해 분리형(L)",
        image: "/products/export4.png",
      },
    },
  },
  etc: {
    id: "etc",
    name: "기타",
    subcategories: {
      cascade: {
        id: "cascade",
        name: "캐스케이드",
        imageDetails: [
          {
            src: "/products/cascade1.png",
            name: "배기구",
          },
        ],
      },
    },
  },
};

export const PRODUCT_MAIN_TABS = [
  { id: "condensing", label: "콘덴싱" },
  { id: "general", label: "일반형" },
  { id: "parts", label: "단품" },
  { id: "export", label: "수출용" },
  { id: "etc", label: "기타" },
] as const;
