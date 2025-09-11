export type TreeRingsIssue = {
  id: number;
  year: number;
  title: string;
  pdfUrl: string;
  cover?: string;
};

export type BookVendor = { name: string; url: string; price?: string };

// Replace these placeholders with real files under /public/images/fungus-foray/
export const fungusForayGallery: string[] = [
  "/images/fungus-foray/foray.jpg",
  "/images/fungus-foray/sorting.jpg",
  "/images/fungus-foray/thea.jpg",
  "/images/fungus-foray/boletus-appendiculatus.jpg",
  "/images/fungus-foray/lepiota-rachodes.jpg",
  "/images/fungus-foray/tables-3.jpeg",
  "/images/fungus-foray/tables-4.jpeg",
  "/images/fungus-foray/tables-5.jpeg",
  "/images/fungus-foray/tables-6.jpeg"
];

export const treeRingsIssues: TreeRingsIssue[] = [
  {
    id: 30,
    year: 2021,
    title: "Tree Rings 30 - 'Sheltering in Place'",
    pdfUrl: "/tree-rings/tree-rings-30-2021.pdf",
    cover: "/tree-rings/covers/tr-30.jpg",
  },
  {
    id: 29,
    year: 2019,
    title: "Tree Rings 29",
    pdfUrl: "/tree-rings/tree-rings-29-2019.pdf",
    cover: "/tree-rings/covers/tr-29.jpg",
  },
  {
    id: 28,
    year: 2017,
    title: "Tree Rings 28",
    pdfUrl: "/tree-rings/tree-rings-28-2017.pdf",
    cover: "/tree-rings/covers/tr-28.jpg",
  },
  {
    id: 27,
    year: 2016,
    title: "Tree Rings 27 - 'Agriculture in the Yuba Watershed'",
    pdfUrl: "/tree-rings/tree-rings-27-2016.pdf",
    cover: "/tree-rings/covers/tr-27.jpg",
  },
  {
    id: 26,
    year: 2015,
    title: "Tree Rings 26",
    pdfUrl: "/tree-rings/tree-rings-26-2015.pdf",
    cover: "/tree-rings/covers/tr-26.jpg",
  },
  {
    id: 25,
    year: 2014,
    title: "Tree Rings 25 - 'The Importance of Water'",
    pdfUrl: "/tree-rings/tree-rings-25-2014.pdf",
    cover: "/tree-rings/covers/tr-25.jpg",
  },
  {
    id: 24,
    year: 2012,
    title: "Tree Rings 24 - 'Habitat'",
    pdfUrl: "/tree-rings/tree-rings-24-2012.pdf",
    cover: "/tree-rings/covers/tr-24.jpg",
  },
  {
    id: 23,
    year: 2011,
    title: "Tree Rings 23",
    pdfUrl: "/tree-rings/tree-rings-23-2011.pdf",
    cover: "/tree-rings/covers/tr-23.jpg",
  }
 // Add more issues here...
];

export const bookVendors = [
//  {
//    name: "YWI Shop",
//    url: "https://yubawatershedinstitute.org/shop/",
//    price: "$29"
//  }
];
