// TYPES
import { ShortcutType } from '@/types/ShortcutTypes';

export async function GetShortcuts(): Promise<ShortcutType[]> {
    const shortcuts = localStorage.getItem('shortcuts');

    if (shortcuts) {
        return JSON.parse(shortcuts);
    } else {
        return [
            {
                id: 'randomId',
                icon: 'rocket',
                title: 'Inicio',
                redirect: [{ title: 'Inicio', value: 'inicio' }],
            },
        ];
    }
}

export async function UpdateShortcuts(shortcuts: ShortcutType[] | undefined): Promise<void> {
    if (!shortcuts) {
        localStorage.removeItem('shortcuts');
        return;
    };

    localStorage.setItem('shortcuts', JSON.stringify(shortcuts));
}
