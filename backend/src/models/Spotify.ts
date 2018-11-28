export interface SpotifyApiCredentials {
  clientId?: string;
  clientSecret?: string;
  redirectUri?: string;
}

export interface Artist {
  external_urls: any;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface Track {
  album: any;
  artists: Artist[];
  availabile_markets: any[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: any;
  external_urls?: { spotify?: string };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: 11;
  type: string;
  uri: string;
}
