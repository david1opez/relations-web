export type CallComponentProps = {
    call: {
        id: string;
        title: string;
        attendees: string[];
        startDate: number;
        endDate: number;
    };
    onClick: (id: string) => void;
};
