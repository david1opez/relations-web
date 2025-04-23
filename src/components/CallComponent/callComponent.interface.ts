export type CallComponentProps = {
    call: {
        callID: string;
        title: string;
        attendees: string[];
        startTime: number;
        endTime: number;
    };
    onClick: (id: string) => void;
};
