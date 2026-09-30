import { test, expect } from '@playwright/test';
import { createTodo } from '../src/todo';

test.describe('Todo-Geschäftslogik', () => {
    test('BL01: Äußere Leerzeichen entfernen', () => {
        const todo = createTodo('  Milch kaufen  ', 1);

        expect(todo).toEqual({
            id: 1,
            title: 'Milch kaufen',
        });
    });

    test('BL02: Leere Eingabe ablehnen', () => {
        expect(() => createTodo('   ', 1)).toThrow(
            'Bitte eine Aufgabe eingeben.',
        );
    });
});