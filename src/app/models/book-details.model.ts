export class BookDetails {
  readonly id: number;
  readonly isbn: string;
  readonly author: string;
  readonly title: string;
  readonly url: string;
  readonly words: number;
  readonly language: string;
  readonly cover: string;
  readonly category: string;
  readonly tags: ReadonlyArray<string>;
  readonly published: Date;
  readonly started: Date;
  readonly finished: Date;
  readonly reviewed: Date;
  readonly rating: number;
  readonly hours: number;
  constructor({
    id,
    isbn,
    author,
    title,
    url,
    words,
    language,
    cover,
    category,
    tags,
    published,
    started,
    finished,
    reviewed,
    rating,
    hours
  }: {
    id: number;
    isbn: string;
    author: string;
    title: string;
    url: string;
    words: number;
    language: string;
    cover: string;
    category: string;
    tags: string[];
    published: Date;
    started: Date;
    finished: Date;
    reviewed: Date;
    rating: number;
    hours: number;
  }) {
    this.id = id;
    this.isbn = isbn;
    this.author = author;
    this.title = title;
    this.url = url;
    this.words = words;
    this.language = language;
    this.cover = cover;
    this.category = category;
    this.tags = tags;
    this.published = published;
    this.started = started;
    this.finished = finished;
    this.reviewed = reviewed;
    this.rating = rating;
    this.hours = hours;
  }

  public static categoryLabel(label: string) {
    if (label.toLowerCase() === 'nonfiction') {
      return 'Non Fiction';
    }
    return label;
  }
}
