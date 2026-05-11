import ESV_BIBLE from "@/constants/translations/esv_bible.json";
import type {
  BibleBookNames,
  BibleCategory,
  BookMeta,
  BookOfBible,
  Testament,
} from "@/types/bible";

const BIBLE: Record<BibleBookNames, BookOfBible> =
  ESV_BIBLE as unknown as Record<BibleBookNames, BookOfBible>;

export const BOOKS: BookMeta[] = [
  { name: "Genesis", testament: "old", category: "Law" },
  { name: "Exodus", testament: "old", category: "Law" },
  { name: "Leviticus", testament: "old", category: "Law" },
  { name: "Numbers", testament: "old", category: "Law" },
  { name: "Deuteronomy", testament: "old", category: "Law" },
  { name: "Joshua", testament: "old", category: "History" },
  { name: "Judges", testament: "old", category: "History" },
  { name: "Ruth", testament: "old", category: "History" },
  { name: "1 Samuel", testament: "old", category: "History" },
  { name: "2 Samuel", testament: "old", category: "History" },
  { name: "1 Kings", testament: "old", category: "History" },
  { name: "2 Kings", testament: "old", category: "History" },
  { name: "1 Chronicles", testament: "old", category: "History" },
  { name: "2 Chronicles", testament: "old", category: "History" },
  { name: "Ezra", testament: "old", category: "History" },
  { name: "Nehemiah", testament: "old", category: "History" },
  { name: "Esther", testament: "old", category: "History" },
  { name: "Job", testament: "old", category: "Poetry" },
  { name: "Psalms", testament: "old", category: "Poetry" },
  { name: "Proverbs", testament: "old", category: "Poetry" },
  { name: "Ecclesiastes", testament: "old", category: "Poetry" },
  { name: "Song Of Solomon", testament: "old", category: "Poetry" },
  { name: "Isaiah", testament: "old", category: "Major Prophets" },
  { name: "Jeremiah", testament: "old", category: "Major Prophets" },
  { name: "Lamentations", testament: "old", category: "Major Prophets" },
  { name: "Ezekiel", testament: "old", category: "Major Prophets" },
  { name: "Daniel", testament: "old", category: "Major Prophets" },
  { name: "Hosea", testament: "old", category: "Minor Prophets" },
  { name: "Joel", testament: "old", category: "Minor Prophets" },
  { name: "Amos", testament: "old", category: "Minor Prophets" },
  { name: "Obadiah", testament: "old", category: "Minor Prophets" },
  { name: "Jonah", testament: "old", category: "Minor Prophets" },
  { name: "Micah", testament: "old", category: "Minor Prophets" },
  { name: "Nahum", testament: "old", category: "Minor Prophets" },
  { name: "Habakkuk", testament: "old", category: "Minor Prophets" },
  { name: "Zephaniah", testament: "old", category: "Minor Prophets" },
  { name: "Haggai", testament: "old", category: "Minor Prophets" },
  { name: "Zechariah", testament: "old", category: "Minor Prophets" },
  { name: "Malachi", testament: "old", category: "Minor Prophets" },
  { name: "Matthew", testament: "new", category: "Gospels" },
  { name: "Mark", testament: "new", category: "Gospels" },
  { name: "Luke", testament: "new", category: "Gospels" },
  { name: "John", testament: "new", category: "Gospels" },
  { name: "Acts", testament: "new", category: "Acts" },
  { name: "Romans", testament: "new", category: "Pauline Epistles" },
  { name: "1 Corinthians", testament: "new", category: "Pauline Epistles" },
  { name: "2 Corinthians", testament: "new", category: "Pauline Epistles" },
  { name: "Galatians", testament: "new", category: "Pauline Epistles" },
  { name: "Ephesians", testament: "new", category: "Pauline Epistles" },
  { name: "Philippians", testament: "new", category: "Pauline Epistles" },
  { name: "Colossians", testament: "new", category: "Pauline Epistles" },
  { name: "1 Thessalonians", testament: "new", category: "Pauline Epistles" },
  { name: "2 Thessalonians", testament: "new", category: "Pauline Epistles" },
  { name: "1 Timothy", testament: "new", category: "Pauline Epistles" },
  { name: "2 Timothy", testament: "new", category: "Pauline Epistles" },
  { name: "Titus", testament: "new", category: "Pauline Epistles" },
  { name: "Philemon", testament: "new", category: "Pauline Epistles" },
  { name: "Hebrews", testament: "new", category: "General Epistles" },
  { name: "James", testament: "new", category: "General Epistles" },
  { name: "1 Peter", testament: "new", category: "General Epistles" },
  { name: "2 Peter", testament: "new", category: "General Epistles" },
  { name: "1 John", testament: "new", category: "General Epistles" },
  { name: "2 John", testament: "new", category: "General Epistles" },
  { name: "3 John", testament: "new", category: "General Epistles" },
  { name: "Jude", testament: "new", category: "General Epistles" },
  { name: "Revelation", testament: "new", category: "Apocalyptic" },
];

const OLD_TESTAMENT_CATEGORY_ORDER: BibleCategory[] = [
  "Law",
  "History",
  "Poetry",
  "Major Prophets",
  "Minor Prophets",
];

const NEW_TESTAMENT_CATEGORY_ORDER: BibleCategory[] = [
  "Gospels",
  "Acts",
  "Pauline Epistles",
  "General Epistles",
  "Apocalyptic",
];

export const getCategoryOrder = (t: Testament): BibleCategory[] =>
  t === "old" ? OLD_TESTAMENT_CATEGORY_ORDER : NEW_TESTAMENT_CATEGORY_ORDER;

export const getBooksByTestament = (t: Testament): BookMeta[] =>
  BOOKS.filter((b) => b.testament === t);

export const getBooksGroupedByCategory = (
  t: Testament,
): { category: BibleCategory; books: BookMeta[] }[] =>
  getCategoryOrder(t).map((category) => ({
    category,
    books: BOOKS.filter((b) => b.testament === t && b.category === category),
  }));

export const getChapterCount = (book: BibleBookNames): number =>
  Object.keys(BIBLE[book] ?? {}).length;

export const getVerseCount = (book: BibleBookNames, chapter: number): number =>
  Object.keys(BIBLE[book]?.[String(chapter)] ?? {}).length;
