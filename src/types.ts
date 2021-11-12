export interface ChromeMessage {
    type: string,
    payload?: any
}

export type ChromeResponse = (data?: any) => void
