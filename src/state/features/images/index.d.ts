export interface Pagination {
  total: number;
  totalHits: number;
}
export interface Photos {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  collections: number;
  likes: number;
  comments: number;
  user_id: number;
  user: number;
  userImageURL: number;
}
export interface getImagesResponse extends Pagination {
  hits: Array<Photos>;
}
export interface ErrorInterface {
  status: string;
  originalStatus: number;
  data: string;
  error: string;
}
