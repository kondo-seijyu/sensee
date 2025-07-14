export type ImageType = {
  id: string;
  title: string;
  image: {
    url: string;
    width: number;
    height: number;
  };
  tags?: Tag[];
  category?: Category;
  usage?: string | string[];
};

export type Category = {
  id: string;
  name: string;
  thumbnail?: {
    url: string;
    height: number;
    width: number;
  };
  count?: number;
};

export type Tag = {
  id: string;
  name: string;
};

export type RequestType = {
  id: string;
  title: string;
  detail?: string;
  status: '未対応' | '対応中' | '対応済み';
  imageRef?: {
    id: string;
  }[];
  publishedAt?: string;
};