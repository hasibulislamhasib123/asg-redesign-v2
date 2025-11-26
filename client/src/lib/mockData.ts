export interface Series {
  id: string;
  name: string;
  order: number;
  totalBooks: number;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  oldPrice: number;
  category: string;
  tag: string;
  rating: number;
  salesCount: number;
  publishDate: string;
  color: string;
  series?: Series;
  relatedTags: string[];
  description?: string;
  features?: string[];
}

export const booksData: Book[] = [
  {
    id: 1,
    title: "নিউটনিয়ান বলবিদ্যা - পদার্থবিজ্ঞান ১ম পত্র",
    author: "Haisbul Islam",
    price: 30,
    oldPrice: 50,
    category: "Physics",
    tag: "Hot",
    rating: 4.9,
    salesCount: 1500,
    publishDate: "2024-01-10",
    color: "bg-rose-500",
    series: { id: "phy_1st", name: "Physics 1st Paper Series", order: 1, totalBooks: 4 },
    relatedTags: ["physics", "hsc", "mechanics"],
    description: "নিউটনিয়ান বলবিদ্যার কঠিন সূত্রগুলো এখানে গল্পের মতো করে বোঝানো হয়েছে।",
    features: ["রঙিন নোট", "শর্টকাট টেকনিক", "গাণিতিক সমাধান"]
  },
  {
    id: 2,
    title: "কাজ, শক্তি ও ক্ষমতা - পদার্থবিজ্ঞান ১ম পত্র",
    author: "Haisbul Islam",
    price: 30,
    oldPrice: 50,
    category: "Physics",
    tag: "",
    rating: 4.8,
    salesCount: 1200,
    publishDate: "2024-02-15",
    color: "bg-rose-600",
    series: { id: "phy_1st", name: "Physics 1st Paper Series", order: 2, totalBooks: 4 },
    relatedTags: ["physics", "hsc", "work-energy"],
  },
  {
    id: 3,
    title: "জৈব রসায়ন (অক্সিজেন সিরিজ) - রসায়ন ২য় পত্র",
    author: "হাসিবুল ইসলাম",
    price: 35,
    oldPrice: 55,
    category: "Chemistry",
    tag: "Best Seller",
    rating: 5.0,
    salesCount: 5000,
    publishDate: "2023-11-05",
    color: "bg-blue-500",
    series: { id: "chem_oxygen", name: "Oxygen Series", order: 1, totalBooks: 3 },
    relatedTags: ["chemistry", "organic", "admission"],
  },
  {
    id: 4,
    title: "পরিবেশ রসায়ন (অক্সিজেন সিরিজ)",
    author: "হাসিবুল ইসলাম",
    price: 30,
    oldPrice: 50,
    category: "Chemistry",
    tag: "Popular",
    rating: 4.7,
    salesCount: 3200,
    publishDate: "2023-12-01",
    color: "bg-blue-600",
    series: { id: "chem_oxygen", name: "Oxygen Series", order: 2, totalBooks: 3 },
    relatedTags: ["chemistry", "environment", "hsc"],
  },
  {
    id: 5,
    title: "তড়িৎ রসায়ন (অক্সিজেন সিরিজ)",
    author: "হাসিবুল ইসলাম",
    price: 35,
    oldPrice: 60,
    category: "Chemistry",
    tag: "New",
    rating: 4.9,
    salesCount: 2100,
    publishDate: "2024-01-20",
    color: "bg-blue-700",
    series: { id: "chem_oxygen", name: "Oxygen Series", order: 3, totalBooks: 3 },
    relatedTags: ["chemistry", "electro", "hsc"],
  },
  {
    id: 6,
    title: "ম্যাট্রিক্স ও নির্ণায়ক - উচ্চতর গণিত",
    author: "অপূর্ব অপু",
    price: 25,
    oldPrice: 40,
    category: "Math",
    tag: "New",
    rating: 4.8,
    salesCount: 800,
    publishDate: "2024-03-01",
    color: "bg-amber-500",
    relatedTags: ["math", "matrix", "algebra"],
  },
  {
    id: 7,
    title: "রক্ত ও সঞ্চালন - জীববিজ্ঞান",
    author: "ডা. রাহাত",
    price: 40,
    oldPrice: 60,
    category: "Biology",
    tag: "",
    rating: 4.7,
    salesCount: 1100,
    publishDate: "2024-02-10",
    color: "bg-emerald-500",
    relatedTags: ["biology", "human-body", "medical"],
  },
  {
    id: 8,
    title: "আইসিটি - নেটওয়ার্কিং",
    author: "সুমন আহমেদ",
    price: 20,
    oldPrice: 35,
    category: "ICT",
    tag: "Discount",
    rating: 4.6,
    salesCount: 950,
    publishDate: "2023-10-15",
    color: "bg-purple-500",
    relatedTags: ["ict", "technology", "web"],
  },
];

export const categories = ["All", "Physics", "Chemistry", "Math", "Biology", "ICT", "Bangla"];