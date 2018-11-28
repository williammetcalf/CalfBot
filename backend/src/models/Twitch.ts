export interface TwitchCredentials {
  username: string;
  password: string;
}

export interface TwitchMessage {
  channel: string;
  user: UserState;
  message: string;
  self: boolean;
}

export interface UserState {
  badges: any;
  color: string;
  "display-name": string;
  emotes: any;
  flags: any;
  id: string;
  mod: boolean;
  "room-id": string;
  subscriber: boolean;
  "tmi-sent-ts": string;
  turbo: boolean;
  "user-id": string;
  "user-type": any;
  "emotes-raw": string;
  "badges-raw": string;
  username: string;
  "message-type": string;
}

export type TmiEventType =
  | "action"
  | "ban"
  | "chat"
  | "cheer"
  | "clearchat"
  | "connected"
  | "connecting"
  | "disconnected"
  | "emoteonly"
  | "followersonly"
  | "hosted"
  | "hosting"
  | "join"
  | "logon"
  | "message"
  | "mod"
  | "mods"
  | "notice"
  | "part"
  | "ping"
  | "pong"
  | "r9kbeta"
  | "reconnect"
  | "resub"
  | "roomstate"
  | "serverchange"
  | "slowmode"
  | "subscribers"
  | "subscription"
  | "timeout"
  | "unhost"
  | "unmod"
  | "whisper";
