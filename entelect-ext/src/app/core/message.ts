export const Messages = {
    Background: {
        OpenOptions: 'open_options'
    },
    ContentScript: {
        ClearNotification: 'clear_notifications',
        SuccessNotification: 'success_notification',
        ErrorNotification: 'error_notification',
        WarningNotification: 'warning_notification'
    }
}

export enum MessageType {
    Background,
    Content_Script
}

export class DataMessage {
    constructor(public type: MessageType,
        public message: string,
        public data: any = null) {
    }
}