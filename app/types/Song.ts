export interface Song {
  title: string;
  url: string;
  title_short: string;
  id: string;
  preview: string;
  artist: {
    name: string;
    id: string;
  };
  album: {
    title: string;
    cover: string;
    cover_small: string;
    cover_medium: string;
    cover_big: string;
    cover_xl: string;
  };
}
