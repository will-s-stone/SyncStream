export type Message = FullVideoMessage | VideoRequestMessage | PlayerStatusMessage | SeekMessage

export type FullVideoMessage = {
  type: 'fullVideoMessage',
  data: Uint8Array
}

export type VideoRequestMessage = {
  type: 'videoRequest'
  data: null
}

export type PlayerStatusMessage = {
  type: 'player'
  data: 'pause' | 'play'
}

export type SeekMessage = {
  type: 'seek'
  data: number
}

export const isFullVideo = (x: Message): x is FullVideoMessage => x.type == "fullVideoMessage";
export const isVideoRequest = (x: Message): x is VideoRequestMessage => x.type == "videoRequest";
export const isPlayerStatus = (x: Message): x is PlayerStatusMessage => x.type == "player";
export const isSeek = (x: Message): x is SeekMessage => x.type == "seek";