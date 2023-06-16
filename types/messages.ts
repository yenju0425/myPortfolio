import { Card } from '@/games/sng/modules/deck';
import { RoomStatus, PlayerStatus } from '@/games/base/terms';

// Request: to ask the server to do something (e.g. signup, make a bet)
// Response: to respond to the client of the request (e.g. success/ fail)
// Update: to refresh some display related data (e.g. The bet size of a player has changed)

export type ServerMessageBraodcast = { // log some server message, e.g. error message
  text: string;
};

export type StandupBroadcast = {
  seatId: number;
};

// export type LoadRoomInfoRequest = {
// }

export type LoadRoomInfoResponse = {
  clientSeatId: number;
  roomCurrentStatus: RoomStatus;
  playersNames: string[];
  playersCurrentChips: number[];
  playersCurrentBetSizes: number[];
  playersCurrentStatuses: (PlayerStatus | null)[];
};

export type SignupRequest = {
  id: number;
  name: string;
  email: string;
};

export type SignupResponse = {
  id: number;
};

export type SignupBroadcast = { // used to initialize a new player
  id: number;
  name: string;
};

// export type ReadyRequest = {
// }

export type ReadyResponse = {
  id: number;
};

export type ReadyBroadcast = {
  id: number;
};

export type PlayerCurrentChipsBroadcast = {
  id: number;
  playersCurrentChips: number;
};

export type PlayerCurrentBetSizeBroadcast = {
  id: number;
  currentBetSize: number;
};

export type PlayerHoleCardsBroadcast = { // This will send to the player and the spectators
  id: number;
  holeCards: Card[];
};

// export type RoomPlayBroadcast = {
// }

export type PlayerPlayBroadcast = {
  id: number;
};

// updates
export type PlayerNameUpdateBraodcast = {
  seatId: number;
  playerName: string;
};

export type PlayerCurrentChipsUpdateBraodcast = {
  seatId: number;
  playerCurrentChips: number;
};

export type PlayerCurrentBetSizeUpdateBraodcast = {
  seatId: number;
  playerCurrentBetSize: number;
};

export type PlayerCurrentStatusUpdateBraodcast = {
  seatId: number;
  playerCurrentStatus: PlayerStatus;
};

export type PlayerHoleCardsUpdateBraodcast = {
  seatId: number;
  playerHoleCards: Card[];
};
