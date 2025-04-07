export type SearchbarProps = {
    onChangeValue: (value: string) => void; // Callback function to handle value changes
    placeholder?: string; // Placeholder text for the input field
    className?: string; // Additional CSS classes for styling
    value?: string; // Current value of the input field
    disabled?: boolean; // Flag to disable the input field
    onClick?: () => void; // Callback function to handle click events
};
