export interface DatabaseInterface {
    connect(url: string): void
    disconnect(): void
    connected(): boolean
}
