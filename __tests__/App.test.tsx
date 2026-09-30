import React from 'react';
import {
    fireEvent,
    render,
    screen,
} from '@testing-library/react-native';

import App from '../App';

describe('Todo-App', () => {
    test('AT01: Aufgabe hinzufügen und Eingabe leeren', async () => {
        await render(<App />);

        const input = screen.getByLabelText('Neue Aufgabe');
        const button = screen.getByRole('button', {
            name: 'Hinzufügen',
        });

        await fireEvent.changeText(input, 'Milch kaufen');
        await fireEvent.press(button);

        expect(
            screen.getByText('Milch kaufen'),
        ).toBeOnTheScreen();

        expect(screen.getByText('1 Aufgabe')).toBeOnTheScreen();

        expect(input).toHaveDisplayValue('');
    });

    test('AT02: Leere Aufgabe ablehnen', async () => {
        await render(<App />);

        await fireEvent.changeText(
            screen.getByLabelText('Neue Aufgabe'),
            '   ',
        );

        await fireEvent.press(
            screen.getByRole('button', { name: 'Hinzufügen' }),
        );

        expect(
            screen.getByText('Bitte eine Aufgabe eingeben.'),
        ).toBeOnTheScreen();

        expect(screen.getByText('0 Aufgaben')).toBeOnTheScreen();

        expect(
            screen.getByText('Noch keine Aufgaben.'),
        ).toBeOnTheScreen();
    });
});