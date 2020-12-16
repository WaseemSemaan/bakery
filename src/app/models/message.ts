
export interface Message{
    
    key: string;
    value: {
        full_name: string;
        email: string;
        city: string;
        content: string,
        dateSent: string
    }
}