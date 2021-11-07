export enum Sender {
    REACT = 'REACT',
    CONTENT = 'CONTENT',
    BACKGROUND = 'BACKGROUND'
}

export interface ChromeMessage {
    from: Sender
    type: string,
    payload?: any
}

export type ChromeResponse = (data?: any) => void
